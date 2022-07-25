import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';
const swal: SweetAlert = require("sweetalert");
import { SweetAlert } from "sweetalert/typings/core";
import { HttpEventType, HttpParams } from '@angular/common/http';
import { PropertyTaxFloorRatePreviewComponent } from '../propertyTaxFloorRate/property-tax-floor-rate-preview/property-tax-floor-rate-preview.component';
import { MatDialog,MatDialogConfig } from "@angular/material/dialog";
import { NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-property-tax-floor-rate',
  templateUrl: './property-tax-floor-rate.component.html',
  styleUrls: ['./property-tax-floor-rate.component.scss']
})
export class PropertyTaxFloorRateComponent implements OnInit {
  propertyForm: FormGroup;
  change = '';
  errorMessege: any = '';
  alertError =
    "You have some unsaved changes on this page. Do you wish to save your data as draft?";
  errorMessegeStateAct: any = '';
  errorMessegeOther: any = '';
  minimumFloorFileName;
  stateActFileName;
  miniumFloorProgress;
  minimumFloorUrl = '';
  rulesLawsUrl = '';
  stateActUrl = ''
  showRulesLaws:boolean= false;
  showMinimumFloor:boolean = false;
  showStateAct:boolean = false;
  rulesByLawsProgress;
  rulesLawsFileName:any;
  filesToUpload: Array<File> = [];
  filesAlreadyInProcess: number[] = [];
  subscription: any;
  apiData = {};
  body:any;
  clickedSave;
  routerNavigate = null;
  submitted :boolean = false
  isDisabled:boolean = false;
  dialogRef;
  stateActFileUrl;
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
  userData;
  design_year;
  stateId;
  yearValue;

  ngOnInit(): void {
    this.clickedSave = false;
    
    this.onload();
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.propertyForm.controls; }

  initializeForm(){
    this.propertyForm = this.formBuilder.group({
      actPage: ["", Validators.required],
      state: this.stateId,
      design_year: this.yearValue,
      comManual: this.formBuilder.group({
        url: [''],
        name: [''],
      }),
      floorRate: this.formBuilder.group({
        url: [''],
        name: [''],
      }),
      stateNotification: this.formBuilder.group({
        url: ["", Validators.required],
        name: ["", Validators.required],
      }),
    });
  }

  onload(){
    this.getPtoData();
  }
  
