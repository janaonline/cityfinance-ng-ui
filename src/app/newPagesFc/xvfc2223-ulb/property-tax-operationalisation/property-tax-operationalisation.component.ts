import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';
const swal: SweetAlert = require("sweetalert");
import { SweetAlert } from "sweetalert/typings/core";
import { HttpEventType, HttpParams } from '@angular/common/http';
import { MatDialog,MatDialogConfig } from "@angular/material/dialog";
import { NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-property-tax-operationalisation',
  templateUrl: './property-tax-operationalisation.component.html',
  styleUrls: ['./property-tax-operationalisation.component.scss']
})
export class PropertyTaxOperationalisationComponent implements OnInit {
  propertyTaxForm: FormGroup;
  change = '';
  errorMessege: any = '';
  @ViewChild("ipt") ipt: any;
  @ViewChild("ipt2") ipt2: any;
  @ViewChild("ipt3") ipt3: any;
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
  activeClass: boolean = false;
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
  userData;
  design_year;
  stateId;
  yearValue;
  minimumUrl;
  ruleUrl;
  ulbData;
  ulbId;
  @ViewChild("templateSave") template;
  fileUploadTracker: {
    [fileIndex: number]: {
      alias?: string;
      percentage?: number;
      status: "in-process" | "FAILED" | "completed";
    };
  } = {};
  constructor(public _router: Router,public dialog: MatDialog,private formBuilder: FormBuilder,private ptService: NewCommonService,private dataEntryService: DataEntryService) {
    this.getUlbDesignYear();
    this.navigationCheck();
    this.initializeForm();  
  }
  
  ngOnInit(): void {
    this.clickedSave = false;
    sessionStorage.setItem("changeInPropertyTaxOp", "false");
    this.onload();
  }

  // convenience getter for easy access to form fields
  get f() { return this.propertyTaxForm.controls; }

