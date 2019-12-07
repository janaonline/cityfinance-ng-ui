import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

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

  fileUploadTracker: { [fileName: string]: number } = {};
  fileProcessingTracker: {
    [fileName: string]: "in-process" | "completed";
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

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append("year", this.bulkEntryForm.get("year").value);
    formData.append("files", file, file.name);
    console.log("uploading ", file.name);
    this.fileUploadTracker[file.name] = 0;
    this.dataEntryService
      .bulkEntry(formData)
      .pipe(
        map((response: HttpEvent<any>) => {
          return this.logUploadProgess(response, file);
        })
      )
      .subscribe(res => {
        if (res["success"]) {
          this.uploadResult = res["data"];
          alert("Upload summary is available below");
        }
      });
  }

  private logUploadProgess(event: HttpEvent<any>, file: File) {
    if (event.type === HttpEventType.UploadProgress) {
      console.log(event);
      const percentDone = Math.round((100 * event.loaded) / event.total);
      if (percentDone === 100) {
        this.startFileProcessTracking(file);
      }
      this.fileUploadTracker[file.name] = percentDone;
    }
    return event;
  }

  private startFileProcessTracking(file: File) {
    this.fileProcessingTracker[file.name] = "in-process";
  }

  fileChangeEvent(fileInput: Event) {
    this.filesToUpload = <Array<File>>fileInput.target["files"];
    console.log(this.filesToUpload);
    // this.product.photo = fileInput.target.files[0]['name'];
  }
}
