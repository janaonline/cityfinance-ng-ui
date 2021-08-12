import { Component, Input, OnInit, ViewChild, OnChanges } from "@angular/core";
import { EventEmitter, Output } from "@angular/core";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { HttpEventType, JsonpClientBackend } from "@angular/common/http";
import { UserUtility } from "src/app/util/user/user";
import { USER_TYPE } from "src/app/models/user/userType";
import { SweetAlert } from "sweetalert/typings/core";
import { UlbformService } from "src/app/pages/ulbform/ulbform.service";
const swal: SweetAlert = require("sweetalert");


@Component({
  selector: "app-comm-file-upload",
  templateUrl: "./comm-file-upload.component.html",
  styleUrls: ["./comm-file-upload.component.scss"],
})
export class CommFileUploadComponent implements OnInit, OnChanges {
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  loggedInUserType;
  takeStateAction;
  compDis;
  lastRoleInMasterForm;
  masterFormStatus;
  mohuaCompDis;
  constructor(
    private dataEntryService: DataEntryService,
    private _ulbformService: UlbformService) {
    this.loggedInUserType = this.loggedInUserDetails.role;
    this.finalSubmitStatus = localStorage.getItem("finalSubmitStatus");
    this.takeStateAction = localStorage.getItem("takeStateAction");
    this.compDis = localStorage.getItem("stateActionComDis");
    this.mohuaCompDis = localStorage.getItem("mohuaActionComDis");

    this.lastRoleInMasterForm = localStorage.getItem("lastRoleInMasterForm");
    this.masterFormStatus = localStorage.getItem("masterFormStatus");
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
  stateAction = "";
  rejectReason = null;
  actionData;
  btnStyleA = false;
  btnStyleR = false;
  finalSubmitStatus;
  ulbDisabled = false;
  actionCompDis = false;
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
    rejectReason: this.rejectReason,
  };

  ngOnInit(): void {
    console.log("an res status", this.statusResponse, this.dataFromParent);
    if (this.finalSubmitStatus == "true") {
      this.isDisabled = true;
    }
    if (this.compDis == "true") {
      this.actionCompDis = true;
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
    console.log("isdddddd", this.isDisabled);
    if (this.stateAction == "APPROVED") {
      this.btnStyleA = true;
    } else if (this.stateAction == "REJECTED") {
      this.btnStyleR = true;
    }
    if (
      this.masterFormStatus == "REJECTED" &&
      this.loggedInUserType == USER_TYPE.ULB &&
      this.finalSubmitStatus == "true" &&
      this.lastRoleInMasterForm != USER_TYPE.ULB &&
      this.dataFromParent.status == "REJECTED"
    ) {
      this.isDisabled = false;
    }
    if (this.loggedInUserType === USER_TYPE.ULB) {
      this.ulbDisabled = true;
    }
    this._ulbformService.disableAllFormsAfterStateReview.subscribe(
      (disable) => {
        console.log("utilization speaking", disable);
        this.compDis = 'true';
        this.actionCompDis = true;
        if (disable) {
          localStorage.setItem("stateActionComDis", 'true');
        }
      }
    );
  }

  ngOnChanges() {
    if (this.dataFromParent) {
      this.data = this.dataFromParent;
    }
  }
  async fileChangeEvent(event, fileType) {
    console.log(fileType)
    let files;
    if (typeof event != "boolean") files = event.target.files[0];
    else files = this.data[fileType].file;
    let fileExtension = files.name.split('.').pop();
    console.log(fileExtension)
    if (fileType == 'excel') {
      if (fileExtension == 'xls' || fileExtension == 'xlsx') {
        this.uploadFile(files, files.name, files.type, fileType);
      } else {
        return swal("Only Excel File can be Uploaded.")
      }
    } else if (fileType == 'pdf') {
      if (fileExtension == 'pdf') {
        this.uploadFile(files, files.name, files.type, fileType);
      }
    } else {
      return swal("Only PDF File can be Uploaded.")
    }

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
    if (this.isDisabled) {
      return;
    }
    for (const key in this.data[fileType]) {
      this.data[fileType][key] = null;
    }
    this.getFileUploadResult.emit(this.data);
  }
  checkStatusAp() {
    this.rejectReason = null;
    this.btnStyleA = true;
    this.btnStyleR = false;
    this.actionData = {
      status: this.stateAction,
      rejectReason: this.rejectReason,
    };
    console.log("stateAction", this.stateAction, this.actionData);
    this.actionValues.emit(this.actionData);
  }
  checkStatus() {
    this.btnStyleA = false;
    this.btnStyleR = true;
    this.actionData = {
      status: this.stateAction,
      rejectReason: this.rejectReason,
    };
    console.log("stateAction", this.stateAction, this.actionData);
    this.actionValues.emit(this.actionData);
  }
}
