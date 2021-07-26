import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { delay, map, retryWhen } from "rxjs/operators";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { GAservicesService } from "./g-aservices.service";
import { SweetAlert } from "sweetalert/typings/core";
import { GrantAllPreviewComponent } from "./grant-all-preview/grant-all-preview.component";
const swal: SweetAlert = require("sweetalert");
import * as fileSaver from "file-saver";
import { Router, NavigationStart, Event } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UserUtility } from 'src/app/util/user/user';
import { USER_TYPE } from 'src/app/models/user/userType';
import { StateformsService } from '../stateforms.service'
@Component({
  selector: "app-grant-allocation",
  templateUrl: "./grant-allocation.component.html",
  styleUrls: ["./grant-allocation.component.scss"],
})
export class GrantAllocationComponent implements OnInit {

  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  loggedInUserType = this.loggedInUserDetails.role;
  isDisabled = false;
  constructor(
    private dataEntryService: DataEntryService,
    private _gAservices: GAservicesService,
    private dialog: MatDialog,
    private _router: Router,
    public stateformsService: StateformsService
  ) {
    this._router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationStart) {
        if (event.url === "/" || event.url === "/login") {
          sessionStorage.setItem("ChangeInGrantAllocation", "false");
          return;
        }
        const change = sessionStorage.getItem("ChangeInGrantAllocation");
        if (change === "true" && this.routerNavigate === null) {
          this.dialog.closeAll();
          this.routerNavigate = event;
          const currentRoute = this._router.routerState;
          this._router.navigateByUrl(currentRoute.snapshot.url, {
            skipLocationChange: true,
          });
          console.log('change..............happen');

          this.checkDiff();
          this.openModal(this.template);
        }
      }
    });
    switch (this.loggedInUserType) {
      case USER_TYPE.ULB:
      case USER_TYPE.PARTNER:
      case USER_TYPE.ADMIN:
      case USER_TYPE.MoHUA:
        this.isDisabled = true;
        break;
    }
  }
  @ViewChild("template") template;
  @ViewChild("template1") template1;
  dialogRefForNavigation;

  saveBtnText = "NEXT";
  routerNavigate = null;
  account = "";
  linked = "";
  err = "";
  state_name = "";
  postData;
  submitted;
  templateUrl;
  filesToUpload: Array<File> = [];
  gtFileUrl = "";
  fileName = "";
  progessType;
  formDisable = false;
  allStatus;
  fileUploadTracker: {
    [fileIndex: number]: {
      alias?: string;
      percentage?: number;
      status: "in-process" | "FAILED" | "completed";
    };
  } = {};

  fileProcessingTracker: {
    [fileIndex: number]: {
      status: "in-process" | "completed" | "FAILED";
      message: string;
    };
  } = {};
  filesAlreadyInProcess: number[] = [];
  disableAllForms = false
  isStateSubmittedForms = ''
  ngOnInit() {
    sessionStorage.setItem("ChangeInGrantAllocation", "false");
    this.allStatus = JSON.parse(sessionStorage.getItem("allStatusStateForms"))
    this.state_name = localStorage.getItem("state_name");
    let id = sessionStorage.getItem("state_id")
    //console.log('gaa', this.state_name);
    this._gAservices.getFiles(id).subscribe(
      (res) => {
        console.log("gaResponse", res);
        let gAData: any = res;
        if (gAData.data.answer == true) {
          this.account = "yes";
          this.fileName = gAData.data.fileName;
          this.gtFileUrl = gAData.data.url;
        } else if (gAData.data.answer == false) {
          this.account = "no";
        }
      },
      (errMes) => {
        // alert(errMes)
        console.log(errMes);
      }
    );

    if (this.loggedInUserType == 'MoHUA') {
      this.formDisable = true;
    } else if (this.loggedInUserType == 'STATE') {
      if (this.allStatus['latestFinalResponse']['role']) {
        if (this.allStatus['steps']['grantAllocation']['isSubmit']) {
          this.formDisable = true;
        }
      }
    }
    console.log('formDisable', this.formDisable)


  }

  checkDiff(){
    let preData = {
      answer: this.account,
      fileName: this.fileName,
      url: this.gtFileUrl,
      isDraft: this.checkDraft(),
    };

    let allFormData = JSON.parse(sessionStorage.getItem("allFormsPreData"))
    console.log('in grant all..', allFormData,  preData);

    if (allFormData) {
      allFormData[0].grantdistributions[0] = preData
      this.stateformsService.allFormsPreData.next(allFormData)
    }
  }
  downloadSample() {
    this._gAservices.downloadFile().subscribe((response) => {
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
  onClickYes() {
    this.account = "yes";

    this.linked = "";
    sessionStorage.setItem("ChangeInGrantAllocation", "true");
    this.checkDiff();
  }
  onClickNo() {
    this.account = "no";
    this.linked = "no";
    this.fileName = "";
    this.gtFileUrl = "";
    // this.progessType =''
    // if (!this.change)
    sessionStorage.setItem("ChangeInGrantAllocation", "true");
    this.checkDiff();
  }
  fileChangeEvent(event) {
    this.submitted = false;
    this.resetFileTracker();
    const filesSelected = <Array<File>>event.target["files"];
    this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
    this.upload();
    sessionStorage.setItem("ChangeInGrantAllocation", "true");
  }

  resetFileTracker() {
    this.filesToUpload = [];
    this.filesAlreadyInProcess = [];
    this.fileProcessingTracker = {};
    this.fileUploadTracker = {};
  }

  filterInvalidFilesForUpload(filesSelected: File[]) {
    const validFiles = [];
    for (let i = 0; i < filesSelected.length; i++) {
      const file = filesSelected[i];
      const fileExtension = file.name.split(`.`).pop();
      if (fileExtension === "xlsx") {
        validFiles.push(file);
      }
    }
    return validFiles;
  }

  async upload() {
    const formData: FormData = new FormData();
    const files: Array<File> = this.filesToUpload;
    this.fileName = files[0].name;
    this.progessType = 10;
    for (let i = 0; i < files.length; i++) {
      if (this.filesAlreadyInProcess.length > i) {
        continue;
      }
      this.filesAlreadyInProcess.push(i);
      await this.uploadFile(files[i], i);
    }
  }

  uploadFile(file: File, fileIndex: number) {
    return new Promise((resolve, reject) => {
      this.dataEntryService.getURLForFileUpload(file.name, file.type).subscribe(
        (s3Response) => {
          const fileAlias = s3Response["data"][0]["file_alias"];
          this.progessType = Math.floor(Math.random() * 90) + 10;
          const s3URL = s3Response["data"][0].url;
          this.uploadFileToS3(
            file,
            s3URL,
            fileAlias,
            fileIndex,
            this.progessType
          );
          resolve("success");
          console.log("file url", fileAlias);
        },
        (err) => {
          if (!this.fileUploadTracker[fileIndex]) {
            this.fileUploadTracker[fileIndex] = {
              status: "FAILED",
            };
          } else {
            this.fileUploadTracker[fileIndex].status = "FAILED";
          }
        }
      );
    });
  }

  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    fileIndex: number,
    progressType: string = ""
  ) {
    this.dataEntryService
      .uploadFileToS3(file, s3URL)
      // Currently we are not tracking file upload progress. If it is need, uncomment the below code.
      // .pipe(
      //   map((response: HttpEvent<any>) =>
      //     this.logUploadProgess(response, file, fileAlias, fileIndex)
      //   )
      // )
      .subscribe(
        (res) => {
          if (res.type === HttpEventType.Response) {
            //  this.progessType = 100;
            // this.gtFileUrl = fileAlias;
            this._gAservices.checkFile(fileAlias).subscribe(
              (response) => {
                console.log(response);
                this.progessType = 100;
                this.gtFileUrl = fileAlias;
                this.checkDiff();
                //  swal('Record Submitted Successfully!')
                //  resolve(res)
              },
              (error) => {
                this.err = error;
                console.log(this.err);
                // swal(`Error- ${this.err}`)
                let blob: any = new Blob([error.error], {
                  type: "text/json; charset=utf-8",
                });
                const url = window.URL.createObjectURL(blob);
                this.progessType = "";
                this.gtFileUrl = "";
                this.fileName = "";
                fileSaver.saveAs(blob, "error-sheet.xlsx");
                swal("Your file is not correct, Please refer error sheet");
              }
            );

            // console.log('Progress -', progressType, this.millionTiedFileUrl, this.nonMillionTiedFileUrl, this.nonMillionUntiedFileUrl)
          }
        },
        (err) => {
          this.fileUploadTracker[fileIndex].status = "FAILED";
        }
      );
  }

  private startFileProcessTracking(
    file: File,
    fileId: string,
    _fileIndex: number
  ) {
    this.fileProcessingTracker[_fileIndex] = {
      status: "in-process",
      message: "Processing",
    };

    this.dataEntryService
      .getFileProcessingStatus(fileId)
      .pipe(
        map((response) => {
          this.fileProcessingTracker[_fileIndex].message = response.message;
          if (!response.completed && response.status !== "FAILED") {
            /**
             * We are throwing error because we need to call the api again
             * after some time (2s right now) to check if processing of
             * file is completed or not. Once it is completed or FAILED, then we stop
             * calling the api for that file.
             */
            observableThrowError("throw any error here");
          }
          return response;
        }),
        retryWhen((err) => err.pipe(delay(2000)))
      )
      .subscribe(
        (response) => {
          this.fileProcessingTracker[_fileIndex].message = response.message;
          this.fileProcessingTracker[_fileIndex].status =
            response.status === "FAILED" ? "FAILED" : "completed";
        },
        (err) => {
          if (!this.fileProcessingTracker[_fileIndex]) {
            this.fileProcessingTracker[fileId].status = "FAILED";
            this.fileProcessingTracker[fileId].message =
              "Server failed to process data.";
          }
        }
      );
  }
  clearFiles() {
    this.fileName = "";
    this.gtFileUrl = "";
    this.progessType = "";
    this.checkDiff();
  }

  checkDraft() {
    if (this.account === "no") {
      return false;
    }
    if (this.account == "" || this.fileName == "" || this.gtFileUrl == "") {
      return true;
    } else {
      return false;
    }
  }

  saveForm() {
    this.submitted = true;
    this.postData = {
      answer: this.account,
      isDraft: this.checkDraft(),
      design_year: "606aaf854dff55e6c075d219",
      fileName: this.fileName,
      url: this.gtFileUrl,
    };
    console.log("postData", this.postData);

    this._gAservices.sendRequest(this.postData).subscribe(
      (res) => {
        console.log(res);
        sessionStorage.setItem("ChangeInGrantAllocation", "false");
        const form = JSON.parse(sessionStorage.getItem("allStatusStateForms"));
        form.steps.grantAllocation.isSubmit = !this.postData.isDraft;
        form.actionTakenByRole = 'STATE'
        console.log(form)
        this.stateformsService.allStatusStateForms.next(form);
        swal("Record Submitted Successfully!");

        if (this.routerNavigate) {
          this._router.navigate([this.routerNavigate.url]);
        }
        //   //  this.change = "false"
        //     let blob:any = new Blob([res], { type: 'text/json; charset=utf-8' });
        //    	const url = window.URL.createObjectURL(blob);
        // //window.open(url);
        // //window.location.href = response.url;
        // fileSaver.saveAs(blob, 'error-sheet.xlsx');
        //  resolve(res)
      },
      (error) => {
        this.err = error.message;
        console.log(this.err);
        swal(`Error- ${this.err}`);
        //  resolve(error)
      }
    );
  }
  onPreview() {
    console.log("preview............");
    let preData = {
      answer: this.account,
      fileName: this.fileName,
      url: this.gtFileUrl,
      isDraft: this.checkDraft(),
    };
    const dialogRef = this.dialog.open(GrantAllPreviewComponent, {
      data: preData,
      maxHeight: "95%",
      width: "85vw",
      panelClass: "no-padding-dialog",
    });
    console.log("dialog ref");
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  openModal(template: TemplateRef<any>) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRefForNavigation = this.dialog.open(template, dialogConfig);
    this.dialogRefForNavigation.afterClosed().subscribe((result) => {
      if (result === undefined) {
        if (this.routerNavigate) {
          this.routerNavigate = null;
        }
      }
    });
  }

  stay() {
    this.dialogRefForNavigation.close(true);
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }

  proceed() {
    this.dialogRefForNavigation.close(true);
    this.saveForm();

  }

  alertClose() {
    this.dialogRefForNavigation.close(true);
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }
}
function observableThrowError(arg0: string) {
  throw new Error("Function not implemented.");
}
