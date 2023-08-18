
import { HttpEventType } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private dataEntryService: DataEntryService,
    private _snackBar: MatSnackBar
  ) {
    // this.initializeForm();
    // this.formValueChange();
    this.getStatusId();
  }

  Years = JSON.parse(localStorage.getItem("Years"));
  userData = JSON.parse(localStorage.getItem("userData"));
  //action payload..............
  @Input() canTakeAction:boolean = false;
  @Input() actionData : any;
  @Input() viewMode: boolean = false;
  @Input() uploadFolderName:string = '';
  @Input() errorInAction = false;
  @Input() isActionSubmitted = false;
  @Input() actBtnDis:boolean = false;
  @Output() formChangeEventEmit = new EventEmitter<string>();
  @Input() shortKey:string = '';
  responceFile = {
    name: '',
    url: ''
  };
  statusIdForApprove:number = 4;
  statusIdForReject:number = 5;
  @Input() question;
  actionForm;
  ngOnInit(): void {
     console.log('action data', this.actionData);
 // this.setStatusData(this.actionData);
 this.actionForm = {
  shortKey: this.shortKey,
  status: "",
  rejectReason: "",
  errorInAction : false,
  type: '',
  responseFile: {
    url: "",
    name: "",
  },
}
  }

 
  formValueChange(value, type, question) {
    console.log("value has changed:", value, type);
    this.actionForm[type] = value;
    this.actionForm.type = type;
    if (question.status == 4 || question.status == 6) {
        question.errorInAction = false;
    } else if (question.status == 5 || question.status == 7) {
      if(!question?.rejectReasonTemp) question.errorInAction = true;
      if(question?.rejectReasonTemp) question.errorInAction = false;
     }
     console.log("value has changed: 92123", this.actionForm);
      this.formChangeEventEmit.emit(this.actionForm);
      
  }
 
  uploadFile(event: { target: HTMLInputElement }, fileType: string,  reset: boolean = false) {
    const maxFileSize = 5;
    const excelFileExtensions = ['xls', 'xlsx'];
    const file: File = event.target.files[0];
    if (!file) return;
    let isfileValid =  this.dataEntryService.checkSpcialCharInFileName(event.target.files);
    if(isfileValid == false){
      swal("Error","File name has special characters ~`!#$%^&*+=[]\\\';,/{}|\":<>?@ \nThese are not allowed in file name,please edit file name then upload.\n", 'error');
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
    //    this.formControl.responseFile.patchValue({ name: file.name, url: file_url });
        this.responceFile = { name: file.name, url: file_url };
        this._snackBar.dismiss();
     //   console.log('form', this.formControl?.responseFile?.value?.name);
        
      });
    }, 
    (err) => {
        console.log(err);
        this._snackBar.open("Unable to save the file..",'', {"duration": 2000});
        this._snackBar.dismiss();
    });
  }
  removeUploadedFile(){
  //  this.formControl.responseFile.patchValue({ name: '', url: '' });
  //  this.responceFile = { name: '', url: ''};
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

}