  dropdownContent = [
    {value: 'uav', viewValue: 'Unit Area Value(UAV) System', tooltip: "Unit area value (UAV) system : Property's annual value is determined on the basis of base unit area (linked to property's location and guideline value) and factors like structure of the building, property usage, etc."},
    {value: 'arv', viewValue: 'Annual Rental Value(ARV) System', tooltip: "Annual Rental Value (ARV): Property's annual value is determined on the basis of perceived rent"},
    {value: 'cvs', viewValue: 'Capital Value (CV) System', tooltip: "Capital Value System: Property's annual value is calculated as a percentage of its guidance value/capital value/circle rates"},
    {value: 'other', viewValue: 'Other', tooltip: "Please mention in detail the property tax method used"},
    ];
  inputChange(){
    sessionStorage.setItem("changeInPropertyTaxOp", "true");
  }
  initializeForm(){
    this.propertyTaxForm = this.formBuilder.group({
      ulb: this.ulbId,
      design_year: this.yearValue,
      toCollect: ["", Validators.required],
      operationalize: ["", Validators.required],
      method: ["", Validators.required],
      other: ["", Validators.required],
      collection2019_20: ["", Validators.required],
      collection2020_21: ["", Validators.required],
      collection2021_22: ["", Validators.required],
      target2022_23: [""],
      proof: this.formBuilder.group({
        url: [""],
        name: [""],
      }),
      rateCard: this.formBuilder.group({
        url: [''],
        name: [''],
      }),
      ptCollection: this.formBuilder.group({
        url: [''],
        name: [''],
      })
      
    });
  }
  updateFormvalue(type){
    console.log('type of ye no tabs', type)
    if(type == 'collectPropertyNo'){
     this.propertyTaxForm.patchValue({
      operationalize: "",
      method:  "",
      other:  "",
      collection2019_20:  "",
      collection2020_21: "",
      collection2021_22:  "",
      target2022_23:  "",
      proof: {
        url:  "",
        name:  "",
      },
      rateCard: {
        url:  "",
        name:  "",
      },
      ptCollection: {
        url:  "",
        name:  "",
      }
      });
    }else if(type == 'operationalizeYes' || type == 'operationalizeNo'){
      this.propertyTaxForm.patchValue({
       method:  "",
       other:  "",
       collection2019_20:  "",
       collection2020_21: "",
       collection2021_22:  "",
       target2022_23:  "",
       proof: {
         url:  "",
         name:  "",
       },
       rateCard: {
         url:  "",
         name:  "",
       },
       ptCollection: {
         url:  "",
         name:  "",
       }
       });
     }
  }
  getUlbDesignYear(){
    this.design_year = JSON.parse(localStorage.getItem("Years"));
    this.yearValue = this.design_year["2022-23"];
    this.ulbData = JSON.parse(localStorage.getItem("userData"));
    console.log(this.ulbData);
    this.ulbId = this.ulbData.ulb;
    console.log('this.ulbId------->', this.ulbId)
  }
  onload(){
    // this.getPtoData();
  }
  submitForm(){
    console.log('this.propertyTaxForm.value', this.propertyTaxForm.value);
    
  }
  getPtoData(){
    const params = {
      ulb: this.ulbId,
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
    this.stateActFileName = data?.data?.proof?.name;
    this.stateActFileUrl = data?.data?.proof?.url;
    this.stateActFileName ? this.showStateAct = true : false;

    this.minimumFloorFileName = data?.data?.ptCollection?.name;
    this.minimumUrl = data?.data?.ptCollection?.url;
    this.minimumFloorFileName ? this.showMinimumFloor = true : false;

    this.rulesLawsFileName = data?.data?.rateCard?.name;
    this.ruleUrl = data?.data?.ptCollection?.url;
    this.rulesLawsFileName ? this.showRulesLaws = true : false;

    this.propertyTaxForm.patchValue({
      actPage: data?.data?.actPage,
      ulb: data?.data?.ulb,
      design_year: data?.data?.design_year,
      rateCard: {
        url: data?.data?.rateCard?.url,
        name: data?.data?.rateCard?.name,
      },
      ptCollection: {
        url: data?.data?.ptCollection?.url,
        name: data?.data?.ptCollection?.name,
      },
      proof: {
        url: data?.data?.proof?.url,
        name: data?.data?.proof?.name,
      },
        });

  }
  alertFormFinalSubmit() {
    this.submitted = true;
    this.activeClass = true;
    if (this.propertyTaxForm.invalid) {
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
    // console.log(this.propertyTaxForm);
    // let body = {
    //   ...this.propertyTaxForm.value,
    //   isDraft: false,
    //   design_year: this.yearValue,
    //   ulb: this.ulbId,
    // };
    // console.log(body)
    // console.log('submitted',this.propertyTaxForm.value)
    // this.submitted =true;

    // this.ptService.submitPtForm(body).subscribe((res :any)=>{
    //   console.log(res)
    //   this.clickedSave = false;
    //   if (res && res.status) {
    //     this.clickedSave = false;
    //     this.isDisabled = true
    //     console.log(res)
    //     this.getPtoData()
    //     sessionStorage.setItem("changeInPropertyTaxOp", "false");
    //     swal("Saved", "Data saved successfully", "success");
    //   } else {
    //     swal("Error", res?.message ? res?.message : "Error", "error");
    //   }
    // },
    // (error) => {
    //   console.error("err", error);
    //   swal("Error", error ? error : "Error", "error");
    // })
  }

  onDraft(){
    console.log('saved as draft')
    console.log('submitted',this.propertyTaxForm.value)
    this.body = {
      ...this.propertyTaxForm.value,
      isDraft: true,
      design_year: this.yearValue,
      ulb: this.ulbId,
    };
    this.ptService.submitPtForm(this.body).subscribe((res :any)=>{
      console.log(res)
      if (res && res.message) {
        sessionStorage.removeItem("changeInPropertyTaxOp");
        console.log(res)
        this.clickedSave = false;
        this.getPtoData()
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
    console.log('valuessssssssss',this.propertyTaxForm.value)
    let previewData = {
      dataPreview : this.propertyTaxForm.value,
      preData: this.previewFormData
    }
    console.log(previewData)
    // const dialogRef = this.dialog.open(PropertyTaxFloorRatePreviewComponent, {
    //   data: previewData,
    //   width: "85vw",
    //   height: "100%",
    //   maxHeight: "90vh",
    //   panelClass: "no-padding-dialog",
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    // });
  }
  uploadButtonClicked(formName) {
    sessionStorage.setItem("changeInPto", "true")
    this.change = "true";
  }
 
  fileChangeEvent(event, progessType) {
    console.log(progessType)
    if(progessType == 'minimumFloorProgress'){
      if (event.target.files[0].size >= 20000000) {
        this.ipt2.nativeElement.value = "";
        this.errorMessege = 'File size should be less than 20Mb.'
        // this.propertyTaxForm.controls.ptCollection.reset();
        const error = setTimeout(() => {
          this.showMinimumFloor = false
          this.errorMessege = ''
        }, 4000);
        return;
      }
    }
    if(progessType == 'stateActProgress'){
      if (event.target.files[0].size >= 20000000) {
        this.ipt.nativeElement.value = "";
        this.errorMessegeStateAct = 'File size should be less than 20Mb.'
        this.propertyTaxForm.controls.proof.reset();
        const error = setTimeout(() => {
          this.showStateAct = false
          this.errorMessegeStateAct = ''
        }, 4000);
        return;
      }
    }
    if(progessType == 'rulesByLawsProgress'){
      if (event.target.files[0].size >= 20000000) {
        this.ipt3.nativeElement.value = "";
        this.errorMessegeOther = 'File size should be less than 20Mb.'
        this.propertyTaxForm.controls.rateCard.reset();
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
      this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected,progessType));
      this.upload(progessType, fileName);

  }
  clearFile(type: string = '') {
    if(type =='minimumFloor') {
      this.ipt2.nativeElement.value = "";
      this.showMinimumFloor = false;
      this.minimumFloorFileName = ''
      this.propertyTaxForm.patchValue({
        ptCollection:{
          url: '',
          name: ''
       }
      });
    } else if (type =='rulesByLaws'){
      this.ipt3.nativeElement.value = "";
      this.showRulesLaws = false;
      this.rulesLawsFileName = ''
      this.propertyTaxForm.patchValue({
        rateCard:{
          url: '',
          name: ''
       }
      });
    }else{
      this.showStateAct = false;
      this.ipt.nativeElement.value = "";
      this.stateActFileName = ''
      this.propertyTaxForm.patchValue({
        proof:{
          url: '',
          name: ''
       }
      });
    }
    sessionStorage.setItem("changeInPropertyTaxOp", "true");
  }
  filterInvalidFilesForUpload(filesSelected: File[],progessType) {
    const validFiles = [];
    console.log(filesSelected)
    for (let i = 0; i < filesSelected.length; i++) {
      const file = filesSelected[i];
      const fileExtension = file.name.split(`.`).pop();
      if (fileExtension === "pdf") {
        validFiles.push(file);
      } else {
        if(progessType == 'stateActProgress'){
          this.showStateAct = false
        }
        if(progessType == 'minimumFloorProgress'){
          this.showMinimumFloor = false
        }
        if(progessType == 'rulesByLawsProgress'){
          this.showRulesLaws = false
        }
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
              this.minimumUrl = this.minimumFloorUrl 
              this.propertyTaxForm.get('ptCollection').patchValue({
                url: fileAlias,
                name: file.name
              })
              sessionStorage.setItem("changeInPropertyTaxOp", "true");
              console.log(file)
              console.log(s3URL)
            }
            if (progressType == 'stateActProgress') {
              this.stateActUrl = fileAlias;
              this.stateActFileUrl = this.stateActUrl
              console.log(this.stateActUrl)
              this.propertyTaxForm.get('proof').patchValue({
                url: fileAlias,
                name: file.name
              })
              sessionStorage.setItem("changeInPropertyTaxOp", "true");
              console.log(file)
              console.log(s3URL)
            }
            if (progressType == 'rulesByLawsProgress') {
              this.rulesLawsUrl = fileAlias;
              this.ruleUrl = this.rulesLawsUrl 
              this.propertyTaxForm.get('rateCard').patchValue({
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
          
            changeInForm = sessionStorage.getItem("changeInPropertyTaxOp");
          
          // const changeInAnnual = sessionStorage.getItem("changeInAnnualAcc");
          if (event.url === "/" || event.url === "/login") {
           
              sessionStorage.setItem("changeInPropertyTaxOp", "false");
            
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
    
      sessionStorage.setItem("changeInPropertyTaxOp", "false");
    
    await this.dialogRef.close(true);
    if (this.routerNavigate) {
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
  }
  alertClose() {
    this.stay();
  }
  numberLimitV(e, input) {
    // console.log("sss", e, input);
    const functionalKeys = ["Backspace", "ArrowRight", "ArrowLeft", "Tab"];

    if (functionalKeys.indexOf(e.key) !== -1) {
      return;
    }

    const keyValue = +e.key;
    if (isNaN(keyValue)) {
      e.preventDefault();
      return;
    }

    const hasSelection =
      input?.selectionStart !== input?.selectionEnd &&
      input?.selectionStart !== null;
    let newValue;
    if (hasSelection) {
      newValue = this.replaceSelection(input, e.key);
    } else {
      newValue = input?.value + keyValue?.toString();
    }

    if (+newValue > 10000000000 || newValue.length > 10) {
      e.preventDefault();
    }
  }
  private replaceSelection(input, key) {
    const inputValue = input?.value;
    const start = input?.selectionStart;
    const end = input?.selectionEnd || input?.selectionStart;
    return inputValue.substring(0, start) + key + inputValue.substring(end + 1);
  }
}
