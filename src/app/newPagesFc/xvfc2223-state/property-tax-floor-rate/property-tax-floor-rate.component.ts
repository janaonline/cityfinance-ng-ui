import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';
const swal: SweetAlert = require("sweetalert");
import { SweetAlert } from "sweetalert/typings/core";
import { HttpEventType, HttpParams } from '@angular/common/http';
import { MatDialog,MatDialogConfig } from "@angular/material/dialog";
import { NavigationStart, Router } from '@angular/router';
import { PropertyTaxFloorRatePreviewComponent } from './property-tax-floor-rate-preview/property-tax-floor-rate-preview.component';
@Component({
  selector: 'app-property-tax-floor-rate',
  templateUrl: './property-tax-floor-rate.component.html',
  styleUrls: ['./property-tax-floor-rate.component.scss']
})
export class PropertyTaxFloorRateComponent implements OnInit {
  propertyForm: FormGroup;
  change = '';
  errorMessege: any = '';
  @ViewChild("ipt") ipt: any;
  @ViewChild("ipt2") ipt2: any;
  @ViewChild("ipt3") ipt3: any;
  @ViewChild("ipt4") ipt4: any;
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
  extantActDocFileName;
  showextantActDocFile;
  extantActDocFileUrl;
  extantActDocError;
  // isDisabled:boolean =false
  previewFormData:any;
  isApiInProgress = true;
  @ViewChild("templateSave") template;
  fileUploadTracker: {
    [fileIndex: number]: {
      alias?: string;
      percentage?: number;
      status: "in-process" | "FAILED" | "completed";
    };
  } = {};
  sideMenuItem;
  userData;
  design_year;
  stateId;
  yearValue;
  minimumUrl;
  ruleUrl;
  constructor(public _router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private ptService: NewCommonService,
    private dataEntryService: DataEntryService
  ) {
    this.design_year = JSON.parse(localStorage.getItem("Years"));
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftStateMenuRes"));
    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
    }
    this.yearValue = this.design_year["2022-23"];
    this.navigationCheck();
    this.initializeForm();
    this.setRouter();
  }

  ngOnInit(): void {
    this.clickedSave = false;
    sessionStorage.setItem("changeInPropertyTax", "false");
    this.onload();
  }

  // convenience getter for easy access to form fields
  get f() { return this.propertyForm.controls; }
  inputChange(){
    sessionStorage.setItem("changeInPropertyTax", "true");
  }
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
      actMunicipal: ["", Validators.required],
      extantAct: ["", [Validators.required, Validators.maxLength(1000)]],
      extantActDoc: this.formBuilder.group({
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
    this.isApiInProgress = true;
    this.ptService.getPtData(params).subscribe((res:any)=>{
      console.log(res)
      res?.data?.isDraft == false ? this.isDisabled = true : this.isDisabled = false
      this.previewFormData = res;
      this.actionFormData = res?.data;
      this.patchFunction(this.previewFormData);
      this.checkActionDisable(res?.data);
      sessionStorage.setItem("changeInPropertyTax", "false");
      this.isApiInProgress = false;
    },
      (error) => {
        this.isApiInProgress = false;
        if (this.userData?.role !== "STATE") {
          this.isDisabled = true;
        }
      }
    )
  }

  patchFunction(data){
    console.log(data)
    // this.showStateAct = true
    this.stateActFileName = data?.data?.stateNotification?.name;
    this.stateActFileUrl = data?.data?.stateNotification?.url;
    this.stateActFileName ? this.showStateAct = true : false;

    this.minimumFloorFileName = data?.data?.floorRate?.name;
    this.minimumUrl = data?.data?.floorRate?.url;
    this.minimumFloorFileName ? this.showMinimumFloor = true : false;

    this.rulesLawsFileName = data?.data?.comManual?.name;
    this.ruleUrl = data?.data?.floorRate?.url;
    this.rulesLawsFileName ? this.showRulesLaws = true : false;
    this.extantActDocFileName = data?.data?.extantActDoc?.name;
    this.extantActDocFileUrl = data?.data?.extantActDoc?.url;
    this.showextantActDocFile = data?.data?.extantActDoc?.url ? true : false

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
      actMunicipal: data?.data?.actMunicipal,
      extantAct: data?.data?.extantAct,
      extantActDoc: {
        url: data?.data?.extantActDoc?.url,
        name: data?.data?.extantActDoc?.name,
      },
  });

  }
  alertFormFinalSubmit() {
    this.submitted = true;
    this.activeClass = true;
    if (this.propertyForm.invalid) {
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

    this.ptService.submitPtForm(body).subscribe((res :any)=>{
      console.log(res)
      this.clickedSave = false;
      if (res && res.status) {
        this.clickedSave = false;
        this.isDisabled = true
        console.log(res)
        this.getPtoData()
        sessionStorage.setItem("changeInPropertyTax", "false");
        swal("Saved", "Data saved successfully", "success");
        this.ptService.setStateFormStatus2223.next(true);
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
        // sessionStorage.removeItem("changeInPropertyTax");
        console.log(res)
        this.clickedSave = false;
        this.getPtoData()
        sessionStorage.setItem("changeInPropertyTax", "false");
        swal("Saved", "Data saved as draft successfully.", "success");
        this.ptService.setStateFormStatus2223.next(true);
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
    // sessionStorage.setItem("changeInPto", "true")
    // this.change = "true";
  }

  fileChangeEvent(event, progessType) {
    let isfileValid =  this.dataEntryService.checkSpcialCharInFileName(event.target.files);
    if(isfileValid == false){
      swal("Error","File name has special characters ~`!#$%^&*+=[]\\\';,/{}|\":<>? \nThese are not allowed in file name,please edit file name then upload.\n", 'error');
       return;
    }
    console.log(progessType)
    if(progessType == 'minimumFloorProgress'){
      if (event.target.files[0].size >= 20000000) {
        this.ipt2.nativeElement.value = "";
        this.errorMessege = 'File size should be less than 20Mb.'
        // this.propertyForm.controls.floorRate.reset();
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
        this.ipt3.nativeElement.value = "";
        this.errorMessegeOther = 'File size should be less than 20Mb.'
        this.propertyForm.controls.comManual.reset();
        const error = setTimeout(() => {
          this.showRulesLaws = false
          this.errorMessegeOther = ''
        }, 4000);
        return;
      }
    }
    if(progessType == 'extantActDoc'){
      if (event.target.files[0].size >= 15000000) {
        this.ipt4.nativeElement.value = "";
        this.errorMessegeOther = 'File size should be less than 15Mb.'
        this.propertyForm.controls.extantActDoc.reset();
        swal('Error', 'File size should be less than 15Mb.', 'error')
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
      if (progessType == 'extantActDoc') {
        this.extantActDocFileName = event.target.files[0].name;
        this.showextantActDocFile = true;
      }
      const filesSelected = <Array<File>>event.target["files"];
      this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected,progessType));
      this.upload(progessType, fileName);
      sessionStorage.setItem("changeInPto", "true")
      this.change = "true";

  }
  clearFile(type: string = '') {
    if(type =='minimumFloor') {
      this.ipt2.nativeElement.value = "";
      this.showMinimumFloor = false;
      this.minimumFloorFileName = ''
      this.propertyForm.patchValue({
        floorRate:{
          url: '',
          name: ''
       }
      });
    } else if (type =='rulesByLaws'){
      this.ipt3.nativeElement.value = "";
      this.showRulesLaws = false;
      this.rulesLawsFileName = ''
      this.propertyForm.patchValue({
        comManual:{
          url: '',
          name: ''
       }
      });
    } else if (type =='extantActDoc'){
      this.ipt4.nativeElement.value = "";
      this.showextantActDocFile = false;
      this.extantActDocFileName = '';
      this.extantActDocFileUrl = ''
      this.propertyForm.patchValue({
        extantActDoc:{
          url: '',
          name: ''
       }
      });
    }
    else{
      this.showStateAct = false;
      this.ipt.nativeElement.value = "";
      this.stateActFileName = ''
      this.propertyForm.patchValue({
        stateNotification:{
          url: '',
          name: ''
       }
      });
    }
    sessionStorage.setItem("changeInPropertyTax", "true");
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
        if(progessType == 'extantActDoc'){
          this.showextantActDocFile = false
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
      let folderName = `${this.userData?.role}/2022-23/property_tax_notification/${this.userData?.stateCode}`
      this.dataEntryService.newGetURLForFileUpload(file.name, file.type, folderName).subscribe(
        (s3Response) => {
          let fileAlias = s3Response["data"][0]["file_url"];
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
              this.propertyForm.get('floorRate').patchValue({
                url: fileAlias,
                name: file.name
              })
              sessionStorage.setItem("changeInPropertyTax", "true");
              console.log(file)
              console.log(s3URL)
            }
            if (progressType == 'stateActProgress') {
              this.stateActUrl = fileAlias;
              this.stateActFileUrl = this.stateActUrl
              console.log(this.stateActUrl)
              this.propertyForm.get('stateNotification').patchValue({
                url: fileAlias,
                name: file.name
              })
              sessionStorage.setItem("changeInPropertyTax", "true");
              console.log(file)
              console.log(s3URL)
            }
            if (progressType == 'rulesByLawsProgress') {
              this.rulesLawsUrl = fileAlias;
              this.ruleUrl = this.rulesLawsUrl
              this.propertyForm.get('comManual').patchValue({
                url: fileAlias,
                name: file.name
              })
              console.log(file)
              console.log(s3URL)
            }
            if (progressType == 'extantActDoc') {
              this.extantActDocFileUrl = fileAlias;
             // this.ruleUrl = this.rulesLawsUrl
              this.propertyForm.get('extantActDoc').patchValue({
                url: fileAlias,
                name: file.name
              })
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

            changeInForm = sessionStorage.getItem("changeInPropertyTax");

          // const changeInAnnual = sessionStorage.getItem("changeInAnnualAcc");
          if (event.url === "/" || event.url === "/login") {

              sessionStorage.setItem("changeInPropertyTax", "false");

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

      sessionStorage.setItem("changeInPropertyTax", "false");

    await this.dialogRef.close(true);
    if (this.routerNavigate) {
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
  }
  alertClose() {
    this.stay();
  }
  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }


  // action related
  actionRes;
  actionBtnDis = false;
  canTakeAction = false;
  formId = ''
  actionFormData;
  actionError = false;
  actionData(e) {
    this.setRouter();
    console.log("action data..", e);
    this.actionRes = e;
    if (e?.status == "APPROVED" || e?.status == "REJECTED") {
      this.actionError = false;
    }
  }
  saveAction() {
    if(!this.formId){
      this.setRouter();
    }
    let actionBody = {
      formId: this.formId,
      design_year: "606aafb14dff55e6c075d3ae",
      status: this.actionRes?.status,
      state: [this.stateId],
      rejectReason: this.actionRes?.reason,
      responseFile: {
        url: this.actionRes?.document?.url,
        name: this.actionRes?.document?.name,
      },
    };
    if (actionBody?.rejectReason == "" && actionBody?.status == "REJECTED") {
      swal("Alert!", "Return reason is mandatory in case of Returned a file", "error");
      this.actionError = true;
      return;
    } else if (actionBody?.status == "" || actionBody?.status == null || actionBody?.status == undefined) {
      swal("Alert!", "Action is mandatory", "error");
      this.actionError = true;
      return;
    }
    this.actionError = false;
    swal(
      "Confirmation !",
      `Are you sure you want to submit this action? Once submitted,
      it will become uneditable and will be sent to MoHUA for Review.`,
      "warning",
      {
        buttons: {
          Submit: {
            text: "Submit",
            value: "submit",
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
          this.finalActionSave(actionBody);
          break;
        case "cancel":
          break;
      }
    });

  }
  finalActionSave(actionBody) {
    this.ptService.postCommonAction(actionBody).subscribe(
      (res) => {
        console.log("action respon", res);
        this.actionBtnDis = true;
        this.ptService.setStateFormStatus2223.next(true);
        swal("Saved", "Action saved successfully.", "success");

      },
      (error) => {
        swal("Error", `${error?.message}`, "error");
      }
    );
  }
  checkActionDisable(res) {
    if (res?.status === "REJECTED" && this.userData?.role == "STATE") {
      this.isDisabled = false;
    }
    if (this.userData?.role !== "STATE") {
      this.isDisabled = true;
      if (res?.canTakeAction) {
        this.canTakeAction = true;
      } else {
        this.canTakeAction = false;
      }
      // sessionStorage.setItem("canTakeAction", action);
    }
    if (res?.status == null || res?.status == undefined) {
      this.actionBtnDis = true;
    } else if (this.userData?.role !== "STATE" && this.canTakeAction) {
      this.actionBtnDis = false;
    } else {
      this.actionBtnDis = true;
    }
  }
  setRouter() {
    for (const key in this.sideMenuItem) {
      this.sideMenuItem[key].forEach((element) => {
        if (element?.name == "Property tax floor rate Notification") {
          // this.nextRouter = element?.nextUrl;
          // this.backRouter = element?.prevUrl;
          this.formId = element?._id;
        }
      });
    }
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

    if (+newValue > 99 || +newValue < 1) {
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
