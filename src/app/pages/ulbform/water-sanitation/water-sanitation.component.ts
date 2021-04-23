import { Component, OnInit } from '@angular/core';

import { UploadPlansService } from 'src/app/pages/ulbform/water-sanitation/upload-plans.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { FormBuilder } from '@angular/forms';
import { delay, map, retryWhen } from 'rxjs/operators';

@Component({
  selector: 'app-water-sanitation',
  templateUrl: './water-sanitation.component.html',
  styleUrls: ['./water-sanitation.component.scss']
})
export class WaterSanitationComponent implements OnInit {

  filesToUpload: Array<File> = [];
  fileUploadTracker: {
    [fileIndex: number]: {
      alias?: string;
      percentage?: number;
      status: "in-process" | "FAILED" | "completed";
    };
  } = {};

fileProcessingTracker: {
    [fileIndex: number]: {
      status: "in-process" | "completed" | "FAILED";
      message: string;
    };
  } = {};
  fileName;

  /* This is to keep track of which indexed which file is already either in data processing state
   * or in file Upload state
   */
  filesAlreadyInProcess: number[] = [];

  constructor(private formBuilder: FormBuilder,
    private dataEntryService: DataEntryService) { }

  ngOnInit(): void {


  }



  fileChangeEvent(event){

    this.resetFileTracker();
    const filesSelected = <Array<File>>event.target["files"];
    this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
  //   for (let i = 0; i < event.target.files.length; i++) {
  //     this.filesToUpload.push(event.target.files[i]);

  // }

  console.log(this.filesToUpload);


  this.upload();
  }
  resetFileTracker() {
    this.filesToUpload = [];
    this.filesAlreadyInProcess = [];
    this.fileProcessingTracker = {};
  //  this.submitted = false;
    this.fileUploadTracker = {};
  }
  filterInvalidFilesForUpload(filesSelected: File[]) {
    const validFiles = [];
    for (let i = 0; i < filesSelected.length; i++) {
      const file = filesSelected[i];
      const fileExtension = file.name.split(`.`).pop();
      if (fileExtension === "pdf" || fileExtension === "xlsx" || fileExtension == "png"
      || fileExtension == "jpg" || fileExtension == "jpeg") {
        validFiles.push(file);
      }
    }
    return validFiles;
  }


 async upload() {
   // this.submitted = true;

    const formData: FormData = new FormData();
    const files: Array<File> = this.filesToUpload;


   // formData.append("year", this.bulkEntryForm.get("year").value);
    for (let i = 0; i < files.length; i++) {
      if (this.filesAlreadyInProcess.length > i) {
        continue;
      }
      this.filesAlreadyInProcess.push(i);
    await this.uploadFile(files[i], i);
    }

  }


  uploadFile(file: File, fileIndex: number) {
    return new Promise((resolve, reject) => {
    this.dataEntryService.getURLForFileUpload(file.name, file.type).subscribe(
      (s3Response) => {
        const fileAlias = s3Response["data"][0]["file_alias"];
       //  this.photoUrl = this.tabelRows['controls'][urlIndex]['controls']['photos'].value;
       this.fileName = file.name;
//        this.photoUrl.push({url: fileAlias})

    //  this.tabelRows['controls'][urlIndex].patchValue({
    //    photos: photoUrl
    //  })
      const s3URL = s3Response["data"][0].url;
        this.uploadFileToS3(
          file,
          s3URL,
          fileAlias,
          fileIndex
        );
        resolve("success")
        console.log('file url', fileAlias)

      },
      (err) => {
        if (!this.fileUploadTracker[fileIndex]) {
          this.fileUploadTracker[fileIndex] = {
            status: "FAILED",
          };
        } else {
          this.fileUploadTracker[fileIndex].status = "FAILED";
        }
      }
    );
  })
  }

  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
  //  financialYear: string,
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
      .subscribe(
        (res) => {
          if (res.type === HttpEventType.Response) {
            // this.dataEntryService
            //   .sendUploadFileForProcessing(fileAlias)
              // .subscribe((res) => {
              //   this.startFileProcessTracking(
              //     file,
              //     res["data"]["_id"],
              //     fileIndex
              //   );
              // });
          }
        },
        (err) => {
          this.fileUploadTracker[fileIndex].status = "FAILED";
        }
      );
  }
  private startFileProcessTracking(
    file: File,
    fileId: string,
    _fileIndex: number
  ) {
    this.fileProcessingTracker[_fileIndex] = {
      status: "in-process",
      message: "Processing",
    };

    this.dataEntryService
      .getFileProcessingStatus(fileId)
      .pipe(
        map((response) => {
          this.fileProcessingTracker[_fileIndex].message = response.message;
          if (!response.completed && response.status !== "FAILED") {
            /**
             * We are throwing error because we need to call the api again
             * after some time (2s right now) to check if processing of
             * file is completed or not. Once it is completed or FAILED, then we stop
             * calling the api for that file.
             */
            observableThrowError("throw any error here");
          }
          return response;
        }),
        retryWhen((err) => err.pipe(delay(2000)))
      )
      .subscribe(
        (response) => {
          this.fileProcessingTracker[_fileIndex].message = response.message;
          this.fileProcessingTracker[_fileIndex].status =
            response.status === "FAILED" ? "FAILED" : "completed";
        },
        (err) => {
          if (!this.fileProcessingTracker[_fileIndex]) {
            this.fileProcessingTracker[fileId].status = "FAILED";
            this.fileProcessingTracker[fileId].message =
              "Server failed to process data.";
          }
        }
      );
  }












}
function observableThrowError(arg0: string) {
  throw new Error('Function not implemented.');
}

