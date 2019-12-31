import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { delay, map, retryWhen } from 'rxjs/operators';

import { DataEntryService } from './../data-entry.service';

@Component({
  selector: "app-bulk-entry",
  templateUrl: "./bulk-entry.component.html",
  styleUrls: ["./bulk-entry.component.scss"]
})
export class BulkEntryComponent implements OnInit {
  submitted = false;
  years: string[] = ["2015-16", "2016-17", "2017-18"];
  bulkEntryForm: FormGroup;
  filesToUpload: Array<File> = [];

  fileUploadTracker: {
    [fileIndex: number]: { alias: string; percentage: number };
  } = {};

  fileProcessingTracker: {
    [fileIndex: number]: {
      status: "in-process" | "completed" | "FAILED";
      message: string;
    };
  } = {};

  /* This is to keep track of which indexed which file is already either in data processing state
   * or in file Upload state
   */
  filesAlreadyInProcess: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private dataEntryService: DataEntryService
  ) {}

  ngOnInit() {
    this.bulkEntryForm = this.formBuilder.group({
      year: [this.years[0], Validators.required]
    });
  }

  upload() {
    this.submitted = true;
    if (this.bulkEntryForm.invalid || !this.bulkEntryForm.get("year").value) {
      return false;
    }
    const formData: FormData = new FormData();
    const files: Array<File> = this.filesToUpload;
    formData.append("year", this.bulkEntryForm.get("year").value);
    for (let i = 0; i < files.length; i++) {
      if (this.filesAlreadyInProcess.length > i) {
        continue;
      }
      this.filesAlreadyInProcess.push(i);
      console.log("stating process of ", files[i].name);
      this.uploadFile(files[i], i);
    }
  }

  uploadFile(file: File, fileIndex: number) {
    this.dataEntryService
      .getURLForFileUpload(file.name, file.type)
      .subscribe(s3Response => {
        const fileAlias = s3Response["data"][0]["file_alias"];
        const s3URL = s3Response["data"][0].url;
        this.uploadFileToS3(
          file,
          s3URL,
          fileAlias,
          this.bulkEntryForm.get("year").value,
          fileIndex
        );
      });
  }

  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    financialYear: string,
    fileIndex: number
  ) {
    this.dataEntryService
      .uploadFileToS3(file, s3URL)
      // Currently we are not tracking file upload progress. If it is need, uncomment the below code.
      // .pipe(
      //   map((response: HttpEvent<any>) =>
      //     this.logUploadProgess(response, file, fileAlias, fileIndex)
      //   )
      // )
      .subscribe(res => {
        if (res.type === HttpEventType.Response) {
          this.dataEntryService
            .sendUploadFileForProcessing(fileAlias, financialYear)
            .subscribe(res => {
              this.startFileProcessTracking(
                file,
                res["data"]["_id"],
                fileIndex
              );
            });
        }
      });
  }

  private logUploadProgess(
    event: HttpEvent<any>,
    file: File,
    fileAlias: string,
    fileIndex: number
  ) {
    if (event.type === HttpEventType.UploadProgress) {
      const percentDone = Math.round((100 * event.loaded) / event.total);
      this.fileUploadTracker[fileIndex] = {
        percentage: percentDone,
        alias: fileAlias
      };
    }
    return event;
  }

  /**
   * @description
   * Once a file is uploaded to cloud, this method is executed to keep the track
   * of progress of processing of file. The api will be called again and again
   * after some interval(2s) to check their status. Tracking will be stopped when
   * the file proceesing is either completed or has FAILED.
   */
  private startFileProcessTracking(
    file: File,
    fileId: string,
    _fileIndex: number
  ) {
    this.fileProcessingTracker[_fileIndex] = {
      status: "in-process",
      message: "Processing"
    };

    this.dataEntryService
      .getFileProcessingStatus(fileId)
      .pipe(
        map(response => {
          this.fileProcessingTracker[_fileIndex].message = response.message;
          if (!response.completed && response.status !== "FAILED") {
            /**
             * We are throwing error because we need to call the api again
             * after some time (2s right now) to check if processing of
             * file is completed or not. Once it is completed or FAILED, then we stop
             * calling the api for that file.
             */
            Observable.throw("throw any error here");
          }
          return response;
        }),
        retryWhen(err => err.pipe(delay(2000)))
      )
      .subscribe(
        response => {
          this.fileProcessingTracker[_fileIndex].message = response.message;
          this.fileProcessingTracker[_fileIndex].status =
            response.status === "FAILED" ? "FAILED" : "completed";
        },
        err => {
          this.fileProcessingTracker[fileId].status = "FAILED";
        }
      );
  }

  /**
   *  @description
   * This Function will be invoked whenever user selects file for upload.
   */
  fileChangeEvent(fileInput: Event) {
    const filesSelected = <Array<File>>fileInput.target["files"];
    this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
  }

  filterInvalidFilesForUpload(filesSelected: File[]) {
    const validFiles = [];
    for (let i = 0; i < filesSelected.length; i++) {
      const file = filesSelected[i];
      const fileExtension = file.name.split(`.`).pop();
      if (fileExtension === "xls" || fileExtension === "xlsx") {
        validFiles.push(file);
      }
    }
    return validFiles;
  }
}
