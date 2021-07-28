
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, NavigationStart, Event } from "@angular/router";
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, map, retryWhen } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GTCertificateService } from './gtcertificate.service'
import { StateformsService } from '../stateforms.service'
import { UserUtility } from 'src/app/util/user/user';
import { USER_TYPE } from 'src/app/models/user/userType';
import { IUserLoggedInDetails } from "../../../models/login/userLoggedInDetails";
import { GtcertificatePreviewComponent } from './gtcertificate-preview/gtcertificate-preview.component';
import { ProfileService } from "src/app/users/profile/service/profile.service";
import { SweetAlert } from "sweetalert/typings/core";
import { isNull } from '@angular/compiler/src/output/output_ast';
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-gtcertificate',
  templateUrl: './gtcertificate.component.html',
  styleUrls: ['./gtcertificate.component.scss']
})
export class GTCertificateComponent implements OnInit {
  userLoggedInDetails: IUserLoggedInDetails;
  loggedInUserType: USER_TYPE;

  modalRef: BsModalRef;
  filesToUpload: Array<File> = [];
  gtCertificate: FormGroup;
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
  fileName = '';
  fileName_millionTied = '';
  fileName_nonMillionTied = '';
  fileName_nonMillionUntied = '';
  millionTiedProgress;
  nonMillionTiedProgress;
  nonMillionUntiedProgress;
  err = '';
  submitted = false;
  routerDiff = {};
  isDisabled = false;
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;

