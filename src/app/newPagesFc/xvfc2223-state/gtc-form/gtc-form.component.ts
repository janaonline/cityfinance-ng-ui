import { HttpEventType } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { post } from "jquery";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { SweetAlert } from "sweetalert/typings/core";
import { State2223Service } from "../state-services/state2223.service";
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
  constructor(
    private dataEntryService: DataEntryService,
    private stateService: State2223Service
  ) {
    this.years = JSON.parse(localStorage.getItem("Years"));
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.stateId = this.userData?.state;
  }

  gtcFormData;
  ngOnInit(): void {
    this.getGtcData();
    this.intializeGtc();
  }
  getGtcData() {
    this.stateService.getGtcData(this.stateId).subscribe(
      (res) => {
        console.log("res", res);
      },
      (error) => {
        console.log("err", error);
      }
    );
  }
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
            // question: "(A) Upload Signed Grant Transfer Certificate - 2nd Installment (2021-22)",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
          },
          {
            installment: 1,
            year: this.years["2022-23"],
            type: "nonmillion_tied",
            instlText: "1st Installment (2022-23)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: true,
            disableMsg: `1st Installment (2022-23) GTC has to be uploaded first before uploading 2nd Installment (2021-22) GTC`,
            // question: "(B) Upload Signed Grant Transfer Certificate - 1st Installment (2022-23)",
            key: "nonmillion_tied_2022-23_1",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
          },
          {
            installment: 2,
            year: this.years["2022-23"],
            type: "nonmillion_tied",
            instlText: "2nd Installment (2022-23)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: true,
            disableMsg: `2nd Installment (2022-23) GTC has to be uploaded first before uploading 1st Installment (2022-23) GTC`,
            // question: "(C) Upload Signed Grant Transfer Certificate - 2nd Installment (2022-23)",
            key: "nonmillion_tied_2022-23_2",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
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
            //question: "(A) Upload Signed Grant Transfer Certificate - 2nd Installment (2021-22)",
            key: "nonmillion_untied_2021-22_2",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
          },
          {
            installment: 1,
            year: this.years["2022-23"],
            type: "nonmillion_untied",
            instlText: "1st Installment (2022-23)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: true,
            disableMsg: `1st Installment (2022-23) GTC has to be uploaded first before uploading 2nd Installment (2021-22) GTC`,
            // question: "(B) Upload Signed Grant Transfer Certificate - 1st Installment (2022-23)",
            key: "nonmillion_untied_2022-23_1",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
          },
          {
            installment: 2,
            year: this.years["2022-23"],
            type: "nonmillion_untied",
            instlText: "2nd Installment (2022-23)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: true,
            disableMsg: `2nd Installment (2022-23) GTC has to be uploaded first before uploading 1st Installment (2022-23) GTC`,
            // question: "(C) Upload Signed Grant Transfer Certificate - 2nd Installment (2022-23)",
            key: "nonmillion_untied_2022-23_2",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
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
            // question: "(A) Upload Signed Grant Transfer Certificate for Million Plus Cities Grant for Water Supply and SWM ( 2021-22)",
            key: "million_tied_2021-22_1",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
          },
          {
            installment: 1,
            year: this.years["2022-23"],
            type: "million_tied",
            instlText: "FY (2022-23)",
            isDisableQues: true,
            disableMsg: `Installment (2022-23) GTC has to be uploaded first before uploading Installment (2021-22) GTC`,
            quesText:
              "Upload Signed Grant Transfer Certificate for Water Supply and SWM",
            // question: "(B) Upload Signed Grant Transfer Certificate for Million Plus Cities Grant for Water Supply and SWM ( 2022-23)",
            key: "million_tied_2022-23_1",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
          },
        ],
      },
    ];
  }

  async fileChangeEvent(event, fileType, cIndex, qIndex) {
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
            qIndex
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
            qIndex
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

  uploadFile(file, name, type, fileType, i, j) {
    console.log("this.data", file, name, type, fileType);

    this.gtcFormData[i].quesArray[j]["file"]["progress"] = 20;
    this.dataEntryService.getURLForFileUpload(name, type).subscribe(
      (s3Response) => {
        this.gtcFormData[i].quesArray[j]["file"]["progress"] = 50;
        const res = s3Response.data[0];
        this.gtcFormData[i].quesArray[j]["file"]["name"] = name;
        this.uploadFileToS3(
          file,
          res["url"],
          res["file_alias"],
          name,
          fileType,
          i,
          j
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
    j
  ) {
    this.gtcFormData[i].quesArray[j]["file"]["progress"] = 60;
    this.dataEntryService.uploadFileToS3(file, s3URL).subscribe(
      (res) => {
        this.gtcFormData[i].quesArray[j]["file"]["progress"] = 70;
        if (res.type === HttpEventType.Response) {
          this.gtcFormData[i].quesArray[j]["file"]["progress"] = 100;
          // this.gtcFormData[i].quesArray[j]['file'] = file;
          this.gtcFormData[i].quesArray[j]["file"]["url"] = fileAlias;
          console.log("this.form", this.gtcFormData);
        }
      },
      (err) => {
        this.gtcFormData[i].quesArray[j]["file"] = file;
        this.gtcFormData[i].quesArray[j]["file"]["error"] = true;
      }
    );
  }
  clearFile(type, i, j) {
    this.gtcFormData[i].quesArray[j]["file"]["url"] = "";
    this.gtcFormData[i].quesArray[j]["file"]["name"] = "";
    this.gtcFormData[i].quesArray[j]["file"]["progress"] = null;
  }

  saveFile(i, j) {
    console.log("indexes", i, j);
    let postBody = { ...this.gtcFormData[i]?.quesArray[j] };
    console.log("111", postBody);

    postBody.state = this.stateId;
    postBody.isDraft = false;
    postBody.tabIndex = i;
    postBody.quesIndex = j;
    postBody.design_year = this.years["2022-23"];
    delete postBody?.instlText;
    delete postBody?.disableMsg;
    delete postBody?.isDisableQues;
    delete postBody?.quesText;
    delete postBody?.qusType;
    delete postBody?.file?.progress;
    delete postBody?.file?.error;
    console.log("post request", postBody);
    this.stateService.postGtcForm(postBody).subscribe(
      (res) => {
        this.gtcFormData[i].quesArray[j].isDisableQues = false;
        console.log("success responce", res);
      },
      (error) => {
        console.log("error", error);
      }
    );
    // delete postBody?.gtcFormData[i]?.instlText;
  }
}
