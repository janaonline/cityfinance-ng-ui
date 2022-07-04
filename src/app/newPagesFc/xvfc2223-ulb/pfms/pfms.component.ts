import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  registerForm: FormGroup;
  submitted = false;
  ulbId: any;
  designYearId: any;
  constructor(private formBuilder: FormBuilder, private dataEntryService: DataEntryService) {
    this.ulbData = JSON.parse(localStorage.getItem("userData"));
    console.log(this.ulbData)
    this.ulbId = this.ulbData.ulb
    this.ulbName = this.ulbData?.name
    this.design_year = JSON.parse(localStorage.getItem("Years"));
    for (var i in this.design_year) {
      if (i == '2022-23') {
        this.yearValue = i;
        this.designYearId = this.design_year[i]
        console.log(this.designYearId)
      }
    }
  }
  change = ''
  errorMessege: any = '';
  showIcon: boolean = false;
  pfmsFileName;
  pfmsLinkProgress;
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

  activeClass: boolean = false
  activeClassBottom: boolean = false
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      linkPFMS: [''],
      isUlbLinkedWithPFMS: [''],
      PFMSAccountNumber: [''],
      ulb: this.ulbId,
      design_year: this.designYearId,
      cert: this.formBuilder.group({
        url: [''],
        name: [''],
      }),
      otherDocs: this.formBuilder.group({
        url: [''],
        name: [''],
      }),
      isDraft: false
      // title: ['', Validators.required],
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      // dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      // email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required],
      // acceptTerms: [false, Validators.requiredTrue]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    console.log(this.registerForm.value)
  }

  saveDraft() {

  }
  activeClassNo: boolean = false
  activeClassNoBottom: boolean = false
  clickYes() {
    this.showOtherQuestions = true
    this.activeClass = true
    this.linkedToggle = false
    this.activeClassBottom = false
    this.activeClassNo = false
  }
  clickNo() {
    this.showOtherQuestions = false
    this.activeClass = false
    this.activeClassNo = true
  }
  linkedYes() {
    this.linkedToggle = true
    this.activeClass = true
    this.activeClassBottom = true
    this.activeClassNoBottom = false
  }
  linkedNo() {
    this.linkedToggle = false
    this.activeClassBottom = false
    this.activeClassNoBottom = true
  }
  uploadButtonClicked(formName) {
    sessionStorage.setItem("changeInGTC", "true")
    this.change = "true";
  }
  fileChangeEvent(event, progessType, fileName) {
    
      if (event.target.files[0].size >= 5000000) {
        this.errorMessege = 'File size should be less than 5Mb.'
        this.registerForm.controls.cert.reset();
        const error = setTimeout(() => {
          this.showIcon = false
          this.errorMessege = ''
        }, 4000);
        return;
      }
      this.pfmsFileName = event.target.files[0].name;
      if (this.pfmsFileName) {
        this.showIcon = true
      } else {
        this.showIcon = false
      }
      const filesSelected = <Array<File>>event.target["files"];
      this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
      this.upload(progessType, this.pfmsFileName);
    
  }
  clearFile() {
    this.showIcon = false
    this.pfmsFileName = ''
    this.registerForm.patchValue({
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
            if (progressType == 'pfmsLinkProgress') {
              this.odfUrl = fileAlias;
              this.registerForm.get('cert').patchValue({
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
