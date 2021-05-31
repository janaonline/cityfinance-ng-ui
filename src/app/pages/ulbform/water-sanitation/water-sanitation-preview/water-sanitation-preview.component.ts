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
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { QuestionnaireService } from "../../../questionnaires/service/questionnaire.service";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { defaultDailogConfiuration } from "../../../questionnaires/state/configs/common.config";
import { WaterSanitationService } from "../water-sanitation.service";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
import { WaterSanitationComponent } from "../water-sanitation.component";
import { Router } from "@angular/router";
import { UlbformService } from "../../ulbform.service";

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
  @Input()
  changeFromOutSide: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _router: Router,
    private _questionnaireService: QuestionnaireService,
    private _matDialog: MatDialog,
    private WaterSanitationService: WaterSanitationService,
    public _ulbformService: UlbformService
  ) {}
  @ViewChild("template") template;
  @Output() change = new EventEmitter<any>();
  dialogRef;
  previewStatus;
  totalStatus;

  styleForPDF = `<style>
  
  .card {
    border: 1px #00000029;
    margin-left: 20px;
    box-shadow: 1px 1px 1px 3px #00000029;
  }

  .thHeader {
    background-color: #058e91;
    font-family: Roboto;
    color: #ffffff;
    font-size: 1px;
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
  }
  
  .custom-position {
    td {
      position: relative;
    }
  }
  
  .custom-position {
    input {
      position: relative;
      width: 80%;
      height: 4ch;
      text-align: center;
    }
  }
  
  .custom-position {
    select {
      position: relative;
    }
  }
  
  .custom-position {
    textarea {
      height: 2pc;
      vertical-align: bottom;
      margin-right: 1pc;
    }
  }
  .df{
    display:none
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
  openDialog(template) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
  }

  ngOnInit(): void {
    console.log(this.data);

    this.WaterSanitationService.OpenModalTrigger.subscribe((change) => {
      console.log("111");
      if (this.changeFromOutSide) {
        this.openDialog(this.template);
      }
    });

    if (this.parentData) {
      this.data = this.parentData;
    }
    this.previewStatuSet();
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
    // this._matDialog.closeAll();
    this.dialogRef.close()
    console.log("Check this value", this.data);
    sessionStorage.setItem("changeInPlans", "false");
    await this.saveData(this.data);
    if (!this.changeFromOutSide) this.downloadAsPDF();
    else this._ulbformService.initiateDownload.next(true)
  }
  alertClose() {
    this.stay();
  }
  stay() {
    this.dialogRef.close();
  }

  async saveData(data) {
    const plans = new WaterSanitationComponent(
      this._router,
      this.WaterSanitationService,
      this._matDialog,
      this._ulbformService
    );
    plans.body.plans = data;
    plans.testForDraft();
    await plans.postsDataCall(plans.body);
  }

  previewStatuSet() {
    if (this.data["isDraft"] == null) {
      this.previewStatus = "Not Started";
    } else if (this.data["isDraft"]) {
      this.previewStatus = "In Progress";
    } else {
      this.previewStatus = "Completed";
    }

    if (!this.parentData) {
      this.totalStatus = sessionStorage.getItem("masterForm");
      if (this.totalStatus) {
        this.totalStatus = JSON.parse(this.totalStatus);
        if (this.totalStatus["isSubmit"]) {
          this.totalStatus = "Completed but Not Submitted";
        } else {
          this.totalStatus = "In Progress";
        }
      } else {
        this.totalStatus = "Not Started";
      }
    }
  }
}
