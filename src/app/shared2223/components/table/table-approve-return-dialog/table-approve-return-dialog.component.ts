import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
const swal: SweetAlert = require("sweetalert");
import { SweetAlert } from "sweetalert/typings/core";
@Component({
  selector: 'app-table-approve-return-dialog',
  templateUrl: './table-approve-return-dialog.component.html',
  styleUrls: ['./table-approve-return-dialog.component.scss']
})
export class TableApproveReturnDialogComponent implements OnInit {
  change = '';
  errorMessege: any = '';
  alertError =
    "You have some unsaved changes on this page. Do you wish to save your data as draft?";
  errorMessegeStateAct: any = '';
  stateActFileName;
  stateActUrl = ''
  showStateAct:boolean = false;
  filesToUpload: Array<File> = [];
  filesAlreadyInProcess: number[] = [];
  subscription: any;
  apiData = {};
  body:any;
  clickedSave;
  routerNavigate = null;
  submitted :boolean = false
  isDisabled:boolean = false;
  activeClass:boolean = false;
  stateActFileUrl;
  constitutedValue;
  constitutedValueActive :boolean = false
  memorandum:boolean = false
  noteMessege:boolean = false
  commonActionCondition:boolean = false;
  // isDisabled:boolean =false
  previewFormData:any;
  // @ViewChild("templateSave") template;
  fileUploadTracker: {
    [fileIndex: number]: {
      alias?: string;
      percentage?: number;
      status: "in-process" | "FAILED" | "completed";
    };
  } = {};
  constructor(@Inject(
    MAT_DIALOG_DATA) public data: any,
  private dataEntryService: DataEntryService,
  private _matDialog: MatDialog,
  ) {
    console.log(data)
   }

  ngOnInit(): void {
  }
   
  uploadButtonClicked(formName) {
    sessionStorage.setItem("changeInPto", "true")
    this.change = "true";
  }
  fileChangeEvent(event, progessType) {
    console.log(progessType)
    
    if(progessType == 'stateActProgress'){
      if (event.target.files[0].size >= 20000000) {
        this.errorMessegeStateAct = 'File size should be less than 20Mb.'
        // this.stateFinance.controls.stateNotification.reset();
        const error = setTimeout(() => {
          this.showStateAct = false
          this.errorMessegeStateAct = ''
        }, 4000);
        return;
      }
    }
   
      const fileName = event.target.files[0].name;
      
      if (progessType == 'stateActProgress') {
        this.stateActFileName = event.target.files[0].name;
        this.showStateAct = true;
      }
      const filesSelected = <Array<File>>event.target["files"];
      this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
      this.upload(progessType, fileName);
    
  }
  clearFile(type: string = '') {
    if(type == 'stateAct'){
      this.showStateAct = false;
      this.stateActFileName = ''
      // this.stateFinance.patchValue({
      //   stateNotification:{
      //     url:'',
      //     name: ''
      //  }
      // });
      // this.stateFinance.controls.stateNotification['controls'].name.setValidators(Validators.required);
      // this.stateFinance.controls.stateNotification['controls'].name.updateValueAndValidity();
      // console.log(this.stateFinance.controls)
    }
    sessionStorage.setItem("changeInStateFinance", "true");
      
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

  uploadFile(file: File, fileIndex: number, progessType, fileName) {
    return new Promise((resolve, reject) => {
      this.dataEntryService.getURLForFileUpload(file.name, file.type).subscribe(
        (s3Response) => {
          let fileAlias = s3Response["data"][0]["file_alias"];
          this[progessType] = Math.floor(Math.random() * 90) + 10;
          // if(progessType == 'rulesByLawsProgress'){
          //   this[progessType] = Math.floor(Math.random() * 90) + 10;
          // }
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
            console.log(err)
          } else {
            this.fileUploadTracker[fileIndex].status = "FAILED";
            console.log(err)
          }
        }
      );
    })
  }
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
            
            if (progressType == 'stateActProgress') {
              this.stateActUrl = fileAlias;
              console.log(this.stateActUrl)
              // this.stateFinance.get('stateNotification').patchValue({
              //   url: fileAlias,
              //   name: file.name
              // })
              // sessionStorage.setItem("changeInStateFinance", "true");
              console.log(file)
              console.log(s3URL)
            }
          }
        },
        (err) => {
          this.fileUploadTracker[fileIndex].status = "FAILED";
          console.log(err);
        }
      );
  }
  alertSave(){
  
    this._matDialog.closeAll();
    swal(
      "Confirmation !",
      `Are you sure you want to save this data ?`,
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
  onSubmit(type){
    swal('Saved Data !!!!!!','Saved Data Successfully !!!')
  }
}