  actionRes;
  stateActionA = '';
  stateActionB = '';
  stateActionC = '';
  rejectReasonA = null;
  rejectReasonB = null;
  rejectReasonC = null;
  actionData1 = {};
  actionData2 = {};
  actionData3 = {};
  btnStyleA = false;
  btnStyleR = false;
  btnStyleB = false;
  btnStyleRB = false;
  btnStyleC = false;
  btnStyleRC = false;
  /* This is to keep track of which indexed which file is already either in data processing state
   * or in file Upload state
   */
  filesAlreadyInProcess: number[] = [];
  change = ''
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _router: Router,
    private dataEntryService: DataEntryService,
    private gtcService: GTCertificateService,
    private dialog: MatDialog,
    public _stateformsService: StateformsService,
    private profileService: ProfileService,
  ) {
    this.initializeUserType();
    this.navigationCheck()


  }
  @ViewChild("template1") template1;
  @ViewChild("template") template;

  uploadedFiles;
  millionTiedFileUrl = '';
  nonMillionTiedFileUrl = '';
  nonMillionUntiedFileUrl = '';
  routerNavigate = null

  navigationCheck() {

    this._router.events.subscribe(async (event: Event) => {
      if (!this.submitted) {
        if (event instanceof NavigationStart) {
          if (event.url === "/" || event.url === "/login") {
            sessionStorage.setItem("changeInGTC", "false");
            this.change = "false"
            return;
          }
          const changeHappen = sessionStorage.getItem("changeInGTC")
          if (changeHappen === "true" && this.routerNavigate == null) {

            this.change = "true"
            console.log('inside router')
            const currentRoute = this._router.routerState;
            this._router.navigateByUrl(currentRoute.snapshot.url, { skipLocationChange: true });
            this.routerNavigate = event

            this.openModal(this.template);
          } else {
            this.change = "false"
          }
        }
      }


    });
  }
  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
    console.log(this._router.url);
  }
  disableAllForms = false;
  isStateSubmittedForms = '';
  state_id;

  allStatus;
  getStatus;
  formDisable = false;
  formDisableA = false;
  formDisableB = false;
  formDisableC = false;
  actionFormDisableA = false;
  actionFormDisableB = false;
  actionFormDisableC = false;
  showQ1 = false
  showQ2 = false
  showQ3 = false
  btnStyleA_A = false
  btnStyleR_A = false
  btnStyleA_B = false
  btnStyleR_B = false
  btnStyleA_C = false
  btnStyleR_C = false
  ngOnInit(): void {
    this.allStatus = JSON.parse(sessionStorage.getItem("allStatusStateForms"))
    this.actionFormDisableA = sessionStorage.getItem("disableAllActionForm") == 'true'
    this.actionFormDisableB = sessionStorage.getItem("disableAllActionForm") == 'true'
    this.actionFormDisableC = sessionStorage.getItem("disableAllActionForm") == 'true'
    this._stateformsService.disableAllFormsAfterMoHUAReview.subscribe((disable) => {
      this.actionFormDisableA = disable;
      this.actionFormDisableB = disable;
      this.actionFormDisableC = disable;
      if (disable) {
        sessionStorage.setItem("disableAllActionForm", "true")
      }
    })
    this.formDisableA = sessionStorage.getItem("disableAllForms") == 'true'
    this.formDisableB = sessionStorage.getItem("disableAllForms") == 'true'
    this.formDisableC = sessionStorage.getItem("disableAllForms") == 'true'
    this.state_id = sessionStorage.getItem("state_id")
    if (this.loggedInUserType == 'MoHUA') {
      this.formDisable = true;
    } else if (this.loggedInUserType == 'STATE') {
      if (this.allStatus['latestFinalResponse']['role'] == 'STATE') {
        if (this.allStatus['steps']['GTCertificate']['isSubmit'] &&
          (this.allStatus['steps']['GTCertificate']['status'] == 'PENDING'
            || this.allStatus['steps']['GTCertificate']['status'] == 'APPROVED')) {
          this.formDisable = true;
        }
      } else if (this.allStatus['latestFinalResponse']['role'] == 'MoHUA') {
        if (this.allStatus['steps']['GTCertificate']['status'] == 'APPROVED') {
          this.formDisable = true
        }
      }
    }

    this.gtcService.getCondition(this.state_id).subscribe(
      (res) => {
        let data = res['data']
        this.showQ1 = data['showQ1']
        this.showQ2 = data['showQ2']
        this.showQ3 = data['showQ3']
        console.log(this.showQ1, this.showQ2, this.showQ3)
      },
      (err) => {
        console.log(err.message)
      })

    this.gtcService.getFiles(this.state_id)
      .subscribe((res) => {
        console.log('gtc responce', res);

        sessionStorage.setItem("StateGTC", JSON.stringify(res));
        if (res['data']['million_tied']['pdfUrl'] != '' && res['data']['million_tied']['pdfName'] != '') {
          this.fileName_millionTied = res['data']['million_tied']['pdfName'];
          this.millionTiedFileUrl = res['data']['million_tied']['pdfUrl'];
        }
        if (res['data']['nonmillion_tied']['pdfUrl'] != '' && res['data']['nonmillion_tied']['pdfName'] != '') {
          this.fileName_nonMillionTied = res['data']['nonmillion_tied']['pdfName'];
          this.nonMillionTiedFileUrl = res['data']['nonmillion_tied']['pdfUrl'];
        }
        if (res['data']['nonmillion_untied']['pdfUrl'] != '' && res['data']['nonmillion_untied']['pdfName'] != '') {
          this.fileName_nonMillionUntied = res['data']['nonmillion_untied']['pdfName'];
          this.nonMillionUntiedFileUrl = res['data']['nonmillion_untied']['pdfUrl'];
        }

        console.log(this.fileName_nonMillionUntied, this.fileName_nonMillionTied, this.fileName_millionTied)

        const masterForm = JSON.parse(sessionStorage.getItem("allStatusStateForms"))
        console.log(masterForm)

        this.stateActionA = res['data']['million_tied']['status']
        if (this.stateActionA == "APPROVED") {
          this.btnStyleA_A = true;
        } else if (this.stateActionA == "REJECTED") {
          this.btnStyleR_A = true;
        }
        this.stateActionB = res['data']['nonmillion_tied']['status']
        if (this.stateActionB == "APPROVED") {
          this.btnStyleA_B = true;
        } else if (this.stateActionB == "REJECTED") {
          this.btnStyleR_B = true;
        }
        this.stateActionC = res['data']['nonmillion_untied']['status']
        if (this.stateActionC == "APPROVED") {
          this.btnStyleA_C = true;
        } else if (this.stateActionC == "REJECTED") {
          this.btnStyleR_C = true;
        }
        this.getStatus = res['data']['status']
        if (res['data']['million_tied']['rejectReason']) {

          this.rejectReasonA = res['data']['million_tied']['rejectReason']
        }
        if (res['data']['nonmillion_tied']['rejectReason']) {
          this.rejectReasonB = res['data']['nonmillion_tied']['rejectReason']
        }
        if (res['data']['nonmillion_untied']['rejectReason']) {
          this.rejectReasonC = res['data']['nonmillion_untied']['rejectReason']
        }
        if (this.loggedInUserType === "MoHUA") {
          if (this.allStatus['latestFinalResponse']['role'] == 'STATE') {
            if (this.stateActionA != 'PENDING' && this.stateActionA) {
              this.actionFormDisableA = true
            }
            if (this.stateActionB != 'PENDING' && this.stateActionB) {
              this.actionFormDisableB = true
            }
            if (this.stateActionC != 'PENDING' && this.stateActionC) {
              this.actionFormDisableC = true
            }
          } else if (this.allStatus['latestFinalResponse']['role'] == 'MoHUA') {
            this.actionFormDisableA = true
            this.actionFormDisableB = true
            this.actionFormDisableC = true
          }
        }

        if (this.loggedInUserType == 'MoHUA') {
          this.formDisableA = true;
          this.formDisableB = true;
          this.formDisableC = true;

        } else if (this.loggedInUserType == 'STATE') {
          if (this.allStatus['latestFinalResponse']['role'] == 'STATE') {
            this.formDisableA = true;
            this.formDisableB = true;
            this.formDisableC = true;
          } else if (this.allStatus['latestFinalResponse']['role'] == 'MoHUA') {
            if (this.stateActionA == 'APPROVED') {
              this.formDisableA = true
            } if (this.stateActionB == 'APPROVED') {
              this.formDisableB = true
            } if (this.stateActionC == 'APPROVED') {
              this.formDisableC = true
            }
          }
        }





      },
        errMes => {
          // alert(errMes)
          console.log(errMes);
        }
      );

    sessionStorage.setItem("changeInGTC", "false")
    this.change = "false"
    this.submitted = false;
    this._stateformsService.disableAllFormsAfterStateFinalSubmit.subscribe((disable) => {
      this.formDisableA = disable
      this.formDisableB = disable
      this.formDisableC = disable
      if (disable) {
        sessionStorage.setItem("disableAllForms", "true")
      }

    });


  }

  uploadButtonClicked(formName) {
    sessionStorage.setItem("changeInGTC", "true")
    this.change = "true";
    if (formName === 'A') {
      this.stateActionA = 'PENDING';
      this.rejectReasonA = null
    } else if (formName === 'B') {
      this.stateActionB = 'PENDING';
      this.rejectReasonB = null
    } else if (formName === 'C') {
      this.stateActionC = 'PENDING';
      this.rejectReasonC = null
    }
  }

  dialogRef
  openModal(template: TemplateRef<any>) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this.dialog.open(template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {


      console.log('result', result)
      if (result === undefined) {
        if (this.routerNavigate) {
          this.routerNavigate = null;
        }
      }
    });
  }

  async stay() {
    await this.dialogRef.close(true);
    if (this.routerNavigate) {
      this.routerNavigate = null
    }

  }


  async proceed(uploadedFiles) {
    await this.dialog.closeAll();

    if (this.submitted) {
      this.postsDataCall(uploadedFiles);
      this._router.navigate(["stateform/water-supply"]);
      return;
    } else if (this.routerNavigate) {
      this.postsDataCall(uploadedFiles);
      sessionStorage.setItem("changeInGTC", "false")
      this._router.navigate([this.routerNavigate.url]);
      return
    }




  }

  postsDataCall(uploadedFiles) {


    return new Promise((resolve, reject) => {

      this.gtcService.sendRequest(this.uploadedFiles)
        .subscribe(async (res) => {
          // const status = JSON.parse(sessionStorage.getItem("allStatus"));
          // status.isCompleted = res['data']["isCompleted"];
          // this._stateformsService.allStatus.next(status);
          sessionStorage.setItem("changeInGTC", "false")
          this.change = "false"
          const form = JSON.parse(sessionStorage.getItem("allStatusStateForms"));
          form.steps.GTCertificate.isSubmit = !this.uploadedFiles.isDraft;
          form.steps.GTCertificate.status = 'PENDING';
          form.actionTakenByRole = 'STATE'
          console.log(form)
          this._stateformsService.allStatusStateForms.next(form);
          swal('Record Submitted Successfully!')
          this._router.navigate(["stateform/link-in-pfms"]);
          resolve(res)
        },
          error => {
            this.err = error.message;
            console.log(this.err);
            swal(`Error- ${this.err}`)
            resolve(error)
          });
    })

  }
  body = {};
  saveStateAction() {

    let data = JSON.parse(sessionStorage.getItem("StateGTC"))
    console.log(data)
    this.body['design_year'] = data.data['design_year']
    this.body['isDraft'] = data.data['isDraft']
    this.body['state'] = this.state_id
    this.body['million_tied'] = data.data['million_tied']
    this.body['nonmillion_tied'] = data.data['nonmillion_tied']
    this.body['nonmillion_untied'] = data.data['nonmillion_untied']
    this.body['million_tied']['status'] = this.actionData1['status'] ?? this.stateActionA
    this.body['million_tied']['rejectReason'] = this.actionData1['rejectReason'] ?? this.rejectReasonA
    this.body['nonmillion_tied']['status'] = this.actionData2['status'] ?? this.stateActionB
    this.body['nonmillion_tied']['rejectReason'] = this.actionData2['rejectReason'] ?? this.rejectReasonB
    this.body['nonmillion_untied']['status'] = this.actionData3['status'] ?? this.stateActionC
    this.body['nonmillion_untied']['rejectReason'] = this.actionData3['rejectReason'] ?? this.rejectReasonC
    if (this.actionData1['status'] === 'REJECTED' || this.actionData2['status'] === 'REJECTED' || this.actionData3['status'] === 'REJECTED') {
      this.body['status'] = 'REJECTED'

    } else {
      this.body['status'] = 'APPROVED'
    }

    this.gtcService.postStateAction(this.body).subscribe(
      (res) => {
        swal("Record submitted successfully!");
        sessionStorage.setItem("changeInGTC", "false")
        const status = JSON.parse(sessionStorage.getItem("allStatusStateForms"));
        status.steps.GTCertificate.status = this.body['status'];
        status.steps.GTCertificate.isSubmit = !this.body['isDraft'];
        status.actionTakenByRole = 'MoHUA'
        this._stateformsService.allStatusStateForms.next(status);

        this._router.navigate(["stateform/link-in-pfms"]);
      },
      (error) => {
        swal("An error occured!");
        console.log(error.message);
      }
    );
  }

  alertClose() {
    this.stay();
  }

  saveForm(template1) {
    console.log(this.loggedInUserType)
    if (this.loggedInUserType === "STATE") {
      this.submitted = true;
      this.uploadedFiles = {
        design_year: "606aaf854dff55e6c075d219",
        million_tied:
        {
          pdfUrl: this.millionTiedFileUrl,
          pdfName: this.fileName_millionTied,
          status: this.stateActionA ? this.stateActionA : 'PENDING',
          rejectReason: this.rejectReasonA ? this.rejectReasonA : null
        },
        nonmillion_tied:
        {
          pdfUrl: this.nonMillionTiedFileUrl,
          pdfName: this.fileName_nonMillionTied,
          status: this.stateActionB ? this.stateActionB : 'PENDING',
          rejectReason: this.rejectReasonB ? this.rejectReasonB : null
        },
        nonmillion_untied:
        {
          pdfUrl: this.nonMillionUntiedFileUrl,
          pdfName: this.fileName_nonMillionUntied,
          status: this.stateActionC ? this.stateActionC : 'PENDING',
          rejectReason: this.rejectReasonC ? this.rejectReasonC : null
        },
        isDraft: true
      };
      let changeHappen = sessionStorage.getItem("changeInGTC")
      if (changeHappen == "false") {
        this._router.navigate(["stateform/link-in-pfms"]);
        return;
      } else {
        if (
          this.millionTiedFileUrl != '' &&
          this.nonMillionTiedFileUrl != '' &&
          this.nonMillionUntiedFileUrl != ''
        ) {
          this.uploadedFiles.isDraft = false
          this.postsDataCall(this.uploadedFiles);

        }
        else {
          this.openModal(template1);
        }
      }
    } else if (this.loggedInUserType === "MoHUA") {
      let changeHappen = sessionStorage.getItem("changeInGTC")
      if (changeHappen == "false") {
        this._router.navigate(["stateform/link-in-pfms"]);
        return;
      } else {
        this.saveStateAction()
      }

    }
  }

  clearFiles(fileName) {
    sessionStorage.setItem("changeInGTC", "true")
    this.change = "true"
    if (fileName == 'fileName_millionTied') {
      this.millionTiedProgress = '';
      this.fileName_millionTied = '';
      this.millionTiedFileUrl = ''
    }
    if (fileName == 'fileName_nonMillionTied') {
      this.nonMillionTiedProgress = '';
      this.fileName_nonMillionTied = '';
      this.nonMillionTiedFileUrl = ''
    }
    if (fileName == 'fileName_nonMillionUntied') {
      this.nonMillionUntiedProgress = '';
      this.fileName_nonMillionUntied = '';
      this.nonMillionUntiedFileUrl = ''
    }
    this.checkDiff();
  }

  fileChangeEvent(event, progessType, fileName) {
    this.submitted = false;
    this.resetFileTracker();
    const filesSelected = <Array<File>>event.target["files"];
    this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
    this.upload(progessType, fileName);
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
      if (fileExtension === "pdf" || fileExtension === "xlsx" || fileExtension == "png"
        || fileExtension == "jpg" || fileExtension == "jpeg") {
        validFiles.push(file);
      }
    }
    return validFiles;
  }

  async upload(progessType, fileName) {
    const formData: FormData = new FormData();
    const files: Array<File> = this.filesToUpload;
    this[fileName] = files[0].name;
    this[progessType] = 10;
    for (let i = 0; i < files.length; i++) {
      if (this.filesAlreadyInProcess.length > i) {
        continue;
      }
      this.filesAlreadyInProcess.push(i);
      await this.uploadFile(files[i], i, progessType, fileName);
    }
  }

  uploadFile(file: File, fileIndex: number, progessType, fileName) {
    return new Promise((resolve, reject) => {
      this.dataEntryService.getURLForFileUpload(file.name, file.type).subscribe(
        (s3Response) => {
          const fileAlias = s3Response["data"][0]["file_alias"];
          this[progessType] = Math.floor(Math.random() * 90) + 10;
          const s3URL = s3Response["data"][0].url;
          this.uploadFileToS3(
            file,
            s3URL,
            fileAlias,
            fileIndex,
            progessType
          );
          resolve("success")
          console.log('file url', fileAlias)
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
    })
  }

  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    fileIndex: number,
    progressType: string = ''
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
            this[progressType] = 100;
            if (progressType == 'millionTiedProgress') {
              this.millionTiedFileUrl = fileAlias;
            } else if (progressType == 'nonMillionTiedProgress') {
              this.nonMillionTiedFileUrl = fileAlias;
            } else if (progressType == 'nonMillionUntiedProgress') {
              this.nonMillionUntiedFileUrl = fileAlias;
            }
            console.log('Progress -', progressType, this.millionTiedFileUrl, this.nonMillionTiedFileUrl, this.nonMillionUntiedFileUrl)
            this.checkDiff();
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
  checkDiff() {
    let preData = {
      million_tied:
      {
        pdfUrl: this.millionTiedFileUrl,
        pdfName: this.fileName_millionTied
      },
      nonmillion_tied:
      {
        pdfUrl: this.nonMillionTiedFileUrl,
        pdfName: this.fileName_nonMillionTied
      },
      nonmillion_untied:
      {
        pdfUrl: this.nonMillionUntiedFileUrl,
        pdfName: this.fileName_nonMillionUntied
      },
      isDraft: (this.millionTiedFileUrl != '' && this.nonMillionTiedFileUrl != '' && this.nonMillionUntiedFileUrl != '') ? false : true
    };

    let allFormData = JSON.parse(sessionStorage.getItem("allFormsPreData"))
    console.log('in grant all..', allFormData, preData);

    if (allFormData) {
      allFormData[0].stategtcertificates[0] = preData
      this._stateformsService.allFormsPreData.next(allFormData)
    }
  }
  onPreview() {
    let PreviewFiles = {
      design_year: "606aaf854dff55e6c075d219",
      million_tied:
      {
        pdfUrl: this.millionTiedFileUrl,
        pdfName: this.fileName_millionTied
      },
      nonmillion_tied:
      {
        pdfUrl: this.nonMillionTiedFileUrl,
        pdfName: this.fileName_nonMillionTied
      },
      nonmillion_untied:
      {
        pdfUrl: this.nonMillionUntiedFileUrl,
        pdfName: this.fileName_nonMillionUntied
      },
      isDraft: (this.millionTiedFileUrl != '' && this.nonMillionTiedFileUrl != '' && this.nonMillionUntiedFileUrl != '') ? false : true
    };
    const dialogRef = this.dialog.open(GtcertificatePreviewComponent,
      {
        data: PreviewFiles,
        maxHeight: "95%",
        width: '85vw',
        panelClass: 'no-padding-dialog'
      });
    console.log('dialog ref')
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  checkStatusAp(qusCheck) {

    sessionStorage.setItem("changeInGTC", "true")
    if (qusCheck == 'millionTied') {

      this.actionData1 = {
        status: "APPROVED",
        rejectReason: null
      }
      this.btnStyleA_A = true;
      this.btnStyleR_A = false;
    }
    if (qusCheck == 'nonMillionTied') {
      this.actionData2['rejectReason'] = null;
      this.actionData2 = {
        status: "APPROVED",
        rejectReason: null
      }
      this.btnStyleA_B = true;
      this.btnStyleR_B = false;
    }
    if (qusCheck == 'nonMillionUntied') {
      this.actionData3['rejectReason'] = null;
      this.actionData3 = {
        status: "APPROVED",
        rejectReason: null
      }
      this.btnStyleA_C = true;
      this.btnStyleR_C = false;
    }



    console.log('stateAction', this.stateActionA)
    //  this.actionValues.emit(this.actionData);
  }
  checkStatus(qusCheck) {

    sessionStorage.setItem("changeInGTC", "true")
    if (qusCheck == 'millionTied') {
      this.actionData1 = {
        status: this.stateActionA,
        rejectReason: this.rejectReasonA
      }
      this.btnStyleA_A = false;
      this.btnStyleR_A = true;
    }
    if (qusCheck == 'nonMillionTied') {
      this.actionData2 = {
        status: this.stateActionB,
        rejectReason: this.rejectReasonB
      }
      this.btnStyleA_B = false;
      this.btnStyleR_B = true;
    }
    if (qusCheck == 'nonMillionUntied') {
      this.actionData3 = {
        status: this.stateActionC,
        rejectReason: this.rejectReasonC
      }
      this.btnStyleA_C = false;
      this.btnStyleR_C = true;
    }
    console.log('stateAction', this.stateActionA)
    //  this.actionValues.emit(this.actionData);
  }

}

function observableThrowError(arg0: string) {
  throw new Error('Function not implemented.');
}

//pending - green and red ticks (will be done after master form api made)
//2 times dialog box on routing alert
