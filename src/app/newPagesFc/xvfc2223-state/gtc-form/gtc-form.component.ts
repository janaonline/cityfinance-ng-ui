import { HttpEventType } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NavigationStart, Router } from "@angular/router";
//import { post } from "jquery";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";

import { State2223Service } from "../state-services/state2223.service";
import { GtcPreviewComponent } from "./gtc-preview/gtc-preview.component";
import { SweetAlert } from "sweetalert/typings/core";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: "app-gtc-form",
  templateUrl: "./gtc-form.component.html",
  styleUrls: ["./gtc-form.component.scss"],
})
export class GtcFormComponent implements OnInit {
  years;
  stateId;
  userData;
  clickedSave;
  routerNavigate = null;
  response;
  alertError =
    "You have some unsaved changes on this page. Do you wish to save your data as draft?";
  dialogRef;
  modalRef;
  @ViewChild("templateSave") template;
  constructor(
    private dataEntryService: DataEntryService,
    private stateService: State2223Service,
    private dialog: MatDialog,
    private _router: Router,
    private newCommonService: NewCommonService
  ) {
    this.years = JSON.parse(localStorage.getItem("Years"));
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftStateMenuRes"));
    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
    }
    this.navigationCheck();
  }
  sideMenuItem;
  gtcFormData;
  ngOnInit(): void {
    this.intializeGtc();
    this.getGtcData();
    this.setRouter();
    sessionStorage.setItem("changeInGtc", "false");
    if(!this.formId && this.userData?.role == 'MoHUA'){
      location.reload();
    }
  }
  getGtcData() {
    this.stateService.getGtcData(this.stateId).subscribe(
      (res: any) => {
        console.log("res", res);
        for (let i = 0; i < this.gtcFormData.length; i++) {
          let tabArray = this.gtcFormData[i]?.quesArray;
          let obj;
          this.gtcFormData[i]?.quesArray.forEach((el) => {
            obj = res?.data.find(({ key }) => {
              //  console.log(key, el);
              return key == el?.key;
            });
            if (obj && obj?.file?.name != "") {
              el["file"]["name"] = obj?.file?.name;
              el["file"]["url"] = obj?.file?.url;
              console.log("form", this.gtcFormData);
              el["isDraft"] = false;
              el["status"] = obj?.status;
              el["rejectReason_mohua"] = obj?.rejectReason_mohua;
              el['responseFile_mohua']['name'] = obj?.responseFile_mohua?.name;
              el['responseFile_mohua']['url'] = obj?.responseFile_mohua?.url;
            } else {
              el["isDraft"] = true;
              el["status"] = "PENDING";
              el["rejectReason_mohua"] = null;
            }
          });
        }
        this.disableInputs();
        this.checkAction();
      },
      (error) => {
        swal('Error', "Something went wrong, please try after some time.")
        for (let i = 0; i < this.gtcFormData.length; i++) {
        this.gtcFormData[i]?.quesArray.forEach((el) => {
           el.isDisableQues = true;
        });
      }
        console.log("err", error);
      }
    );
  }
  // intializeGtc() {
  //   this.gtcFormData = [
  //     {
  //       label: "1. View/Upload GTCs for Non-Million Plus Cities Tied Grants",
  //       isDisabled: false,
  //       error: false,
  //       icon: "",
  //       quesArray: [
  //         {
  //           installment: 2,
  //           year: this.years["2021-22"],
  //           type: "nonmillion_tied",
  //           instlText: "2nd Installment (2021-22)",
  //           quesText: "Upload Signed Grant Transfer Certificate",
  //           isDisableQues: false,
  //           disableMsg: "",
  //           key: "nonmillion_tied_2021-22_2",
  //           question:
  //             "(A) Upload Signed Grant Transfer Certificate - 2nd Installment (2021-22)",
  //           qusType: "",
  //           file: {
  //             name: "",
  //             url: "",
  //             progress: null,
  //             error: null,
  //           },
  //           isDraft: null,
  //           status: null,
  //           rejectReason_mohua: null,
  //         },
  //         {
  //           installment: 1,
  //           year: this.years["2022-23"],
  //           type: "nonmillion_tied",
  //           instlText: "1st Installment (2022-23)",
  //           quesText: "Upload Signed Grant Transfer Certificate",
  //           isDisableQues: true,
  //           disableMsg: `1st Installment (2022-23) GTC has to be uploaded first before uploading 2nd Installment (2021-22) GTC`,
  //           question:
  //             "(B) Upload Signed Grant Transfer Certificate - 1st Installment (2022-23)",
  //           key: "nonmillion_tied_2022-23_1",
  //           qusType: "",
  //           file: {
  //             name: "",
  //             url: "",
  //             progress: null,
  //             error: null,
  //           },
  //           isDraft: null,
  //           status: null,
  //           rejectReason_mohua: null,
  //         },
  //         {
  //           installment: 2,
  //           year: this.years["2022-23"],
  //           type: "nonmillion_tied",
  //           instlText: "2nd Installment (2022-23)",
  //           quesText: "Upload Signed Grant Transfer Certificate",
  //           isDisableQues: true,
  //           disableMsg: `2nd Installment (2022-23) GTC has to be uploaded first before uploading 1st Installment (2022-23) GTC`,
  //           question:
  //             "(C) Upload Signed Grant Transfer Certificate - 2nd Installment (2022-23)",
  //           key: "nonmillion_tied_2022-23_2",
  //           qusType: "",
  //           file: {
  //             name: "",
  //             url: "",
  //             progress: null,
  //             error: null,
  //           },
  //           isDraft: null,
  //           status: null,
  //           rejectReason_mohua: null,
  //         },
  //       ],
  //     },
  //     {
  //       label: "2. View/Upload GTCs for Non-Million Plus Cities Untied Grants",
  //       isDisabled: false,
  //       error: false,
  //       icon: "",
  //       quesArray: [
  //         {
  //           installment: 2,
  //           year: this.years["2021-22"],
  //           type: "nonmillion_untied",
  //           instlText: "2nd Installment (2021-22)",
  //           quesText: "Upload Signed Grant Transfer Certificate",
  //           isDisableQues: false,
  //           disableMsg: "",
  //           question:
  //             "(A) Upload Signed Grant Transfer Certificate - 2nd Installment (2021-22)",
  //           key: "nonmillion_untied_2021-22_2",
  //           qusType: "",
  //           file: {
  //             name: "",
  //             url: "",
  //             progress: null,
  //             error: null,
  //           },
  //           isDraft: null,
  //           status: null,
  //           rejectReason_mohua: null,
  //         },
  //         {
  //           installment: 1,
  //           year: this.years["2022-23"],
  //           type: "nonmillion_untied",
  //           instlText: "1st Installment (2022-23)",
  //           quesText: "Upload Signed Grant Transfer Certificate",
  //           isDisableQues: true,
  //           disableMsg: `1st Installment (2022-23) GTC has to be uploaded first before uploading 2nd Installment (2021-22) GTC`,
  //           question:
  //             "(B) Upload Signed Grant Transfer Certificate - 1st Installment (2022-23)",
  //           key: "nonmillion_untied_2022-23_1",
  //           qusType: "",
  //           file: {
  //             name: "",
  //             url: "",
  //             progress: null,
  //             error: null,
  //           },
  //           isDraft: null,
  //           status: null,
  //           rejectReason_mohua: null,
  //         },
  //         {
  //           installment: 2,
  //           year: this.years["2022-23"],
  //           type: "nonmillion_untied",
  //           instlText: "2nd Installment (2022-23)",
  //           quesText: "Upload Signed Grant Transfer Certificate",
  //           isDisableQues: true,
  //           disableMsg: `2nd Installment (2022-23) GTC has to be uploaded first before uploading 1st Installment (2022-23) GTC`,
  //           question:
  //             "(C) Upload Signed Grant Transfer Certificate - 2nd Installment (2022-23)",
  //           key: "nonmillion_untied_2022-23_2",
  //           qusType: "",
  //           file: {
  //             name: "",
  //             url: "",
  //             progress: null,
  //             error: null,
  //           },
  //           isDraft: null,
  //           status: null,
  //           rejectReason_mohua: null,
  //         },
  //       ],
  //     },
  //     {
  //       label: "3. View/Upload GTCs for Million Plus Cities Tied Grants",
  //       isDisabled: false,
  //       error: false,
  //       icon: "",
  //       quesArray: [
  //         {
  //           installment: 1,
  //           year: this.years["2021-22"],
  //           type: "million_tied",
  //           instlText: "FY (2021-22)",
  //           isDisableQues: false,
  //           quesText:
  //             "Upload Signed Grant Transfer Certificate for Water Supply and SWM",
  //           question:
  //             "(A) Upload Signed Grant Transfer Certificate for Water Supply and SWM - FY ( 2021-22)",
  //           key: "million_tied_2021-22_1",
  //           qusType: "",
  //           file: {
  //             name: "",
  //             url: "",
  //             progress: null,
  //             error: null,
  //           },
  //           isDraft: null,
  //           status: null,
  //           rejectReason_mohua: null,
  //         },
  //         {
  //           installment: 1,
  //           year: this.years["2022-23"],
  //           type: "million_tied",
  //           instlText: "FY (2022-23)",
  //           isDisableQues: true,
  //           disableMsg: `Installment (2022-23) GTC has to be uploaded first before uploading Installment (2021-22) GTC`,
  //           quesText:
  //             "Upload Signed Grant Transfer Certificate for Water Supply and SWM",
  //           question:
  //             "(B) Upload Signed Grant Transfer Certificate for  Water Supply and SWM - FY ( 2022-23)",
  //           key: "million_tied_2022-23_1",
  //           qusType: "",
  //           file: {
  //             name: "",
  //             url: "",
  //             progress: null,
  //             error: null,
  //           },
  //           isDraft: null,
  //           status: null,
  //           rejectReason_mohua: null,
  //         },
  //       ],
  //     },
  //   ];
  // }
  intializeGtc() {
    this.gtcFormData = [
      {
        label: "1. View/Upload GTCs for Non-Million Plus Cities Tied Grants",
        isDisabled: false,
        error: false,
        icon: "",
        quesArray: [
          {
            installment: 2,
            year: this.years["2021-22"],
            type: "nonmillion_tied",
            instlText: "2nd Installment (2021-22)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: false,
            disableMsg: "",
            key: "nonmillion_tied_2021-22_2",
            question:
              "(A) Upload Signed Grant Transfer Certificate - 2nd Installment (2021-22)",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
            isDraft: null,
            status: null,
            responseFile_mohua: {
              name: '',
              url: '',
              progress: null
            },
            rejectReason_mohua: null,
            canTakeAction: false
          },
          {
            installment: 1,
            year: this.years["2022-23"],
            type: "nonmillion_tied",
            instlText: "1st Installment (2022-23)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: true,
            disableMsg: `2nd Installment (2021-22) GTC has to be uploaded first before uploading 1st Installment (2022-23) GTC`,
            question:
              "(B) Upload Signed Grant Transfer Certificate - 1st Installment (2022-23)",
            key: "nonmillion_tied_2022-23_1",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
            isDraft: null,
            status: null,
            rejectReason_mohua: null,
            responseFile_mohua: {
              name: '',
              url: '',
              progress: null
            },
            canTakeAction: false

          },
          {
            installment: 2,
            year: this.years["2022-23"],
            type: "nonmillion_tied",
            instlText: "2nd Installment (2022-23)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: true,
            disableMsg: `1st Installment (2022-23) GTC has to be uploaded first before uploading 2nd Installment (2022-23) GTC`,
            question:
              "(C) Upload Signed Grant Transfer Certificate - 2nd Installment (2022-23)",
            key: "nonmillion_tied_2022-23_2",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
            isDraft: null,
            status: null,
            rejectReason_mohua: null,
            responseFile_mohua: {
              name: '',
              url: '',
              progress: null
            },
            canTakeAction: false
          },
        ],
      },
      {
        label: "2. View/Upload GTCs for Non-Million Plus Cities Untied Grants",
        isDisabled: false,
        error: false,
        icon: "",
        quesArray: [
          {
            installment: 2,
            year: this.years["2021-22"],
            type: "nonmillion_untied",
            instlText: "2nd Installment (2021-22)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: false,
            disableMsg: "",
            question:
              "(A) Upload Signed Grant Transfer Certificate - 2nd Installment (2021-22)",
            key: "nonmillion_untied_2021-22_2",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
            isDraft: null,
            status: null,
            rejectReason_mohua: null,
            responseFile_mohua: {
              name: '',
              url: '',
              progress: null
            },
            canTakeAction: false
          },
          {
            installment: 1,
            year: this.years["2022-23"],
            type: "nonmillion_untied",
            instlText: "1st Installment (2022-23)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: true,
            disableMsg: `2nd Installment (2021-22) GTC has to be uploaded first before uploading 1st Installment (2022-23) GTC`,
            question:
              "(B) Upload Signed Grant Transfer Certificate - 1st Installment (2022-23)",
            key: "nonmillion_untied_2022-23_1",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
            isDraft: null,
            status: null,
            rejectReason_mohua: null,
            responseFile_mohua: {
              name: '',
              url: '',
              progress: null
            },
            canTakeAction: false
          },
          {
            installment: 2,
            year: this.years["2022-23"],
            type: "nonmillion_untied",
            instlText: "2nd Installment (2022-23)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: true,
            disableMsg: `1st Installment (2022-23) GTC has to be uploaded first before uploading 2nd Installment (2022-23) GTC`,
            question:
              "(C) Upload Signed Grant Transfer Certificate - 2nd Installment (2022-23)",
            key: "nonmillion_untied_2022-23_2",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
            isDraft: null,
            status: null,
            rejectReason_mohua: null,
            responseFile_mohua: {
              name: '',
              url: '',
              progress: null
            },
            canTakeAction: false
          },
        ],
      },
      {
        label: "3. View/Upload GTCs for Million Plus Cities Tied Grants",
        isDisabled: false,
        error: false,
        icon: "",
        quesArray: [
          {
            installment: 1,
            year: this.years["2021-22"],
            type: "million_tied",
            instlText: "FY (2021-22)",
            isDisableQues: false,
            quesText:
              "Upload Signed Grant Transfer Certificate for Water Supply and SWM",
            question:
              "(A) Upload Signed Grant Transfer Certificate for Water Supply and SWM - FY ( 2021-22)",
            key: "million_tied_2021-22_1",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
            isDraft: null,
            status: null,
            rejectReason_mohua: null,
            responseFile_mohua: {
              name: '',
              url: '',
              progress: null
            },
            canTakeAction: false
          },
          {
            installment: 1,
            year: this.years["2022-23"],
            type: "million_tied",
            instlText: "FY (2022-23)",
            isDisableQues: true,
            disableMsg: `2021-22 GTC has to be uploaded first before uploading 2022-23 GTC`,
            quesText:
              "Upload Signed Grant Transfer Certificate for Water Supply and SWM",
            question:
              "(B) Upload Signed Grant Transfer Certificate for  Water Supply and SWM - FY ( 2022-23)",
            key: "million_tied_2022-23_1",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
            isDraft: null,
            status: null,
            rejectReason_mohua: null,
            responseFile_mohua: {
              name: '',
              url: '',
              progress: null
            },
            canTakeAction: false
          },
        ],
      },
    ];
  }
  disableInputs() {
    for (let i = 0; i < this.gtcFormData.length; i++) {
      let tabArray = this.gtcFormData[i]?.quesArray;
      for (let j = 0; j < tabArray.length; j++) {
        if (this.userData?.role == 'STATE') {
          let el = tabArray[j];
          let nextEl = tabArray[j + 1];
          if (tabArray[0].isDraft == null || tabArray[0].isDraft != false) {
            tabArray[0].isDisableQues = false;
            break;
          } else if (el?.isDraft == false && el?.status != "REJECTED") {
            el.isDisableQues = true;
            if (j < tabArray.length - 1 && nextEl?.isDraft == true) {
              nextEl.isDisableQues = false;
            }
          } else if (el?.isDraft == false && el?.status == "REJECTED") {
            el.isDisableQues = false;
            if (j < tabArray.length - 1 && nextEl?.isDraft == true) {
              nextEl.isDisableQues = false;
            }
          }
        } else {
          tabArray[j].isDisableQues = true;
          tabArray[j].disableMsg = '';
        }

      }
    }
  }

  async fileChangeEvent(event, fileType, cIndex, qIndex, upType) {
    let isfileValid =  this.dataEntryService.checkSpcialCharInFileName(event.target.files);
    if(isfileValid == false){
      swal("Error","File name has special characters ~`!#$%^&*+=[]\\\';,/{}|\":<>? \nThese are not allowed in file name,please edit file name then upload.\n", 'error');
       return;
    }
    console.log(fileType, event);
    console.log("index", cIndex, qIndex);

    console.log("aaa", event.target.files[0].size);
    let files;
    let fileSize = event?.target?.files[0]?.size / 1048576; //size in mb
    console.log("aaa", fileSize);
    if (fileSize < 20) {
      files = event.target.files[0];
      let fileExtension = files.name.split(".").pop();
      console.log(fileExtension, fileType);
      if (fileType == "excel") {
        if (fileExtension == "xls" || fileExtension == "xlsx") {
          this.uploadFile(
            files,
            files.name,
            files.type,
            fileType,
            cIndex,
            qIndex,
            upType
          );
        } else {
          return swal("Error", "Only Excel File can be Uploaded.", "error");
        }
      } else if (fileType == "pdf") {
        if (fileExtension == "pdf") {
          this.uploadFile(
            files,
            files.name,
            files.type,
            fileType,
            cIndex,
            qIndex,
            upType
          );
        } else {
          console.log("error type", event);
          swal("Error", "Only PDF File can be Uploaded.", "error");
          return;
        }
      } else {
        return;
      }
    } else {
      swal("File Limit Error", "Maximum 20 mb file can be allowed.", "error");
      return;
    }
  }

  uploadFile(file, name, type, fileType, i, j, upType) {
    console.log("this.data", file, name, type, fileType);
    if (upType == 'normal') {
    this.gtcFormData[i].quesArray[j]["file"]["progress"] = 20;
   } else {
      this.gtcFormData[i].quesArray[j]["responseFile_mohua"]["progress"] = 20;
   }
   let code = this.userData?.stateCode;
   let folderName = `${this.userData?.role}/2022-23/gtc/${code}`
   if(this.userData?.role != 'STATE') {
    code = sessionStorage.getItem('stateCode');
    let actFolder = 'supporting_douments';
     folderName = `${this.userData?.role}/2022-23/${actFolder}/gtc/${code}`;
   }else {
    folderName = `${this.userData?.role}/2022-23/gtc/${code}`
   }

    this.dataEntryService.newGetURLForFileUpload(name, type, folderName).subscribe(
      (s3Response) => {
        if (upType == 'normal') {
          this.gtcFormData[i].quesArray[j]["file"]["progress"] = 50;
          this.gtcFormData[i].quesArray[j]["file"]["name"] = name;
        } else {
          this.gtcFormData[i].quesArray[j]["responseFile_mohua"]["progress"] = 50;
          this.gtcFormData[i].quesArray[j]["responseFile_mohua"]["name"] = name;
        }
        // this.gtcFormData[i].quesArray[j]["file"]["progress"] = 50;
        const res = s3Response.data[0];

        // this.gtcFormData[i].quesArray[j]["file"]["name"] = name;
        this.uploadFileToS3(
          file,
          res["url"],
          res["file_url"],
          name,
          fileType,
          i,
          j,
          upType
        );
      },
      (err) => {
        console.log(err);
        this.gtcFormData[i].quesArray[j]["file"] = file;
        this.gtcFormData[i].quesArray[j]["file"]["error"] = true;
      }
    );
  }

  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    name,
    fileType,
    i,
    j,
    upType
  ) {
    if (upType == 'normal') {
      this.gtcFormData[i].quesArray[j]["file"]["progress"] = 60;
    } else {
      this.gtcFormData[i].quesArray[j]["responseFile_mohua"]["progress"] = 60;
    }
    // this.gtcFormData[i].quesArray[j]["file"]["progress"] = 60;
    this.dataEntryService.uploadFileToS3(file, s3URL).subscribe(
      (res) => {
        // this.gtcFormData[i].quesArray[j]["file"]["progress"] = 70;
        if (res.type === HttpEventType.Response) {
          // this.gtcFormData[i].quesArray[j]["file"]["progress"] = 100;
          if (upType == 'normal') {
            this.gtcFormData[i].quesArray[j]["file"]["progress"] = 100;
            this.gtcFormData[i].quesArray[j]["file"]["url"] = fileAlias;
            sessionStorage.setItem("changeInGtc", "true");
            this.fileCompleted = true;
            let ijData = {
              i: i,
              j: j,
            };
            sessionStorage.setItem("gtcIjData", JSON.stringify(ijData));
          } else {
            this.gtcFormData[i].quesArray[j]["responseFile_mohua"]["progress"] = 100;
            this.gtcFormData[i].quesArray[j]["responseFile_mohua"]["url"] = fileAlias;
            this.fileCompleted = true;
          }
          // // this.gtcFormData[i].quesArray[j]['file'] = file;
          // this.gtcFormData[i].quesArray[j]["file"]["url"] = fileAlias;
          console.log("this.form", this.gtcFormData);

        }
      },
      (err) => {
        this.gtcFormData[i].quesArray[j]["file"] = file;
        this.gtcFormData[i].quesArray[j]["file"]["error"] = true;
        this.fileCompleted = false;
      }
    );
  }
  clearFile(type, i, j) {
    this.gtcFormData[i].quesArray[j]["file"]["url"] = "";
    this.gtcFormData[i].quesArray[j]["file"]["name"] = "";
    this.gtcFormData[i].quesArray[j]["file"]["progress"] = null;
    sessionStorage.setItem("changeInGtc", "true");
    let ijData = {
      i: i,
      j: j,
    };
    sessionStorage.setItem("gtcIjData", JSON.stringify(ijData));
  }
  clearFileAction(type, i, j) {
    this.gtcFormData[i].quesArray[j]["responseFile_mohua"]["url"] = "";
    this.gtcFormData[i].quesArray[j]["responseFile_mohua"]["name"] = "";
    this.gtcFormData[i].quesArray[j]["responseFile_mohua"]["progress"] = null;
  }
  fileCompleted = false;
  saveFile(i, j) {
    console.log("indexes", i, j);
    let postBody = { ...this.gtcFormData[i]?.quesArray[j] };
    if (
      this.gtcFormData[i].quesArray[j].file.name != "" ||
      this.gtcFormData[i].quesArray[j].file.url != ""
    ) {
      if (!this.fileCompleted) {
        swal('Error', "File not uploaded correctly", 'error');
        return;
      }
      console.log("111", postBody);

      postBody.state = this.stateId;
      postBody.isDraft = false;
      postBody.status = "PENDING";
      postBody.design_year = this.years["2022-23"];
      delete postBody?.instlText;
      delete postBody?.disableMsg;
      delete postBody?.isDisableQues;
      delete postBody?.quesText;
      delete postBody?.question;
      delete postBody?.qusType;
      delete postBody?.file?.progress;
      delete postBody?.file?.error;
      console.log("post request", postBody);
      this.stateService.postGtcForm(postBody).subscribe(
        (res) => {
          this.gtcFormData[i].quesArray[j].isDisableQues = true;
          this.gtcFormData[i].quesArray[j].status = "PENDING";
          this.gtcFormData[i].quesArray[j].isDraft = false;
          this.gtcFormData[i].quesArray[j].rejectReason_mohua = null;

          if (this.gtcFormData[i]?.quesArray[j + 1]?.isDisableQues && this.gtcFormData[i]?.quesArray[j + 1]?.status != 'APPROVED') {
            this.gtcFormData[i].quesArray[j + 1].isDisableQues = false;
          }
          swal("Saved", "File saved successfully", "success");
          sessionStorage.setItem("changeInGtc", "false");
          console.log("success responce", res);
          this.fileCompleted = false;
          this.newCommonService.setStateFormStatus2223.next(true);
        },
        (error) => {
          console.log("error", error);
        }
      );
    } else {
      swal("Error", "Please upload file", "error");
    }
    // delete postBody?.gtcFormData[i]?.instlText;
  }
  onPreview() {
    let formdata = this.gtcFormData;
    const dialogRef = this.dialog.open(GtcPreviewComponent, {
      data: formdata,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    // this.hidden = false;
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      //   this.hidden = true;
    });
  }

  navigationCheck() {
    if (!this.clickedSave) {
      this._router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.alertError =
            "You have some unsaved changes on this page. Do you wish to save your data as draft?";
          const changeInGtc = sessionStorage.getItem("changeInGtc");
          if (event.url === "/" || event.url === "/login") {
            sessionStorage.setItem("changeInGtc", "false");
            return;
          }
          if (changeInGtc === "true" && this.routerNavigate === null) {
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
      if (result === undefined) {
        if (this.routerNavigate) {
          // this.routerNavigate = null;
        }
      }
    });
  }
  async stay() {
    // await this.dialogRef.close(true);
    this.dialog.closeAll();
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }
  async proceed() {
    await this.dialogRef.close(true);
    this.dialog.closeAll();
    if (this.routerNavigate) {
      await this.formSave("draft");
      this._router.navigate([this.routerNavigate.url]);
      return;
    }

    await this.formSave("draft");
    return this._router.navigate(["stateform2223/property-tax"]);
  }
  async discard() {
    sessionStorage.setItem("changeInGtc", "false");
    await this.dialogRef.close(true);
    if (this.routerNavigate) {
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
  }
  alertClose() {
    this.stay();
  }
  formSave(type) {
    let data = JSON.parse(sessionStorage.getItem("gtcIjData"));
    console.log("i, j data", data);

    this.saveFile(data?.i, data?.j);
  }

  checkAction() {
    for (let i = 0; i < this.gtcFormData.length; i++) {
      let tabArray = this.gtcFormData[i]?.quesArray;
      tabArray.forEach((el) => {
        if (el?.isDraft == false && el?.status == "PENDING" && this.userData?.role == 'MoHUA') {
          el['canTakeAction'] = true;
        } else if (el?.isDraft == false && (el?.status == "APPROVED" || el?.status == "REJECTED")) {
          el['canTakeAction'] = false;
        } else {
          el['canTakeAction'] = false;
        }
      })
    }
  }
  actionBtnDis = false;
  formId = '';
  actionBtnClick(type, qItem, lItem, val) {
    console.log('clicked..', type, qItem, lItem);
    if (type == 'returnRes') {
      qItem.rejectReason_mohua = val;
    } else {
      qItem.status = type;
      this.actionError = false;
    }

  }
  actionError = false;
  saveAction(cIndex, qIndex) {
    console.log('gtc form data', this.gtcFormData)
    console.log('save action', cIndex, qIndex);
    if(!this.formId){
      this.setRouter();
    }
    let actionObj = this.gtcFormData[cIndex].quesArray[qIndex];
    let actionBody = {
      formId: this.formId,
      design_year: "606aafb14dff55e6c075d3ae",
      "state": this.stateId,
      "status": actionObj?.status,
      "statesData": [
        {
          "type": actionObj?.type,
          "installment": actionObj?.installment,
          "year": actionObj?.year,
          "state": this.stateId,
          "design_year": this.years["2022-23"]
        }
      ],
      "rejectReason_mohua": actionObj?.rejectReason_mohua,
      "responseFile": {
        "url": actionObj?.responseFile_mohua?.url,
        "name": actionObj?.responseFile_mohua?.name
      }
    }
    console.log('action body', actionBody)
    if (actionBody?.status == '' || actionBody?.status == undefined || actionBody?.status == null || actionBody?.status == 'PENDING') {
      swal('Error', "Action is mandatory", 'error');
      this.actionError = true;
      return;
    } else if ((actionBody?.rejectReason_mohua == "" || actionBody?.rejectReason_mohua == null) && actionBody?.status == "REJECTED") {
      swal("Alert!", "Return reason is mandatory in case of Returned a file", "error");
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
          this.finalActionSave(actionBody, cIndex, qIndex);
          break;
        case "cancel":
          break;
      }
    });

  }
  finalActionSave(actionBody, cIndex, qIndex) {
    this.newCommonService.postCommonAction(actionBody).subscribe(
      (res) => {
        console.log("action respon", res);
        this.gtcFormData[cIndex].quesArray[qIndex].canTakeAction = false;
        swal("Saved", "Action saved successfully.", "success");
        this.newCommonService.setStateFormStatus2223.next(true);
      },
      (error) => {
        swal("Error", `${error?.message}`, "error");
      }
    );
  }
  setRouter() {
    for (const key in this.sideMenuItem) {
      this.sideMenuItem[key].forEach((element) => {
        if (element?.name == "Grant Transfer Certificate") {
          // this.nextRouter = element?.nextUrl;
          // this.backRouter = element?.prevUrl;
          this.formId = element?._id;

        }
      });
    }
  }
}