  getPtoData(){
    const params = {
      state: this.stateId,
      design_year: this.yearValue,
    };
    console.log(params)
    //call api and subscribe and patch here
    this.ptService.getPtData(params).subscribe((res:any)=>{
      console.log(res)
      res?.data?.isDraft == false ? this.isDisabled = true : this.isDisabled = false
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

    this.minimumFloorFileName = data?.data?.floorRate?.name;
    this.minimumFloorFileName ? this.showMinimumFloor = true : false;

    this.rulesLawsFileName = data?.data?.comManual?.name;
    this.rulesLawsFileName ? this.showRulesLaws = true : false;
    
    this.propertyForm.patchValue({
      actPage: data?.data?.actPage,
      state: data?.data?.state,
      design_year: data?.data?.design_year,
      comManual: {
        url: data?.data?.comManual?.url,
        name: data?.data?.comManual?.name,
      },
      floorRate: {
        url: data?.data?.floorRate?.url,
        name: data?.data?.floorRate?.name,
      },
      stateNotification: {
        url: data?.data?.stateNotification?.url,
        name: data?.data?.stateNotification?.name,
      },
        });

  }

  onSubmit(){
    console.log(this.propertyForm);
    let body = {
      ...this.propertyForm.value,
      isDraft: false,
      design_year: this.yearValue,
      state: this.stateId,
    };
    console.log(body)
    console.log('submitted',this.propertyForm.value)
    this.submitted =true;
    if (this.propertyForm.invalid) {
      return;
    }
    
    this.ptService.submitPtForm(body).subscribe((res :any)=>{
      console.log(res)
      this.clickedSave = false;
      if (res && res.status) {
        this.clickedSave = false;
        this.isDisabled = true
        console.log(res)
        this.getPtoData()
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

  onDraft(){
    console.log('saved as draft')
    console.log('submitted',this.propertyForm.value)
    this.body = {
      ...this.propertyForm.value,
      isDraft: true,
      design_year: this.yearValue,
      state: this.stateId,
    };
    this.ptService.submitPtForm(this.body).subscribe((res :any)=>{
      console.log(res)
      if (res && res.message) {
        console.log(res)
        this.clickedSave = false;
        this.getPtoData()
        swal("Saved as Draft", res.message);
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
    console.log('valuessssssssss',this.propertyForm.value)
    let previewData = {
      dataPreview : this.propertyForm.value,
      preData: this.previewFormData
    }
    console.log(previewData)
    const dialogRef = this.dialog.open(PropertyTaxFloorRatePreviewComponent, {
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
    if(progessType == 'minimumFloorProgress'){
      if (event.target.files[0].size >= 20000000) {
        this.errorMessege = 'File size should be less than 20Mb.'
        this.propertyForm.controls.floorRate.reset();
        const error = setTimeout(() => {
          this.showMinimumFloor = false
          this.errorMessege = ''
        }, 4000);
        return;
      }
    }
    if(progessType == 'stateActProgress'){
      if (event.target.files[0].size >= 20000000) {
        this.errorMessegeStateAct = 'File size should be less than 20Mb.'
        this.propertyForm.controls.stateNotification.reset();
        const error = setTimeout(() => {
          this.showStateAct = false
          this.errorMessegeStateAct = ''
        }, 4000);
        return;
      }
    }
    if(progessType == 'rulesByLawsProgress'){
      if (event.target.files[0].size >= 20000000) {
        this.errorMessegeOther = 'File size should be less than 20Mb.'
        this.propertyForm.controls.comManual.reset();
        const error = setTimeout(() => {
          this.showRulesLaws = false
          this.errorMessegeOther = ''
        }, 4000);
        return;
      }
    }
      const fileName = event.target.files[0].name;
      if(progessType == 'rulesByLawsProgress'){
        this.rulesLawsFileName = event.target.files[0].name;
        this.showRulesLaws = true;
      }
      if (progessType == 'minimumFloorProgress') {
        this.minimumFloorFileName = event.target.files[0].name;
        this.showMinimumFloor = true;
      }
      if (progessType == 'stateActProgress') {
        this.stateActFileName = event.target.files[0].name;
        this.showStateAct = true;
      }
      const filesSelected = <Array<File>>event.target["files"];
      this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
      this.upload(progessType, fileName);
    
  }
  clearFile(type: string = '') {
    if(type =='minimumFloor') {
      this.showMinimumFloor = false;
      this.minimumFloorFileName = ''
    } else if (type =='rulesByLaws'){
      this.showRulesLaws = false;
      this.rulesLawsFileName = ''
    }else{
      this.showStateAct = false;
      this.stateActFileName = ''
    }
    sessionStorage.setItem("changeInPFMS", "true");
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
          if(progessType == 'rulesByLawsProgress'){
            this[progessType] = Math.floor(Math.random() * 90) + 10;
          }
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
            if (progressType == 'minimumFloorProgress') {
              this.minimumFloorUrl = fileAlias;
              this.propertyForm.get('floorRate').patchValue({
                url: fileAlias,
                name: file.name
              })
              sessionStorage.setItem("changeInPFMS", "true");
              console.log(file)
              console.log(s3URL)
            }
            if (progressType == 'stateActProgress') {
              this.stateActUrl = fileAlias;
              console.log(this.stateActUrl)
              this.propertyForm.get('stateNotification').patchValue({
                url: fileAlias,
                name: file.name
              })
              sessionStorage.setItem("changeInPFMS", "true");
              console.log(file)
              console.log(s3URL)
            }
            if (progressType == 'rulesByLawsProgress') {
              this.rulesLawsUrl = fileAlias;
              this.propertyForm.get('comManual').patchValue({
                url: fileAlias,
                name: file.name
              })
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
          
            changeInForm = sessionStorage.getItem("changeInPFMS");
          
          // const changeInAnnual = sessionStorage.getItem("changeInAnnualAcc");
          if (event.url === "/" || event.url === "/login") {
           
              sessionStorage.setItem("changeInPFMS", "false");
            
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
    
      sessionStorage.setItem("changeInPFMS", "false");
    
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
