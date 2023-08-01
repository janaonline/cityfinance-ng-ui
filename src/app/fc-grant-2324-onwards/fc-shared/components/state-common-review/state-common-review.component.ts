import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { SweetAlert } from "sweetalert/typings/core";

const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-state-common-review',
  templateUrl: './state-common-review.component.html',
  styleUrls: ['./state-common-review.component.scss']
})
export class StateCommonReviewComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private dataEntryService: DataEntryService,
  ) { }
  
  @Input() canTakeAction:boolean = false;
  @Input() formName:string = '';
  @Input() errorInAction = false;
  @Input() isActionSubmitted = false;
  @Input() actBtnDis:boolean = false;
  @Input() formData;
  @Output() formChangeEventEmit = new EventEmitter();
  @Input() question;
  @Input() actionPayload;
  uploadFolderName:string = '';
  statusIdForApprove:string = '6';
  statusIdForReject:string = '7';
  Years = JSON.parse(localStorage.getItem("Years"));
  userData = JSON.parse(localStorage.getItem("userData"));
  outputDataForPayload:object;
  // actionPayload = {
  //   "form_level": 3,
  //   "design_year": this.Years["2023-24"],
  //   "formId": 12,
  //   "state": [
  //     "5dcf9d7316a06aed41c748e8"
  //   ],
  //   "responses": [
  //     {
  //       "shortKey": "UA_44_HR021",
  //       "status": 6,
  //       "rejectReason": "q",
  //       "responseFile": {
  //         "url": "aditya",
  //         "name": "1123456"
  //       }
  //     },
  //     {
  //       "shortKey": "UA_223_ML002",
  //       "status": 6,
  //       "rejectReason": "q1",
  //       "responseFile": {
  //         "url": "1",
  //         "name": "1"
  //       }
  //     }
  //   ],
  //   "multi": false,
  //   "shortKeys": [
  //     "UA_44_HR021",
  //     "UA_223_ML002"
  //   ]
  // }

  ngOnInit(): void {
    console.log('formdata', this.formData);

    console.log('formdata actionPayload', this.actionPayload);
    let code = this.userData?.stateCode;
    if (!code) {
     code = sessionStorage.getItem('stateCode');
     }
    this.uploadFolderName = `${this.userData?.role}/2023-24/supporting_douments/${this.formName}/${code}`;
  }

  formValueChange(event, type, question){
    console.log('review', event, type, question);
      const uaIndex = this.getUAIndex(question);
      this.actionPayload.responses[uaIndex][type] = event;
      this.outputDataForPayload = {
        formData: this.formData,
        actionData: this.actionPayload,
        item : question
      }
      this.formChangeEventEmit.emit(this.outputDataForPayload);
    
  }


  uploadFile(event: { target: HTMLInputElement }, fileType: string, question) {
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
        const uaIndex = this.getUAIndex(question);
        this.actionPayload.responses[uaIndex]["responseFile"] = { name: file.name, url: file_url };
        question["responseFile"] = { name: file.name, url: file_url };
        this._snackBar.dismiss();
        console.log(this.actionPayload, 'this.actionPayload');
        this.formChangeEventEmit.emit(this.outputDataForPayload); 
      });
    }, 
    (err) => {
        console.log(err);
        this._snackBar.open("Unable to save the file..",'', {"duration": 2000});
        this._snackBar.dismiss();
    });
  }
  removeUploadedFile(question){
    const uaIndex = this.getUAIndex(question);
    this.actionPayload.responses[uaIndex]["responseFile"] = { name: "", url: "" };
    question["responseFile"] = { name: "", url: "" };
  }
  getUAIndex(question){
    if(this.formName != 'grant_allocation') {
      return this.actionPayload.responses.findIndex(({ shortKey }) => shortKey === question?.uaCode);
    }else {
      return 0;
    }
    
  }
}
