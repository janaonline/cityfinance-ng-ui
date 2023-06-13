import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NavigationStart, Router } from "@angular/router";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { State2223Service } from "../state-services/state2223.service";
import { SweetAlert } from "sweetalert/typings/core";
import { HttpEventType } from "@angular/common/http";
import { GaPreviewComponent } from "./ga-preview/ga-preview.component";
import * as fileSaver from "file-saver";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
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
  isApiInProgress = true;
  @ViewChild("templateSave") template;
  backRouter = '';
  nextRouter = '';
  constructor(
    private dataEntryService: DataEntryService,
    private stateService: State2223Service,
    private dialog: MatDialog,
    private _router: Router,
    private newCommonService: NewCommonService
  ) {
    this.years = JSON.parse(localStorage.getItem("Years"));
    this.userData = JSON.parse(localStorage.getItem("userData"));

    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
    }
    this.navigationCheck();
  }

  gtcFormData;
  sideMenuItem;
  ngOnInit(): void {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftStateMenuRes"));
    this.setRouter();
    this.intializeGtc();
    this.getGtcData();
    sessionStorage.setItem("changeInGta", "false");
  }
  intializeGtc() {
    this.gtcFormData = [
      {
        label:
          "1. View/Upload Grant Allocation for Non-Million Plus Cities Tied Grants",
        isDisabled: false,
        error: false,
        icon: "",
        yearCode: '2022-23',
        quesArray: [
          {
            installment: 1,
            year: this.years["2022-23"],
            type: "nonmillion_tied",
            instlText: "1st Installment (2022-23)",
            quesText: "Upload Grant Allocation to ULBs",
            isDisableQues: false,
            disableMsg: "",
            key: "nonmillion_tied_2022-23_1",
            question:
              "(A) Upload Grant Allocation to ULBs - 1st Installment (2022-23)",
            qusType: "",
            fileName: "",
            url: "",
            file: {
              // name: "",
              // url: "",
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
            key: "nonmillion_tied_2022-23_2",
            qusType: "",
            fileName: "",
            url: "",
            file: {
              // name: "",
              // url: "",
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
            key: "nonmillion_untied_2022-23_1",
            qusType: "",
            fileName: "",
            url: "",
            file: {
              // name: "",
              // url: "",
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
            key: "nonmillion_untied_2022-23_2",
            qusType: "",
            fileName: "",
            url: "",
            file: {
              // name: "",
              // url: "",
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
            key: "million_tied_2022-23_1",
            qusType: "",
            fileName: "",
            url: "",
            file: {
              // name: "",
              // url: "",
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
  getGtcData() {
    this.isApiInProgress = true;
    this.stateService.getGTAFiles(this.stateId).subscribe(
      (res: any) => {
        this.isApiInProgress = false;
        console.log("res", res);
        for (let i = 0; i < this.gtcFormData.length; i++) {
          let tabArray = this.gtcFormData[i]?.quesArray;
          let obj;
          this.gtcFormData[i]?.quesArray.forEach((el) => {
            obj = res?.data?.find(({ key }) => {
              //  console.log(key, el);
              return key == el?.key;
            });
            if (obj) {
              el["fileName"] = obj?.fileName;
              el["url"] = obj?.url;
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
        this.isApiInProgress = false;
      }
    );
  }
  disableInputs() {
    for (let i = 0; i < this.gtcFormData.length; i++) {
      let tabArray = this.gtcFormData[i]?.quesArray;
      for (let j = 0; j < tabArray.length; j++) {
        let el = tabArray[j];
        if(this.userData?.role == 'STATE'){
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
        }else {
          el.isDisableQues = true;
        }

      }
    }
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
  postBody;
  saveFile(i, j) {
    if (
      this.gtcFormData[i].quesArray[j].fileName != "" ||
      this.gtcFormData[i].quesArray[j].url != ""
    ) {
      this.postBody = {
        design_year: this.years["2022-23"],
        year: this.gtcFormData[i].quesArray[j]?.year,
        url: this.gtcFormData[i].quesArray[j]["url"],
        fileName: this.gtcFormData[i].quesArray[j]["fileName"],
        answer: true,
        isDraft: false,
        type: this.gtcFormData[i].quesArray[j]?.type,
        installment: this.gtcFormData[i].quesArray[j]?.installment,
      };

      this.stateService.postGTAFile(this.postBody).subscribe(
        (res: any) => {
          swal("Saved", "File saved successfully.", "success");
          console.log("GTA file response", res);
          this.gtcFormData[i].quesArray[j].isDisableQues = true;
          this.gtcFormData[i].quesArray[j].status = "PENDING";
          this.gtcFormData[i].quesArray[j].isDraft = false;
          this.gtcFormData[i].quesArray[j].rejectReason = null;
          if (this.gtcFormData[i]?.quesArray[j + 1]?.isDisableQues) {
            this.gtcFormData[i].quesArray[j + 1].isDisableQues = false;
          }
          sessionStorage.setItem("changeInGta", "false");
          this.newCommonService.setStateFormStatus2223.next(true);
        },
        (error) => {
          swal("Error", `${error?.message}`, "error");
        }
      );
    } else {
      swal("Error", "Please upload file", "error");
    }
  }
  /* for upload excel file */
  async fileChangeEvent(event, fileType, cIndex, qIndex) {
    let isfileValid =  this.dataEntryService.checkSpcialCharInFileName(event.target.files);
    if(isfileValid == false){
      swal("Error","File name has special characters ~`!#$%^&*+=[]\\\';,/{}|\":<>?@ \nThese are not allowed in file name,please edit file name then upload.\n", 'error');
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
    let folderName = `${this.userData?.role}/2022-23/grant_allocation/${this.userData?.stateCode}`
    this.dataEntryService.newGetURLForFileUpload(name, type, folderName).subscribe(
      (s3Response) => {
        this.gtcFormData[i].quesArray[j]["file"]["progress"] = 50;
        const res = s3Response.data[0];
        this.gtcFormData[i].quesArray[j]["fileName"] = name;
        this.uploadFileToS3(
          file,
          res["url"],
          res["file_url"],
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
          let instl = this.gtcFormData[i].quesArray[j]?.installment;
          let year = this.gtcFormData[i].quesArray[j]?.year;
          let type = this.gtcFormData[i].quesArray[j]?.type;
          this.stateService.checkFile(fileAlias, instl, year, type).subscribe(
            (response) => {
              console.log(response);
              this.gtcFormData[i].quesArray[j]["file"]["progress"] = 100;

              this.gtcFormData[i].quesArray[j]["url"] = fileAlias;
              let ijData = {
                i: i,
                j: j,
              };
              sessionStorage.setItem("gtaIjData", JSON.stringify(ijData));
              sessionStorage.setItem("changeInGta", "true");
              //  swal('Record Submitted Successfully!')
              //  resolve(res)
            },
            (error) => {
              swal(`Error- ${error.message}`, "error")
              let blob: any = new Blob([error.error], {
                type: "text/json; charset=utf-8",
              });
              const url = window.URL.createObjectURL(blob);
              this.gtcFormData[i].quesArray[j]["file"]["progress"] = null;

              this.gtcFormData[i].quesArray[j]["url"] = "";
              this.gtcFormData[i].quesArray[j]["fileName"] = "";
              fileSaver.saveAs(blob, "error-sheet.xlsx");
              swal("Your file is not correct, Please refer error sheet");
            }
          );
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
    this.gtcFormData[i].quesArray[j]["url"] = "";
    this.gtcFormData[i].quesArray[j]["fileName"] = "";
    this.gtcFormData[i].quesArray[j]["file"]["progress"] = null;
    // sessionStorage.setItem("changeInGtc", "true");
    let ijData = {
      i: i,
      j: j,
    };
    sessionStorage.setItem("gtcIjData", JSON.stringify(ijData));
    sessionStorage.setItem("changeInGta", "false");
  }

  downloadSample(data) {
    console.log("data", data);

    let instl = data?.installment;
    let dType = data?.type;
    let year = data?.year;
    this.stateService
      .getGtaTemplate(instl, dType, year)
      .subscribe((response: any) => {
        let blob: any = new Blob([response], {
          type: "text/json; charset=utf-8",
        });
        const url = window.URL.createObjectURL(blob);
        //window.open(url);
        //window.location.href = response.url;
        fileSaver.saveAs(blob, "grant-allocation-template.xlsx");
      }),
      (error) => console.log("Error downloading the file"),
      () => console.info("File downloaded successfully");
  }
  navigationCheck() {
    if (!this.clickedSave) {
      this._router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.alertError =
            "You have some unsaved changes on this page. Do you wish to save your data as draft?";
          const changeInGtc = sessionStorage.getItem("changeInGta");
          if (event.url === "/" || event.url === "/login") {
            sessionStorage.setItem("changeInGta", "false");
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
    sessionStorage.setItem("changeInGta", "false");
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
    let data = JSON.parse(sessionStorage.getItem("gtaIjData"));
    console.log("i, j data", data);

    this.saveFile(data?.i, data?.j);
  }
  setRouter() {
    for (const key in this.sideMenuItem) {
      this.sideMenuItem[key].forEach((element) => {
        if (element?.url == "grant-allocation") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
    }
  }
}
