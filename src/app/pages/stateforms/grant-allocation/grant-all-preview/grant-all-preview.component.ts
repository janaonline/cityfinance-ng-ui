import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  TemplateRef,
  Input,
  OnDestroy,
} from "@angular/core";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from "@angular/material/dialog";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { defaultDailogConfiuration } from "../../../questionnaires/state/configs/common.config";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { QuestionnaireService } from "src/app/pages/questionnaires/service/questionnaire.service";
import { GAservicesService } from "../g-aservices.service";
import { StateformsService } from "../../stateforms.service";
import { USER_TYPE } from "src/app/models/user/userType";
import { UserUtility } from "src/app/util/user/user";

@Component({
  selector: "app-grant-all-preview",
  templateUrl: "./grant-all-preview.component.html",
  styleUrls: ["./grant-all-preview.component.scss"],
})
export class GrantAllPreviewComponent implements OnInit, OnDestroy{
  @Input() parentData: any;
  @Input()
  changeFromOutSide: any;
  @ViewChild("gtallocation") _html: ElementRef;
  @ViewChild("template") template;
  showLoader;
  dialogRef;
  status;


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
.a-h{
  margin-bottom: .5rem;
  margin-left: 1.2rem;
  margin-top: .5rem;
  font-size: 10px !important;
}
.m-l {
margin-left: 1.2rem !important;
}
.m-l-na {
  margin-left: 1.2rem !important;
}

.h-cls{
      display: none;
    }
.form-status {
      font-size: 10px;
      margin-top: 10px;
    }

  </style>`;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog,
    private _questionnaireService: QuestionnaireService,
    private _gAservices: GAservicesService,
    public state_service : StateformsService,
  ) {}
  stateName;
 // ulbName;
  subParentForModal;
  USER_TYPES = USER_TYPE;
  userDetails = new UserUtility().getLoggedInUserDetails();
  ngOnInit() {
    console.log("previewData", this.data);
    let userData = JSON.parse(localStorage.getItem("userData"));
  //  this.ulbName = userData["name"];
    if(this.userDetails.role == USER_TYPE.STATE){
      this.stateName = userData.stateName;
  }else {
      this.stateName = sessionStorage.getItem('stateName');
  }

    this.subParentForModal = this._gAservices.OpenModalTrigger.subscribe(
      (change) => {
        if (this.changeFromOutSide) {
          this.openModal(this.template);
        }
      }
    );
    if (this.parentData) {
      this.data = this.parentData;
    }
    this.setStatus();
  }
  ngOnDestroy(): void {
    if (this.subParentForModal) this.subParentForModal.unsubscribe();
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

  openModal(template: TemplateRef<any>) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      console.log("result", result);
    });
  }

  stay() {
    this.dialogRef.close(true);
  }
  alertClose() {
    this.dialogRef.close(true);
  }

  proceed(uploadedFiles) {
    this._matDialog.closeAll();
    this.postsDataCall(this.data);
    // this.downloadAsPDF();
    sessionStorage.setItem("ChangeInGrantAllocation", "false");
    if (this.changeFromOutSide) {
      this.state_service.initiateDownload.next(true);
    } else this.downloadAsPDF();
    return;
  }

  clickedDownloadAsPDF() {
    let change = sessionStorage.getItem("ChangeInGrantAllocation");
    if (change == "true") {
      this.openModal(this.template);
    } else {
      this.downloadAsPDF();
    }
  }

  postsDataCall(data) {
    this._gAservices.sendRequest(data).subscribe(
      (res) => {
        console.log(res);
        sessionStorage.setItem("ChangeInGrantAllocation", "false");
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  setStatus() {
    if (this.data.isDraft == null) {
      this.status = "Not Started";
    } else if (this.data.isDraft) {
      this.status = "In Progress";
    } else if (!this.data.isDraft) {
      this.status = "Completed but Not Submitted";
    }
  }
}
