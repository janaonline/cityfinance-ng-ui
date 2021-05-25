import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from "@angular/material/dialog";
import {
  Component,
  OnInit,
  Inject,
  Input,
  ElementRef,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter,
} from "@angular/core";
import { QuestionnaireService } from "../../../questionnaires/service/questionnaire.service";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { defaultDailogConfiuration } from "../../../questionnaires/state/configs/common.config";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { WaterSanitationService } from "../water-sanitation.service";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: "app-water-sanitation-preview",
  templateUrl: "./water-sanitation-preview.component.html",
  styleUrls: ["./water-sanitation-preview.component.scss"],
})
export class WaterSanitationPreviewComponent implements OnInit {
  @ViewChild("planPre") _html: ElementRef;
  showLoader;
  @Input()
  parentData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _questionnaireService: QuestionnaireService,
    private _matDialog: MatDialog,
    private WaterSanitationService: WaterSanitationService
  ) {}
  @ViewChild("template") template;
  @Output() change = new EventEmitter<any>();

  styleForPDF = `<style>
  .header {
    background-color: #047474;
    height: 100px;
    text-align: center;
}

.heading {
    color: #FFFFFF;
    font-size: 22px;
    margin-top: 3rem;
}

.card {
    padding: 5px 10px;
    // margin: 10px 40px;
    background-color: #EBF5F5;
}

.qus-h {
    margin-bottom: 2rem;
    margin-top: 2rem;
}

.ans-h {
    margin-bottom: 2rem;
    margin-top: 2rem;
}

.thHeader {
    background-color: #058e91;
    font-family: Roboto;
    color: #ffffff;
    font-size: 14px;
    text-decoration: none;
  }
  
  .table > tbody > tr > td,
  .table > tbody > tr > th,
  .table > tfoot > tr > td,
  .table > tfoot > tr > th,
  .table > thead > tr > td,
  .table > thead > tr > th {
    vertical-align: inherit;
    text-align: center;
    padding: 8px 2px;
  }
  
  .custom-position {
    td {
      position: relative;
    }
  }
  
  </style>`;
  clicked = false;
  errMessage = "";

  clickedDownloadAsPDF(template) {
    let changeHappen = sessionStorage.getItem("changeInPlans");
    this.clicked = true;
    this.change.emit(this.clicked);
    //use dialog instead of Modal
    if (changeHappen === "true") {
      this.openDialog(template);
    } else {
      this.downloadAsPDF();
    }
    // this.openModal(template)
  }
  dialogRef;
  openDialog(template) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
  }

  ngOnInit(): void {
    console.log(this.data);
    if (this.parentData) {
      this.data = this.parentData;
    }
  }

  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    this.showLoader = true;
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(res.slice(0), "pdf", "water-sanitation.pdf");
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

  async proceed(uploadedFiles) {
    this._matDialog.closeAll();
    console.log("Check this value", this.data);
    sessionStorage.setItem("changeInPlans", "false");
    this.WaterSanitationService.sendRequest(this.data).subscribe(
      (res) => {
        console.log(res);
        swal("Record submitted successfully!");
      },
      (error) => {
        this.errMessage = error.message;
        console.log(error, this.errMessage);
      }
    );

    this.downloadAsPDF();
  }
  alertClose() {
    this.stay();
  }
  stay() {
    this.dialogRef.close();
  }
}
