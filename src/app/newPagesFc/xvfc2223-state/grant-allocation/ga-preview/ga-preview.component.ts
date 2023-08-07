import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { QuestionnaireService } from "src/app/pages/questionnaires/service/questionnaire.service";
import { defaultDailogConfiuration } from "src/app/pages/questionnaires/state/configs/common.config";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
import { SweetAlert } from "sweetalert/typings/core";
import { State2223Service } from "../../state-services/state2223.service";
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: "app-ga-preview",
  templateUrl: "./ga-preview.component.html",
  styleUrls: ["./ga-preview.component.scss"],
})
export class GaPreviewComponent implements OnInit {
  constructor(
    private _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _questionnaireService: QuestionnaireService,
    private stateService: State2223Service,
    private newCommonService: NewCommonService
  ) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.stateName = this.userData["stateName"];
    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
      this.stateName = sessionStorage.getItem('stateName');
    }
    this.years = JSON.parse(localStorage.getItem("Years"));
  }
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
.l-h {
  font-size: 12px !important;
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
      .na-cls {
        text-decoration: none;
        color: black;
        pointer-events: none;
    }
.sub-h {
  margin-top: .5rem !important;
}
    </style>`;
  @ViewChild("gtcpre") _html: ElementRef;
  // @ViewChild("annualPreview") _html: ElementRef;
  @ViewChild("templateSave") template;
  dialogRef;
  download;
  showLoader;
  stateName = "";
  fileUrl = "";
  fileName = "";
  formStatus = "";
  userData;
  years;
  stateId;

  ngOnInit(): void {}
  clickedDownloadAsPDF(template) {
    this.download = true;
    // this.downloadAsPDF();
    let changeHappen;

    changeHappen = sessionStorage.getItem("changeInGta");
    console.log(changeHappen);
    if (changeHappen === "true") {
      this.openDialog(template);
    } else {
      this.downloadAsPDF();
    }
  }
  openDialog(template) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
  }
  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    this.showLoader = true;
    let downloadFileName = `${this.stateName}_grant-allocation.pdf`;
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(res.slice(0), "pdf", downloadFileName);
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
  closeMat() {
    this._matDialog.closeAll();
  }
  async proceed(uploadedFiles) {
    this.dialogRef.close();
    this._matDialog.closeAll();
    await this.saveFile();
    await this.downloadAsPDF();
  }

  saveFile() {
    let data = JSON.parse(sessionStorage.getItem("gtaIjData"));
    console.log("i, j data", data);
    this.submit(data?.i, data?.j);
  }
  async submit(i, j) {
    // let postBody = { ...this.data[i]?.quesArray[j] };

    let postBody = {
      design_year: this.data[i].quesArray[j]?.year,
      url: this.data[i].quesArray[j]["url"],
      fileName: this.data[i].quesArray[j]["fileName"],
      answer: true,
      isDraft: false,
      type: this.data[i].quesArray[j]?.type,
      installment: this.data[i].quesArray[j]?.installment,
    };
    if (
      this.data[i].quesArray[j].fileName != "" ||
      this.data[i].quesArray[j].url != ""
    ) {
      console.log("111", postBody);
      return new Promise((resolve, rej) => {
        this.stateService.postGTAFile(postBody).subscribe(
          (res: any) => {
            swal("Saved", "File saved successfully.", "success");
            sessionStorage.setItem("changeInGta", "false");
            console.log("GTA file response", res);
            this.data[i].quesArray[j].isDisableQues = true;
            this.data[i].quesArray[j].status = "PENDING";
            this.data[i].quesArray[j].isDraft = false;
            this.data[i].quesArray[j].rejectReason = null;
            if (this.data[i]?.quesArray[j + 1]?.isDisableQues) {
              this.data[i].quesArray[j + 1].isDisableQues = false;
            }
            this.newCommonService.setStateFormStatus2223.next(true);
            resolve("sucess");
          },
          (error) => {
            swal("Error", `${error?.message}`, "error");
            resolve(error);
          }
        );
      });
    } else {
      swal("Error", "Please select valid file", "error");
      sessionStorage.setItem("changeInGta", "false");
    }
  }
  alertClose() {
    this.stay();
  }

  stay() {
    this.dialogRef.close();
  }
}
