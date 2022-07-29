import { HttpEventType } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NavigationStart, Router } from "@angular/router";
import { post } from "jquery";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { SweetAlert } from "sweetalert/typings/core";
import { State2223Service } from "../state-services/state2223.service";
import { GtcPreviewComponent } from "./gtc-preview/gtc-preview.component";
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
    private _router: Router
  ) {
    this.years = JSON.parse(localStorage.getItem("Years"));
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.stateId = this.userData?.state;
    this.navigationCheck();
  }

  gtcFormData;
  ngOnInit(): void {
    this.intializeGtc();
    this.getGtcData();
    sessionStorage.setItem("changeInGtc", "false");
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
            if (obj) {
              el["file"]["name"] = obj?.file?.name;
              el["file"]["url"] = obj?.file?.url;
              console.log("form", this.gtcFormData);
              el["isDraft"] = false;
              el["status"] = obj?.status;
              el["rejectReason"] = obj?.rejectReason;
            } else {
              el["isDraft"] = true;
              el["status"] = "PENDING";
              el["rejectReason"] = null;
            }
          });
        }
        this.disableInputs();
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
            rejectReason: null,
          },
          {
            installment: 1,
            year: this.years["2022-23"],
            type: "nonmillion_tied",
            instlText: "1st Installment (2022-23)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: true,
            disableMsg: `1st Installment (2022-23) GTC has to be uploaded first before uploading 2nd Installment (2021-22) GTC`,
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
            rejectReason: null,
          },
          {
            installment: 2,
            year: this.years["2022-23"],
            type: "nonmillion_tied",
            instlText: "2nd Installment (2022-23)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: true,
            disableMsg: `2nd Installment (2022-23) GTC has to be uploaded first before uploading 1st Installment (2022-23) GTC`,
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
            rejectReason: null,
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
            rejectReason: null,
          },
          {
            installment: 1,
            year: this.years["2022-23"],
            type: "nonmillion_untied",
            instlText: "1st Installment (2022-23)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: true,
            disableMsg: `1st Installment (2022-23) GTC has to be uploaded first before uploading 2nd Installment (2021-22) GTC`,
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
            rejectReason: null,
          },
          {
            installment: 2,
            year: this.years["2022-23"],
            type: "nonmillion_untied",
            instlText: "2nd Installment (2022-23)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: true,
            disableMsg: `2nd Installment (2022-23) GTC has to be uploaded first before uploading 1st Installment (2022-23) GTC`,
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
            rejectReason: null,
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
              "(A) Upload Signed Grant Transfer Certificate for Water Supply and SWM ( 2021-22)",
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
            rejectReason: null,
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
            question:
              "(B) Upload Signed Grant Transfer Certificate for  Water Supply and SWM ( 2022-23)",
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
            rejectReason: null,
          },
        ],
      },
    ];
  }
  disableInputs() {
    for (let i = 0; i < this.gtcFormData.length; i++) {
      let tabArray = this.gtcFormData[i]?.quesArray;
      for (let j = 0; j < tabArray.length; j++) {
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
      }
    }
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
          sessionStorage.setItem("changeInGtc", "true");
          console.log("this.form", this.gtcFormData);
          let ijData = {
            i: i,
            j: j,
          };
          sessionStorage.setItem("gtcIjData", JSON.stringify(ijData));
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
    sessionStorage.setItem("changeInGtc", "true");
    let ijData = {
      i: i,
      j: j,
    };
    sessionStorage.setItem("gtcIjData", JSON.stringify(ijData));
  }

  saveFile(i, j) {
    console.log("indexes", i, j);
    let postBody = { ...this.gtcFormData[i]?.quesArray[j] };
    if (
      (this.gtcFormData[i].quesArray[j].file.name != "" ||
      this.gtcFormData[i].quesArray[j].file.url != "")
    ) {
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
          this.gtcFormData[i].quesArray[j].rejectReason = null;
          if (this.gtcFormData[i]?.quesArray[j + 1]?.isDisableQues) {
            this.gtcFormData[i].quesArray[j + 1].isDisableQues = false;
          }

          sessionStorage.setItem("changeInGtc", "false");
          console.log("success responce", res);
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
}
