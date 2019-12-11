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
  constructor(
    private formBuilder: FormBuilder,
    private dataEntryService: DataEntryService
  ) {}
  submitted = false;
  years: any = [];
  bulkEntryForm: FormGroup;
  filesToUpload: Array<File> = [];
  uploadResult: any;

  fileUploadTracker: {
    [fileName: string]: { alias: string; percentage: number };
  } = {};
  fileProcessingTracker: {
    [fileName: string]: { status: "in-process" | "completed"; message: string };
  } = {};

  ngOnInit() {
    this.years = ["2015-16", "2016-17", "2017-18"];
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
      this.uploadFile(files[i]);
    }
    // this.dataEntryService
    //   .bulkEntry(formData)
    //   .pipe(
    //     map((response: HttpEvent<any>) => {
    //       return this.logUploadProgess(response);
    //     })
    //   )
    //   .subscribe(res => {
    //     if (res["success"]) {
    //       this.uploadResult = res["data"];
    //       alert("Upload summary is available below");
    //     }
    //   });
  }

  doTemporaryS3Magic(file: File) {
    this.dataEntryService
      .getS3URL(file.name, file.type)
      .subscribe(s3Response => {
        const fileAlias = s3Response["data"][0]["file_alias"];
        const s3URL = s3Response["data"][0].url;
        this.uploadFileToS3(
          file,
          s3URL,
          fileAlias,
          this.bulkEntryForm.get("year").value
        );
      });
  }

  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    financialYear: string
  ) {
    this.dataEntryService
      .uploadFileToS3(file, s3URL)
      .pipe(
        map((response: HttpEvent<any>) =>
          this.logUploadProgess(response, file, fileAlias)
        )
      )
      .subscribe(res => {
        if (res.type === HttpEventType.Response) {
          this.dataEntryService
            .sendUploadFileForProcessing(fileAlias, financialYear)
            .subscribe(res =>
              this.startFileProcessTracking(file, res["data"]["_id"])
            );
        }
      });
  }

  uploadFile(file: File) {
    // const formData: FormData = new FormData();
    // formData.append("year", this.bulkEntryForm.get("year").value);
    // formData.append("file", file, file.name);

    this.doTemporaryS3Magic(file);
  }

  private logUploadProgess(
    event: HttpEvent<any>,
    file: File,
    fileAlias: string
  ) {
    if (event.type === HttpEventType.UploadProgress) {
      const percentDone = Math.round((100 * event.loaded) / event.total);
      // if (percentDone === 100) {
      //   this.startFileProcessTracking(file);
      // }
      this.fileUploadTracker[file.name] = {
        percentage: percentDone,
        alias: fileAlias
      };
    }
    return event;
  }

  private startFileProcessTracking(file: File, fileId: string) {
    this.fileProcessingTracker[file.name] = {
      status: "in-process",
      message: "Processing"
    };

    // IMPORTANT This function will need to call the actual api. Check the service to know more.
    this.dataEntryService
      .getFileProcessingStatus(fileId)
      .pipe(
        map(response => {
          this.fileProcessingTracker[file.name].message = response.message;
          if (!response.completed) {
            Observable.throw("asdas");
          }
          return response;
        }),
        retryWhen(err => err.pipe(delay(2000)))
      )
      .subscribe(response => {
        this.fileProcessingTracker[file.name].message = response.message;
        this.fileProcessingTracker[file.name].status = "completed";
      });
  }

  fileChangeEvent(fileInput: Event) {
    this.filesToUpload = <Array<File>>fileInput.target["files"];
    // this.product.photo = fileInput.target.files[0]['name'];
  }
}
