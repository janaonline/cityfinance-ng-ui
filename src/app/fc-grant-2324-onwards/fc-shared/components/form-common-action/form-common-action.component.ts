import { HttpEventType } from "@angular/common/http";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { SweetAlert } from "sweetalert/typings/core";
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
    private _snackBar: MatSnackBar
  ) {
    this.initializeForm();
    this.formValueChange();
    this.getStatusId();
  }
 

  Years = JSON.parse(localStorage.getItem("Years"));
  userData = JSON.parse(localStorage.getItem("userData"));
  //action payload..............
  actionPostBody = {
    form_level: 2,
    design_year: "606aafc14dff55e6c075d3ec",
    formId: 4,
    ulbs: ["5dcfca53df6f59198c4ac3d5"],
    responses: [
      {
        shortKey: "form_level",
        status: 3,
        rejectReason: "qwdftyui",
        responseFile: {
          url: "dbjkf",
          name: "1123456",
        },
      },
    ],
    multi: false,
    shortKeys: ["form_level"],
  };
  statusForm: FormGroup;
  @Input() canTakeAction:boolean = false;
  @Input() actionData : any;
  @Input() viewMode: boolean = false;
  @Input() uploadFolderName:string = '';
  @Input() errorInAction = false;
  @Input() isActionSubmitted = false;
  @Input() actBtnDis:boolean = false;
  @Output() formChangeEventEmit = new EventEmitter<string>();
  
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
  ngOnInit(): void {
  console.log('action data', this.actionData);
  this.setStatusData(this.actionData);
  }
  ngOnChanges(changes: SimpleChanges): void {
   if(this.actionData) this.setStatusData(this.actionData);
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
        if(value?.rejectReason) this.errorInAction = false;
      } else if (value.status == 5 || value.status == 7) {
        this.activeClassReturn = true;
        this.activeClassApprove = false;
        if(!value?.rejectReason) this.errorInAction = true;
      }
    //   this.toggle = value;
    //   console.log(this.toggle);
      this.formChangeEventEmit.emit(this.statusForm.value);
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
}
