import { HttpEventType } from "@angular/common/http";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { SweetAlert } from "sweetalert/typings/core";
import { CommonServicesService } from "../../service/common-services.service";
import { queryParam } from "../../common-interface";
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: "app-form-common-action",
  templateUrl: "./form-common-action.component.html",
  styleUrls: ["./form-common-action.component.scss"],
})
export class FormCommonActionComponent implements OnInit, OnChanges {
  constructor(
    private formBuilder: FormBuilder,
    private dataEntryService: DataEntryService,
    private _snackBar: MatSnackBar,
    private commonServices: CommonServicesService
  ) {
    this.initializeForm();
    this.formValueChange();
    this.getStatusId();
    this.ulbId = this.userData?.ulb;
    if (!this.ulbId) {
      this.ulbId = localStorage.getItem("ulb_id");
    }
  }
 

  Years = JSON.parse(localStorage.getItem("Years"));
  userData = JSON.parse(localStorage.getItem("userData"));
  
  statusForm: FormGroup;
  @Input() canTakeAction:boolean = false;
  @Input() uploadFolderName:string = '';
  @Output() formChangeEventEmit = new EventEmitter<boolean>();
  @Input() isButtonAvail:boolean= false;
  @Input() nextPreUrl;
  @Input() formId;
  @Input() isFormFinalSubmit = false;
  viewMode:boolean = false;
  actionData: any;
  isActionSubmitted: boolean = false;
  actBtnDis : boolean = false;
  errorInAction:boolean = false;
  responceFile = {
    name: '',
    url: ''
  };
  statusIdForApprove:number = null;
  statusIdForReject:number = null;
  activeClassApprove:boolean = false;
  activeClassReturn:boolean = false;
  formValue:any;
  state_action = {
  }
  mohua_action = {
  }
  finalStatus:string =  '';
  ulbId:string = '';
  getQuery: queryParam = {
    design_year: '',
    formId: null,
    ulb: null
  };
  actionPayload = {}
  ngOnInit(): void {
  console.log('action data', this.actionData);
  if(this.actionData) this.setStatusData(this.actionData);
  console.log('form id.....', this.formId, this.nextPreUrl);
  this.getQuery = {
    design_year: this.Years["2023-24"],
    formId: this.formId,
    ulb: this.ulbId
  };
  this.getActionRes();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.isFormFinalSubmit) this.getActionRes()
  // if(this.actionData) this.setStatusData(this.actionData);
  }
  initializeForm() {
    this.statusForm = this.formBuilder.group({
     shortKey: "form_level",
      status: "",
      rejectReason: "",
      responseFile: this.formBuilder.group({
        url: [""],
        name: [""],
      }),
    });
  }
  formValueChange() {
    this.statusForm.valueChanges.subscribe((value) => {
      console.log("value has changed:", value);
      this.formValue = value;
      console.log(this.formValue);
      if (value.status == 4 || value.status == 6) {
        this.activeClassApprove = true;
        this.activeClassReturn = false;
        this.errorInAction = false;
      } else if (value.status == 5 || value.status == 7) {
        this.activeClassReturn = true;
        this.activeClassApprove = false;
        this.errorInAction =  !value?.rejectReason ? true : false
      }
    });
  }
  get formControl() {
    return this.statusForm.controls;
  }
  uploadFile(event: { target: HTMLInputElement }, fileType: string,  reset: boolean = false) {
    const maxFileSize = 5;
    const excelFileExtensions = ['xls', 'xlsx'];
    const file: File = event.target.files[0];
    if (!file) return;
    let isfileValid =  this.dataEntryService.checkSpcialCharInFileName(event.target.files);
    if(isfileValid == false){
      swal("Error","File name has special characters ~`!#$%^&*+=[]\\\';,/{}|\":<>? \nThese are not allowed in file name,please edit file name then upload.\n", 'error');
       return;
    }
    const fileExtension = file.name.split('.').pop();
    if ((file.size / 1024 / 1024) > maxFileSize) return swal("File Limit Error", `Maximum ${maxFileSize} mb file can be allowed.`, "error");
    if (fileType === 'excel' && !excelFileExtensions.includes(fileExtension)) return swal("Error", "Only Excel File can be Uploaded.", "error");
    if (fileType === 'pdf' && fileExtension !== 'pdf') return swal("Error", "Only PDF File can be Uploaded.", "error");
    this._snackBar.open("Uploaing File...",'', {"duration": 10000});
    this.dataEntryService.newGetURLForFileUpload(file.name, file.type, this.uploadFolderName).subscribe(s3Response => {
      const { url, file_url } = s3Response.data[0];
      console.log('url..', url)
      console.log('asdfgg', s3Response)
      this.dataEntryService.newUploadFileToS3(file, url).subscribe((res) => {
        if (res.type !== HttpEventType.Response) return;
        this.formControl.responseFile.patchValue({ name: file.name, url: file_url });
        this.responceFile = { name: file.name, url: file_url };
        this._snackBar.dismiss();
        console.log('form', this.formControl?.responseFile?.value?.name);
        
      });
    }, 
    (err) => {
        console.log(err);
        this._snackBar.open("Unable to save the file..",'', {"duration": 2000});
        this._snackBar.dismiss();
    });
  }
  removeUploadedFile(){
    this.formControl.responseFile.patchValue({ name: '', url: '' });
    this.responceFile = { name: '', url: ''};
  }

  getStatusId(){
     if(this.userData?.role == 'STATE'){
       this.statusIdForApprove = 4;
       this.statusIdForReject = 5;
     }else if(this.userData?.role == 'MoHUA'){
       this.statusIdForApprove = 6;
       this.statusIdForReject = 7;
     }
  }
  
  setStatusData(data){
    this.finalStatus = '';
    let ulbRes = data.find(el => el.actionTakenByRole === "ULB");
    if(ulbRes && ulbRes?.statusId == 3) this.finalStatus = ulbRes?.status ? ulbRes?.status : '';
    let stateRes = data.find(el => el.actionTakenByRole === "STATE");
    if(stateRes) this.finalStatus = stateRes?.status ? stateRes?.status : '';
    this.state_action = {
      status: stateRes?.status,
      rejectReason:stateRes?.rejectReason,
      responceFile: {
        name: stateRes?.responseFile?.name,
        url: stateRes?.responseFile?.url
      }
    }
    let mohuaRes = data.find(el => el.actionTakenByRole === "MoHUA");
    if(mohuaRes) this.finalStatus = mohuaRes?.status ? mohuaRes?.status : (stateRes?.status ? stateRes?.status : '');
    this.mohua_action = {
      status: mohuaRes?.status,
      rejectReason:mohuaRes?.rejectReason,
      responceFile: {
        name: mohuaRes?.responseFile?.name,
        url: mohuaRes?.responseFile?.url
      }
    }
  }

  saveAction(){
    console.log('...this.statusForm.value', this.statusForm.value);
    this.isActionSubmitted = true;
    this.actionPayload = {
      "form_level": 1,
      "design_year" : this.Years["2023-24"],
      "formId": this.formId,
      "ulbs": [
          this.ulbId
      ],
      "responses": [
       this.statusForm.value
    //       {
    //       "shortKey": "form_level",
    //       "status": 4,
    //       "rejectReason": 'ABCD',
    //       "responseFile": {
    //           "url":"a",
    //           "name": "google.in"
    //       }
    //  }
      ],
      "multi": true,
      "shortKeys": [
          "form_level"
      ]
    }
    if(!this.statusForm.value?.status){
      swal('Error', "Status is mandatory", "error");
      return
    }
    if(this.errorInAction){
      swal('Error', "Reject reason is mandatory", "error");
      return
    }
    
    this.commonServices.formPostMethod(this.actionPayload, 'common-action/masterAction').subscribe((res:any)=>{
      console.log('ressssss action', res);
      this.actBtnDis = true;
      this.isActionSubmitted = false;
      this.formChangeEventEmit.emit(true);
      this.getActionRes();
      swal('Saved', "Action submitted successfully", "success");
    },
    (error)=>{
      console.log('ressssss action', error);
      this.formChangeEventEmit.emit(false);
      this.isActionSubmitted = false;
    }
    )
  }
  // nextPreBtn(e){

  // }

  getActionRes(){
    this.commonServices.formPostMethod(this.getQuery, 'common-action/getMasterAction').subscribe((res:any)=>{
      console.log('action get res', res);
      this.setStatusData(res?.data);
      this.actionData = res?.data;
      if(!this.actionData && !this.actionData.length ){
        this.viewMode = false;
      }else if( this.actionData[0]?.statusId == 1 || this.actionData[0]?.statusId == 2 || this.actionData[0]?.statusId == false){
        this.viewMode = false;
      }else{
        this.viewMode = true;
      }
  
    },
    (err)=>{
      console.log('err action get');

    })
  }
}
