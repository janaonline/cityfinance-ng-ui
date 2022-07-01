import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
const swal: SweetAlert = require("sweetalert");
import { SweetAlert } from "sweetalert/typings/core";
import { HttpEventType, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-pfms',
  templateUrl: './pfms.component.html',
  styleUrls: ['./pfms.component.scss']
})
export class PfmsComponent implements OnInit {
  ulbData: any;
  ulbName: any;
  design_year: any;
  yearValue: any;
  constructor(private formBuilder: FormBuilder, private dataEntryService: DataEntryService) {
    this.ulbData = JSON.parse(localStorage.getItem("userData"));
    this.ulbName = this.ulbData?.name
    this.design_year = JSON.parse(localStorage.getItem("Years"));
    for (var i in this.design_year) {
      if (i == '2022-23') {
        this.yearValue = i;
        console.log(this.yearValue)
      }
    }
  }
  profileForm: FormGroup
  change = ''
  errorMessege: any = '';
  showIcon: boolean = false;
  odfFileName;
  odfProgress;
  odfUrl = ''
  showOtherQuestions: boolean = false;
  linkedToggle: boolean = false;
  filesToUpload: Array<File> = [];
  filesAlreadyInProcess: number[] = [];
  fileProcessingTracker: {
    [fileIndex: number]: {
      status: "in-process" | "completed" | "FAILED";
      message: string;
    };
  } = {};
  fileUploadTracker: {
    [fileIndex: number]: {
      alias?: string;
      percentage?: number;
      status: "in-process" | "FAILED" | "completed";
    };
  } = {};
  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      // rating: ['', Validators.required],
      // cert: this.formBuilder.group({
      //   url: ['', Validators.required],
      //   name: ['', Validators.required],
      // }),
      // certDate: ['', Validators.required],
      // ulb: '',
      // design_year: '',
      // status: 'PENDING',
      // isDraft: this.draft,
      // isGfc: this.isGfcOpen
    });
  }

  activeClass: boolean = false
  activeClassBottom: boolean = false
  clickYes() {
    this.showOtherQuestions = true
    this.activeClass = true
    this.linkedToggle = false
    this.activeClassBottom = false
  }
  clickNo() {
    this.showOtherQuestions = false
    this.activeClass = false
  }
  linkedYes() {
    this.linkedToggle = true
    this.activeClass = true
    this.activeClassBottom = true
  }
  linkedNo() {
    this.linkedToggle = false
    this.activeClassBottom = false
  }
  uploadButtonClicked(formName) {
    sessionStorage.setItem("changeInGTC", "true")
    this.change = "true";
  }
  fileChangeEvent(event, progessType, fileName) {
    if (event.target.files[0].size >= 5000000) {
      this.errorMessege = 'File size should be less than 5Mb.'
      this.profileForm.controls.cert.reset();
      const error = setTimeout(() => {
        this.showIcon = false
        this.errorMessege = ''
      }, 4000);
      return;
    }
    this.odfFileName = event.target.files[0].name;
    if (this.odfFileName) {
      this.showIcon = true
    } else {
      this.showIcon = false
    }
    const filesSelected = <Array<File>>event.target["files"];
    this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
    this.upload(progessType, this.odfFileName);
  }
  clearFile() {
    this.showIcon = false
    this.odfFileName = ''
    this.profileForm.patchValue({
      cert: ''
    })
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
  apiData = {}
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

  uploadFile(file: File, fileIndex: number, progessType, fileName) {
    return new Promise((resolve, reject) => {
      this.dataEntryService.getURLForFileUpload(file.name, file.type).subscribe(
        (s3Response) => {
          let fileAlias = s3Response["data"][0]["file_alias"];
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
  subscription: any;
  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    fileIndex: number,
    progressType: string = ''
  ) {
    this.subscription = this.dataEntryService
      .uploadFileToS3(file, s3URL)
      .subscribe(
        (res) => {
          if (res.type === HttpEventType.Response) {
            this[progressType] = 100;
            if (progressType == 'odfProgress') {
              this.odfUrl = fileAlias;
              this.profileForm.get('cert').patchValue({
                url: fileAlias,
                name: file.name
              })
              // this.profileForm.get('cert').patchValue({name:file.name})

              console.log(file)
              console.log(s3URL)
            }

          }
        },
        (err) => {
          this.fileUploadTracker[fileIndex].status = "FAILED";
        }
      );
  }
}
