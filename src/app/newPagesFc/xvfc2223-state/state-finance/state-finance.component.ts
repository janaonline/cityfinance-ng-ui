import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';
import { StateFinancePreviewComponent } from './state-finance-preview/state-finance-preview.component';
const swal: SweetAlert = require("sweetalert");
import { SweetAlert } from "sweetalert/typings/core";
import { I } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-state-finance',
  templateUrl: './state-finance.component.html',
  styleUrls: ['./state-finance.component.scss']
})
export class StateFinanceComponent implements OnInit {
  userData;
  design_year;
  stateId;
  yearValue;
  stateFinance: FormGroup;
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
  dialogRef;
  stateActFileUrl;
  constitutedValue;
  constitutedValueActive :boolean = false
  memorandum:boolean = false
  noteMessege:boolean = false
  commonActionCondition:boolean = false;
  // isDisabled:boolean =false
  previewFormData:any;
  @ViewChild("templateSave") template;
  fileUploadTracker: {
    [fileIndex: number]: {
      alias?: string;
      percentage?: number;
      status: "in-process" | "FAILED" | "completed";
    };
  } = {};
  constructor(public _router: Router,public dialog: MatDialog,private formBuilder: FormBuilder,private ptService: NewCommonService,private dataEntryService: DataEntryService) {
    this.design_year = JSON.parse(localStorage.getItem("Years"));
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.stateId = this.userData?.state;
    this.yearValue = this.design_year["2022-23"];
    this.navigationCheck();
    this.initializeForm();
   }

  ngOnInit(): void {
    this.clickedSave = false;
    sessionStorage.setItem('changeInStateFinance', 'false');   
    this.onload();
  }
  get f() { return this.stateFinance.controls; }
  
  initializeForm(){
    this.stateFinance = this.formBuilder.group({
      constitutedSfc: [this.constitutedValue, Validators.required],
      state: this.stateId,
      design_year: this.yearValue,
      stateNotification: this.formBuilder.group({
        url: ['', Validators.required],
        name: ['', Validators.required]
      }),
      message:''
    });
  }
  onload(){
    this.getStateFinanceData();
  }
  outputData(event){
   console.log(event)
  }
  onChange(event){
   console.log(event)
   if (event == 'No'){
    this.stateActFileName = '';
    this.showStateAct = false
    this.removeValidatorInBulk(this.stateFinance.get('stateNotification'));
    this.stateFinance.patchValue({
      stateNotification:{
        url: '',
        name: ''
     }
    });
   }else if(event == 'Yes'){
    this.stateFinance.controls.stateNotification['controls'].name.setValidators(Validators.required)
      this.stateFinance.controls.stateNotification['controls'].name.updateValueAndValidity()
   }
    sessionStorage.setItem('changeInStateFinance', 'true');
  }
  removeValidatorInBulk(form:any){
    console.log('form contro',form);
    for (const field in form.controls) { // 'field' is a string
     let con = form.get(field); // 'control' is a FormControl
      con.clearValidators();
      con.updateValueAndValidity();
    }
  }
  setValidators(formFieldName: string) {
    this.stateFinance.controls[formFieldName].setValidators([Validators.required]);    
    this.stateFinance.controls[formFieldName].updateValueAndValidity();
  }
  getStateFinanceData(){
    const params = {
      state: this.stateId,
      design_year: this.yearValue,
    };
    console.log(params)
    //call api and subscribe and patch here
    this.ptService.getStateFinance(params).subscribe((res:any)=>{
      console.log(res)
      res?.data?.isDraft == false ? this.isDisabled = true : this.isDisabled = false
      res?.data?.isDraft == false ? this.commonActionCondition = true : this.commonActionCondition = false;
      this.previewFormData = res
      this.patchFunction(this.previewFormData);
    })
  }

  patchFunction(data){
    console.log(data)
    // this.showStateAct = true
    this.stateActFileName = data?.data?.stateNotification?.name;
    this.stateActFileUrl = data?.data?.stateNotification?.url;
    this.stateActFileName ? this.showStateAct = true : false;

    this.stateFinance.patchValue({
      constitutedSfc: data?.data?.constitutedSfc,
      state: this.stateId,
      design_year: this.yearValue,
      stateNotification: {
        url: data?.data?.stateNotification?.url,
        name: data?.data?.stateNotification?.name
      },
      message:''
        });

  }

  alertFormFinalSubmit() {
    this.submitted = true;
    this.activeClass = true;
    if (this.stateFinance.invalid) {
      swal(
        "Missing Data !",
        "One or more required fields are empty or contains invalid data. Please check your input.",
        "error"
      );
      return;
    } else {
      swal(
        "Confirmation !",
        `Are you sure you want to submit this form? Once submitted,
       it will become uneditable and will be sent to Mohua for Review.
        Alternatively, you can save as draft for now and submit it later.`,
        "warning",
        {
          buttons: {
            Submit: {
              text: "Submit",
              value: "submit",
            },
            Draft: {
              text: "Save as Draft",
              value: "draft",
            },
            Cancel: {
              text: "Cancel",
              value: "cancel",
            },
          },
        }
      ).then((value) => {
        switch (value) {
          case "submit":
            this.onSubmit("submit");
            break;
          case "draft":
            this.onDraft();
            break;
          case "cancel":
            break;
        }
      });
      // this.onSubmit('submit');
    }
  }

