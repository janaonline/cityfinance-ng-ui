import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { State2223Service } from "../state-services/state2223.service";
import { SweetAlert } from "sweetalert/typings/core";
import { HttpEventType } from "@angular/common/http";
import { GaPreviewComponent } from "./ga-preview/ga-preview.component";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: "app-grant-allocation",
  templateUrl: "./grant-allocation.component.html",
  styleUrls: ["./grant-allocation.component.scss"],
})
export class GrantAllocationComponent implements OnInit {
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
    //  this.navigationCheck();
  }

  gtcFormData;

  ngOnInit(): void {
    this.intializeGtc();
  }
  intializeGtc() {
    this.gtcFormData = [
      {
        label:
          "1. View/Upload Grant Allocation for Non-Million Plus Cities Tied Grants",
        isDisabled: false,
        error: false,
        icon: "",
        quesArray: [
          {
            installment: 1,
            year: this.years["2022-23"],
            type: "nonmillion_tied",
            instlText: "1st Installment (2022-23)",
            quesText: "Upload Grant Allocation to ULBs",
            isDisableQues: false,
            disableMsg: "",
            key: "nonmillion_tied_2021-22_2",
            question:
              "(A) Upload Grant Allocation to ULBs - 1st Installment (2022-23)",
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
            quesText: "Upload Grant Allocation to ULBs",
            isDisableQues: true,
            disableMsg: `1st Installment (2022-23) Grant allocation has to be uploaded first before uploading 2nd Installment (2022-23) Grant allocation to ULBs`,
            question:
              "(B) Upload Grant Allocation to ULBs - 2nd Installment (2022-23)",
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
        ],
      },
      {
        label:
          "2. View/Upload Grant Allocation for Non-Million Plus Cities Untied Grants",
        isDisabled: false,
        error: false,
        icon: "",
        quesArray: [
          {
            installment: 1,
            year: this.years["2022-23"],
            type: "nonmillion_untied",
            instlText: "1st Installment (2022-23)",
            quesText: "Upload Grant Allocation to ULBs",
            isDisableQues: false,
            disableMsg: "",
            question:
              "(A) Upload Grant Allocation to ULBs - 1st Installment (2022-23)",
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
            installment: 2,
            year: this.years["2022-23"],
            type: "nonmillion_untied",
            instlText: "2nd Installment (2022-23)",
            quesText: "Upload Grant Allocation to ULBs",
            isDisableQues: true,
            disableMsg: `1st Installment (2022-23) Grant allocation has to be uploaded first before uploading 2nd Installment (2022-23) Grant allocation to ULBs`,
            question:
              "(B) Upload Grant Allocation to ULBs - 2nd Installment (2022-23)",
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
        ],
      },
      {
        label:
          "3. View/Upload Grant Allocation for Million Plus Cities Tied Grants",
        isDisabled: false,
        error: false,
        icon: "",
        quesArray: [
          {
            installment: 1,
            year: this.years["2022-23"],
            type: "million_tied",
            instlText: "FY (2022-23)",
            isDisableQues: false,
            quesText: "Upload Grant Allocation for Water Supply and SWM",
            question:
              "(A) Upload Grant Allocation for  Water Supply and SWM - FY ( 2022-23)",
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
        ],
      },
    ];
  }

  onPreview() {
    let formdata = this.gtcFormData;
    const dialogRef = this.dialog.open(GaPreviewComponent, {
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
  saveFile(i, j) {}
  /* for upload excel file */
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
    console.log("this.data", file, name, type, fileType, i, j);

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
  /* for clear file */
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
}
