import { Component, ElementRef, Inject, OnInit, ViewChild, TemplateRef, Input, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { defaultDailogConfiuration } from '../../../questionnaires/state/configs/common.config';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { QuestionnaireService } from 'src/app/pages/questionnaires/service/questionnaire.service';
import { GTCertificateService } from '../gtcertificate.service'
import { SweetAlert } from "sweetalert/typings/core";
import { StateformsService } from '../../stateforms.service';
import { USER_TYPE } from 'src/app/models/user/userType';
import { UserUtility } from 'src/app/util/user/user';
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-gtcertificate-preview',
  templateUrl: './gtcertificate-preview.component.html',
  styleUrls: ['./gtcertificate-preview.component.scss']
})
export class GtcertificatePreviewComponent implements OnInit, OnDestroy {
  @Input() parentData: any;
  @Input()
  changeFromOutSide: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog,
    private _questionnaireService: QuestionnaireService,
    private gtcService: GTCertificateService,
    public stateformsService: StateformsService


  ) { }
  @ViewChild("gtcpre") _html: ElementRef;
  @ViewChild("template") template;
  showLoader;
  styleForPDF = `<style>
  .header-p {
    background-color: #047474;
    height: 75px;
    text-align: center;
}
.heading-p {
    color: #FFFFFF;
    font-size: 18px;
    padding-top: 1rem !important;
    font-weight: 700;

}
.sub-h {
  font-weight: 600 !important;
  font-size: 14px;
}

.form-h {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}
.m-d{
  margin-top: 10px !important;
}
.form-status {
  font-size: 10px;
}
  .card {
      margin-top: 10px !important;
      padding: 5px 10px;
      background-color: #EBF5F5;
  }

  .qus-h {
      margin-bottom: .5rem;
      margin-top: .5rem;
      font-size: 10px !important;
  }

  .ans-h {
      margin-bottom: .5rem;
      margin-left: 1.2rem;
      margin-top: .5rem;
      font-size: 10px !important;
  }
.m-r{
  margin-bottom: 1.5rem !important;
}

 .h-cls{
        display: none;
      }
 .form-status {
        font-size: 10px;
        margin-top: 10px;
      }
      td, th{
        word-break: break-all;
        font-size: 9px !important;
        padding: 5px 1px !important;
      }
      .na-cls {
        text-decoration: none;
        color: black;
        pointer-events: none;
    }

    </style>`
  stateName;
  status;
  formStatusCheck = ''
  statusArray = [
    'Not Started',
    'Under Review By State',
    'Completed',
    'In Progress'
  ]
  subParentForModal;
  USER_TYPES = USER_TYPE;
  userDetails = new UserUtility().getLoggedInUserDetails();
  ngOnInit() {
    console.log('preData', this.data)
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (this.userDetails.role == USER_TYPE.STATE) {
      this.stateName = userData.stateName;
    } else {
      this.stateName = sessionStorage.getItem('stateName');
    }
    this.subParentForModal = this.gtcService.OpenModalTrigger.subscribe(
      (change) => {
        if (this.changeFromOutSide) {
          this.openModal(this.template);
        }
      }
    );
    this.previewStatusSet();
    if (this.parentData) {
      this.data = this.parentData;
    }
  }
  ngOnDestroy(): void {
    if (this.subParentForModal) this.subParentForModal.unsubscribe();
  }
  previewStatusSet() {

    console.log('prevData status', this.data)
    let GTCData = JSON.parse(sessionStorage.getItem("StateGTC"))
    console.log(GTCData)
    if (GTCData['data']) {
      console.log('1')
      let change = sessionStorage.getItem("changeInGTC");
      if (change == "true") {
        if (this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[3]
        } else if (!this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[2]
        }
      } else if (change == "false") {
        console.log('2')
        if (this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[3]
        } else if (!this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[2]
        }

      }
    } else {
      console.log('3')
      let change = sessionStorage.getItem("changeInGTC");
      if (change == "true") {
        if (this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[3]
        } else if (!this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[2]
        }
      } else if (change == "false") {
        console.log('4')
        this.formStatusCheck = this.statusArray[0]

      }

    }


  }

  clickedDownloadAsPDF() {
    let change = sessionStorage.getItem("changeInGTC");
    if (change == "true") {
      this.openModal(this.template)
    } else {
      this.downloadAsPDF();
    }
  }

  close() {
    this._matDialog.closeAll();

  }

  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    this.showLoader = true;
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(res.slice(0), "pdf", "gtcertificate.pdf");
        this.showLoader = false;
      },
      (err) => {
        this.showLoader = false;
        this.onGettingError(
          ' "Failed to download PDF. Please try after sometime."'
        );
      }
    );
  }
  private onGettingError(message: string) {
    const option = { ...defaultDailogConfiuration };
    option.buttons.cancel.text = "OK";
    option.message = message;
    this.showLoader = false;
    this._matDialog.open(DialogComponent, { data: option });
  }
  private downloadFile(blob: any, type: string, filename: string): string {
    const url = window.URL.createObjectURL(blob); // <-- work with blob directly

    // create hidden dom element (so it works in all browsers)
    const a = document.createElement("a");
    a.setAttribute("style", "display:none;");
    document.body.appendChild(a);

    // create file, attach to hidden element and open hidden element
    a.href = url;
    a.download = filename;
    a.click();
    return url;
  }
  clicked = 0
  routerNavigate = null
  dialogRef
  openModal(template: TemplateRef<any>) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
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
    if (this.userDetails['role'] == USER_TYPE.STATE) {
      await this._matDialog.closeAll();

      this.postsDataCall(uploadedFiles);
      sessionStorage.setItem("changeInGTC", "false")
      if (this.changeFromOutSide) {
        this.stateformsService.initiateDownload.next(true);
      } else this.downloadAsPDF();
      return;
    } else if (this.userDetails['role'] == USER_TYPE.MoHUA) {
      await this._matDialog.closeAll();
      this.saveStateAction();
      sessionStorage.setItem("changeInGTC", "false")
      if (this.changeFromOutSide) {
        this.stateformsService.initiateDownload.next(true);
      } else this.downloadAsPDF();
      return;
    }

  }
  err = ''
  saveStateAction() {
    this.gtcService.postStateAction(this.data).subscribe((res) => {
      sessionStorage.setItem("changeInGTC", "false")
      swal('Record Submitted Successfully!')
    }, (err) => {
      swal(`Error- ${err.message}`)
    })
  }
  postsDataCall(uploadedFiles) {
    return new Promise((resolve, reject) => {

      this.gtcService.sendRequest(this.data)
        .subscribe(async (res) => {
          // const status = JSON.parse(sessionStorage.getItem("allStatus"));
          // status.isCompleted = res['data']["isCompleted"];
          // this._stateformsService.allStatus.next(status);
          sessionStorage.setItem("changeInGTC", "false")
          swal('Record Submitted Successfully!')
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

  alertClose() {
    this.stay();
  }


}





