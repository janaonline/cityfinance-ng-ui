import { I } from '@angular/cdk/keycodes';
import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';

import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: "app-table-approve-return-dialog",
  templateUrl: "./table-approve-return-dialog.component.html",
  styleUrls: ["./table-approve-return-dialog.component.scss"],
})
export class TableApproveReturnDialogComponent implements OnInit {
  approveReturnForm: FormGroup;
  change = "";
  errorMessege: any = "";
  alertError =
    "You have some unsaved changes on this page. Do you wish to save your data as draft?";
  errorMessegeStateAct: any = "";
  stateActFileName;
  stateActUrl = "";
  showStateAct: boolean = false;
  filesToUpload: Array<File> = [];
  filesAlreadyInProcess: number[] = [];
  subscription: any;
  submitted: boolean = false;
  isDisabled: boolean = false;
  stateActFileUrl;
  commonActionCondition: boolean = false;
  retuenErrorMsg = 'Return reason is mandatory.';
  retuenError = false;
  fileUploadTracker: {
    [fileIndex: number]: {
      alias?: string;
      percentage?: number;
      status: "in-process" | "FAILED" | "completed";
    };
  } = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataEntryService: DataEntryService,
    private _matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private newCommonService: NewCommonService
  ) {
    console.log(data);
    this.design_year = JSON.parse(localStorage.getItem("Years"));
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.initializeForm();
  }
  design_year;
  userData;
  formName = '';
  ngOnInit(): void {
    // this.onLoad();
  }

  get f() {
    return this.approveReturnForm.controls;
  }
  emptyArr = []
  initializeForm() {
    if (this.data?.tableName == 'Review State Forms') {
      this.approveReturnForm = this.formBuilder.group({
        responseFile: this.formBuilder.group({
          url: [""],
          name: [""],
        }),
        rejectReason: [""],
        state: [this.data?.selectedId],
        statesData: [this.emptyArr],
        formId: [this.data?.formId],
        design_year: [this.getDesignYear()],
      });
    } else {
      this.approveReturnForm = this.formBuilder.group({
        responseFile: this.formBuilder.group({
          url: [""],
          name: [""],
        }),
        rejectReason: [""],
        ulb: [this.data?.selectedId],
        formId: [this.data?.formId],
        design_year: [this.getDesignYear()],
      });
    }

  }


  getDesignYear() {
    let design_year = JSON.parse(localStorage.getItem("Years"));
    return design_year["2022-23"];
  }

  uploadButtonClicked(formName) {
    // sessionStorage.setItem("changeInPto", "true");
    // this.change = "true";
  }

  fileChangeEvent(event, progessType) {
    let isfileValid =  this.dataEntryService.checkSpcialCharInFileName(event.target.files);
    if(isfileValid == false){
      swal("Error","File name has special characters ~`!#$%^&*+=[]\\\';,/{}|\":<>? \nThese are not allowed in file name,please edit file name then upload.\n", 'error');
       return;
    }
    console.log(progessType);
    if (progessType == "stateActProgress") {
      if (event.target.files[0].size >= 20000000) {
        this.errorMessegeStateAct = "File size should be less than 20Mb.";
        this.approveReturnForm.controls.responseFile.reset();
        const error = setTimeout(() => {
          this.showStateAct = false;
          this.errorMessegeStateAct = "";
        }, 4000);
        return;
      }
    }
    const fileName = event.target.files[0].name;
    if (progessType == "stateActProgress") {
      this.stateActFileName = event.target.files[0].name;
      this.showStateAct = true;
    }
    const filesSelected = <Array<File>>event.target["files"];
    this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
    this.upload(progessType, fileName);
  }

  clearFile(type: string = "") {
    if (type == "stateAct") {
      this.showStateAct = false;
      this.stateActFileName = "";
      this.approveReturnForm.patchValue({
        responseFile: {
          url: "",
          name: "",
        },
      });
    }

  }
  filterInvalidFilesForUpload(filesSelected: File[]) {
    const validFiles = [];
    for (let i = 0; i < filesSelected.length; i++) {
      const file = filesSelected[i];
      const fileExtension = file.name.split(`.`).pop();
      if (fileExtension === "pdf") {
        validFiles.push(file);
      } else {
        swal("Only PDF File can be Uploaded.");
        return;
      }
    }
    return validFiles;
  }
  async upload(progessType, fileName) {
    const formData: FormData = new FormData();
    const files: Array<File> = this.filesToUpload;
    this[fileName] = files[0].name;
    console.log(files[0].name);
    let fileExtension = files[0].name.split(".").pop();
    console.log(fileExtension);
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
      // this.formName = this.data?.formName ? this.data?.formName : 'review_table';
      let form_name = sessionStorage.getItem('form_name');
      let code = ''
      // if(this.userData?.role == 'STATE'){
      //   code = this.userData?.stateCode;
      // }else {
      //   code = 'mohua';
      // }
      //let folderName = `${this.userData?.role}/${this.Years['2022-23']}//${this.userData?.ulb}`
      let folderName = `${this.userData?.role}/2022-23/supporting_douments/review_table/${form_name}`
      this.dataEntryService.newGetURLForFileUpload(file.name, file.type, folderName).subscribe(
        (s3Response) => {
          let fileAlias = s3Response["data"][0]["file_url"];
          this[progessType] = Math.floor(Math.random() * 90) + 10;
          const s3URL = s3Response["data"][0].url;
          this.uploadFileToS3(file, s3URL, fileAlias, fileIndex, progessType);
          resolve("success");
        },
        (err) => {
          if (!this.fileUploadTracker[fileIndex]) {
            this.fileUploadTracker[fileIndex] = {
              status: "FAILED",
            };
            console.log(err);
          } else {
            this.fileUploadTracker[fileIndex].status = "FAILED";
            console.log(err);
          }
        }
      );
    });
  }
  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    fileIndex: number,
    progressType: string = ""
  ) {
    this.subscription = this.dataEntryService
      .uploadFileToS3(file, s3URL)
      .subscribe(
        (res) => {
          if (res.type === HttpEventType.Response) {
            this[progressType] = 100;

            if (progressType == "stateActProgress") {
              this.stateActUrl = fileAlias;
              console.log(this.stateActUrl);
              this.approveReturnForm.get("responseFile").patchValue({
                url: fileAlias,
                name: file.name,
              });
              // sessionStorage.setItem("changeInStateFinance", "true");
              console.log(file);
              console.log(s3URL);
            }
          }
        },
        (err) => {
          this.fileUploadTracker[fileIndex].status = "FAILED";
          console.log(err);
        }
      );
  }
  alertSave() {
    console.log('save data', this.approveReturnForm.value)
    if (this.data.type == "Return" && this.approveReturnForm.value?.rejectReason == "") {
      this.retuenError = true;
      return;
    } else {
      this.retuenError = false;
      this._matDialog.closeAll();
      swal(
        "Confirmation !",
        `Are you sure you want to save this action ?`,
        "warning",
        {
          buttons: {
            Submit: {
              text: "Yes",
              value: "yes",
            },
            Cancel: {
              text: "No",
              value: "no",
            },
          },
        }
      ).then((value) => {
        switch (value) {
          case "yes":
            this.onSubmit("yes");
            break;
          case "no":
            break;
        }
      });
    }

  }
  obj;
  onSubmit(type) {
    if (this.data.type == "Approve") {
      this.obj = {
        ...this.approveReturnForm.value,
        status: "APPROVED",
      };
    } else {
      this.obj = {
        ...this.approveReturnForm.value,
        status: "REJECTED",
      };
    }

    this.newCommonService.postTableApproveRejectData(this.obj).subscribe(
      (res: any) => {
        console.log("post successful", res);
        swal("Saved", "Saved Data Successfully", "success");
        //   this.newCommonService.multiAction.next(true);
        this.approveReturnForm.reset();
        this.newCommonService.reviewStatus.next(true);
      },
      (error) => {
        console.error("err", error);
        swal("Error", error ? error : "Error", "error");
      }
    );
  }
  close() {
    this._matDialog.closeAll();
  }
}
