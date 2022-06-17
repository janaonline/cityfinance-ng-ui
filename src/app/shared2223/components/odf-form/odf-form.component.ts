import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
const swal: SweetAlert = require("sweetalert");
import { SweetAlert } from "sweetalert/typings/core";
@Component({
  selector: 'app-odf-form',
  templateUrl: './odf-form.component.html',
  styleUrls: ['./odf-form.component.scss']
})
export class OdfFormComponent implements OnInit {

  constructor(private dataEntryService: DataEntryService) { }
  change = ''
  submitted = false;
  filesToUpload: Array<File> = [];
  filesAlreadyInProcess: number[] = [];
  millionTiedFileUrl = '';
  clickedCrossA = false
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
  ngOnInit(): void {
  }
  uploadButtonClicked(formName) {
    sessionStorage.setItem("changeInGTC", "true")
    this.change = "true";
  }
  fileChangeEvent(event, progessType, fileName) {
    console.log(event, fileName)
    this.submitted = false;
    this.resetFileTracker();
    const filesSelected = <Array<File>>event.target["files"];
    this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
    this.upload(progessType, fileName);
  }
  resetFileTracker() {
    this.filesToUpload = [];
    this.filesAlreadyInProcess = [];
    this.fileProcessingTracker = {};
    this.fileUploadTracker = {};
  }
  filterInvalidFilesForUpload(filesSelected: File[]) {
    const validFiles = [];
    for (let i = 0; i < filesSelected.length; i++) {
      const file = filesSelected[i];
      const fileExtension = file.name.split(`.`).pop();
      if (fileExtension === "pdf") {
        validFiles.push(file);
      } else {
        swal("Only PDF File can be Uploaded.")
        return;
      }
    }
    return validFiles;
  }
  async upload(progessType, fileName) {
    const formData: FormData = new FormData();
    const files: Array<File> = this.filesToUpload;
    this[fileName] = files[0].name;
    console.log(files[0].name)
    let fileExtension = files[0].name.split('.').pop();
    console.log(fileExtension)
    this[progessType] = 10;
    for (let i = 0; i < files.length; i++) {
      if (this.filesAlreadyInProcess.length > i) {
        continue;
      }
      this.filesAlreadyInProcess.push(i);
      await this.uploadFile(files[i], i, progessType, fileName);
    }


  }
  millionTiedProgress_2021;
  clearFiles(fileName) {
    sessionStorage.setItem("changeInGTC", "true")
   
    this.change = "true"
     if(fileName == 'fileName_millionTied_2021'){
      this.clickedCrossA = true
      this.millionTiedFileUrl = ''
      this.millionTiedProgress_2021 = '';
    }
    // this.checkDiff();
  }
  uploadFile(file: File, fileIndex: number, progessType, fileName) {
    return new Promise((resolve, reject) => {
      this.dataEntryService.getURLForFileUpload(file.name, file.type).subscribe(
        (s3Response) => {
          const fileAlias = s3Response["data"][0]["file_alias"];
          this[progessType] = Math.floor(Math.random() * 90) + 10;
          const s3URL = s3Response["data"][0].url;
          this.uploadFileToS3(
            file,
            s3URL,
            fileAlias,
            fileIndex,
            progessType
          );
          resolve("success")
          console.log('file url', fileAlias)
          // if (fileName === 'fileName_millionTied') {
          //   this.stateActionA = 'PENDING';
          //   this.rejectReasonA = null
          // }
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
  millionTiedFileUrl_2021 = '';
  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    fileIndex: number,
    progressType: string = ''
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
            this[progressType] = 100;
            if (progressType == 'millionTiedProgress') {
              this.millionTiedFileUrl = fileAlias;
            }else if (progressType == 'millionTiedProgress_2021') {
              this.millionTiedFileUrl_2021 = fileAlias;
            } 
            // console.log('Progress -', progressType, this.millionTiedFileUrl, this.nonMillionTiedFileUrl, this.nonMillionUntiedFileUrl)
            // this.checkDiff();
          }
        },
        (err) => {
          this.fileUploadTracker[fileIndex].status = "FAILED";
        }
      );
  }
}