  onSubmit(type){
    console.log(this.stateFinance);
    let body = {
      ...this.stateFinance.value,
      isDraft: false,
      design_year: this.yearValue,
      state: this.stateId,
    };
    console.log(body)
    console.log('submitted',this.stateFinance.value)
    this.submitted =true; 
    this.ptService.submitStateFinance(body).subscribe((res :any)=>{
      console.log(res)
      this.clickedSave = false;
      if (res && res.status) {
        sessionStorage.setItem("changeInStateFinance", "false");
        this.clickedSave = false;
        this.isDisabled = true;
        this.commonActionCondition = true;
        console.log(res)
        this.getStateFinanceData()
        swal("Saved", "Data saved successfully", "success");
      } else {
        swal("Error", res?.message ? res?.message : "Error", "error");
      }
    },
    (error) => {
      console.error("err", error);
      swal("Error", error ? error : "Error", "error");
    })
  }
  removeValidation(){
    this.stateFinance.get('stateNotification').clearValidators();
    this.stateFinance.get('stateNotification').updateValueAndValidity();
  }
  onDraft(){
    this.removeValidatorInBulk(this.stateFinance.get('stateNotification'));
    console.log('saved as draft')
    console.log('submitted',this.stateFinance.value)
    this.body = {
      ...this.stateFinance.value,
      isDraft: true,
      // design_year: this.yearValue,
      // state: this.stateId,
    };
    console.log(this.body)
    this.ptService.submitStateFinance(this.body).subscribe((res :any)=>{
      console.log(res)
      if (res && res.status) {
        sessionStorage.removeItem("changeInStateFinance");
        console.log(res)
        this.clickedSave = false;
        this.getStateFinanceData()
        swal("Saved", "Data saved as draft successfully.", "success");
      } else {
        this.clickedSave = false;
        swal("Error", res?.message ? res?.message : "Error", "error");
      }
    },
    (error) => {
      console.error("err", error);
      swal("Error", error ? error : "Error", "error");
    })
  }
  
  preview(){
    console.log('valuessssssssss',this.stateFinance.value)
    let previewData = {
      dataPreview : this.stateFinance.value,
      preData: this.previewFormData
    }
    console.log(previewData)
    const dialogRef = this.dialog.open(StateFinancePreviewComponent, {
      data: previewData,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
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
        this.stateFinance.controls.stateNotification.reset();
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
      this.stateFinance.patchValue({
        stateNotification:{
          url:'',
          name: ''
       }
      });
      this.stateFinance.controls.stateNotification['controls'].name.setValidators(Validators.required);
      this.stateFinance.controls.stateNotification['controls'].name.updateValueAndValidity();
      console.log(this.stateFinance.controls)
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
        this.showStateAct = false
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
              this.stateFinance.get('stateNotification').patchValue({
                url: fileAlias,
                name: file.name
              })
              sessionStorage.setItem("changeInStateFinance", "true");
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
  navigationCheck() {
    if (!this.clickedSave) {
      this._router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          let changeInForm;
          this.alertError =
            "You have some unsaved changes on this page. Do you wish to save your data as draft?";
          
            changeInForm = sessionStorage.getItem("changeInStateFinance");
          
          // const changeInAnnual = sessionStorage.getItem("changeInAnnualAcc");
          if (event.url === "/" || event.url === "/login") {
           
              sessionStorage.setItem("changeInStateFinance", "false");
            
            return;
          }
          if (changeInForm === "true" && this.routerNavigate === null) {
            const currentRoute = this._router.routerState;
            this._router.navigateByUrl(currentRoute.snapshot.url, {
              skipLocationChange: true,
            });
            this.routerNavigate = event;
            this.dialog.closeAll();
            this.openDialog(this.template);
          }
        }
      });
    }
  }
  openDialog(template) {
    if (template == undefined) return;
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this.dialog.open(template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      console.log("result", result);
      if (result === undefined) {
        if (this.routerNavigate) {
          // this.routerNavigate = null;
        }
      }
    });
  }
  async stay() {
    await this.dialogRef.close();
    this.dialog.closeAll();
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }
  async proceed() {
    this.dialogRef.close();
    this.dialog.closeAll();
    if (this.routerNavigate) {
      await this.onDraft();
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
    await this.onDraft();
    return this._router.navigate(["ulbform2223/slbs"]);
  }
  async discard() {
    
      sessionStorage.setItem("changeInStateFinance", "false");
    
    await this.dialogRef.close(true);
    if (this.routerNavigate) {
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
  }
  alertClose() {
    this.stay();
  }
}

