import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { EventEmitter, Output } from "@angular/core";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { HttpEventType, JsonpClientBackend } from "@angular/common/http";
import { UserUtility } from 'src/app/util/user/user';
import { USER_TYPE } from 'src/app/models/user/userType';
@Component({
  selector: "app-comm-file-upload",
  templateUrl: "./comm-file-upload.component.html",
  styleUrls: ["./comm-file-upload.component.scss"],
})
export class CommFileUploadComponent implements OnInit {

  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  loggedInUserType;
  constructor(private dataEntryService: DataEntryService,
    ) {
      this.loggedInUserType =  this.loggedInUserDetails.role;
      this.finalSubmitUtiStatus = localStorage.getItem('finalSubmitStatus');

    }



  @Input()
  quesName;
  @Input()
  isDisabled;
  @Input()
  dataFromParent;
  @Output()
  getFileUploadResult = new EventEmitter();
  @Input()
  requiredBtn;

  @Input()
  FromLinkinPfms;
  @Output()
  actionValues = new EventEmitter();

  @Input() statusResponse;

//  @Input() statusResponseUnA;

  showPdf = true;
  showExcel = true;
  actionRes;
  stateAction= '';
  rejectReason = null;
  actionData;
  btnStyleA = false;
  btnStyleR = false;
  finalSubmitUtiStatus;
  ulbDisabled = false;
  data = {
    pdf: {
      file: null,
      url: null,
      name: null,
      error: null,
      progress: null,

    },
    excel: { file: null, url: null, name: null, error: null, progress: null },
    status: this.stateAction,
    rejectReason: this.rejectReason
  };

  ngOnInit(): void {
   console.log('an res status', this.statusResponse, this.dataFromParent);
    if(this.finalSubmitUtiStatus == 'true') {
      this.isDisabled = true;
    }
    if (this.requiredBtn) {
      switch (this.requiredBtn) {
        case "pdf":
          this.showExcel = false;
          break;
        case "excel":
          this.showPdf = false;
          break;
      }
    }
    if (this.dataFromParent) {
      this.data = this.dataFromParent;
      this.stateAction = this.data?.status;
      this.rejectReason = this.data?.rejectReason;
    }
    console.log('isdddddd', this.isDisabled)
    if(this.stateAction == 'APPROVED'){
      this.btnStyleA = true
    }else if(this.stateAction == 'REJECTED'){
      this.btnStyleR = true

    }
    if(this.stateAction == 'REJECTED' &&  (this.loggedInUserType === USER_TYPE.ULB)){
      this.isDisabled = false;
    }
    if( this.loggedInUserType === USER_TYPE.ULB){
      this.ulbDisabled = true;
    }
  }

  async fileChangeEvent(event, fileType) {
    let files;
    if (typeof event != "boolean") files = event.target.files[0];
    else files = this.data[fileType].file;
    this.uploadFile(files, files.name, files.type, fileType);
  }

  uploadFile(file, name, type, fileType) {
    this.data[fileType].progress = 20;
    this.dataEntryService.getURLForFileUpload(name, type).subscribe(
      (s3Response) => {
        this.data[fileType].progress = 50;
        const res = s3Response.data[0];
        this.data[fileType].name = name;
        this.uploadFileToS3(
          file,
          res["url"],
          res["file_alias"],
          name,
          fileType
        );
      },
      (err) => {
        console.log(err);
        this.data[fileType].file = file;
        this.data[fileType].error = true;
      }
    );
  }

  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    name,
    fileType
  ) {
    this.data[fileType].progress = 60;
    this.dataEntryService.uploadFileToS3(file, s3URL).subscribe(
      (res) => {
        this.data[fileType].progress = 70;
        if (res.type === HttpEventType.Response) {
          this.data[fileType].progress = 100;
          this.data[fileType].file = file;
          this.data[fileType].url = fileAlias;

          this.getFileUploadResult.emit(this.data);
        }
      },
      (err) => {
        this.data[fileType].file = file;
        this.data[fileType].error = true;
      }
    );
  }

  clearFile(fileType) {
    for (const key in this.data[fileType]) {
      this.data[fileType][key] = null;
    }
    this.getFileUploadResult.emit(this.data);
  }
  checkStatusAp(){
    this.rejectReason = null;
    this.actionData = {
      status: this.stateAction,
      rejectReason: this.rejectReason
    }
    console.log('stateAction', this.stateAction, this.actionData)
   this.actionValues.emit(this.actionData);
  }
  checkStatus(){
    this.actionData = {
      status: this.stateAction,
      rejectReason: this.rejectReason
    }
    console.log('stateAction', this.stateAction, this.actionData)
    this.actionValues.emit(this.actionData);
  }

}
