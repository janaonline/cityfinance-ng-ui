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
  OnDestroy,
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
export class WaterSanitationPreviewComponent implements OnInit, OnDestroy {
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
  ) { }
  @ViewChild("template") template;
  @Output() change = new EventEmitter<any>();
  dialogRef;
  previewStatus;
  totalStatus;
  subParentForModal
  styleForPDF = `<style>
  :root {
    font-size: 14px;
  }
    h2 {
      font-size: 1.25rem;
    }

    h3 {
      font-size: .9rem;
    }

     h4 {
      font-size: .7rem;
    }
       h5 {
      font-size: .5rem;
    }

    table thead th {
      font-size: 10px;
    }

    table tbody td, li {
      font-size: 10px;
    }

    .td-width {
      width: 16.5%;
    }

    button {
      display: none;
    }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
  }

  .form-status {
    font-size: 10px;
    margin-top: 10px;


  }
  .header-p {
    background-color: #047474;
    height: 85px;
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

.card {
    margin-top: 10px !important;
    padding: 5px 10px;
    background-color: #EBF5F5;
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
  .thHeader {
    background-color: #E9E9E9;
    color: #047474;
    font-weight: normal;
  }

  .df {
    display:none
  }
  </style>`;
  clicked = false;
  errMessage = "";
  ulbName ='';
  stateName = '';

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
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.ulbName = userData['name'];
    this.stateName = userData['stateName'];

    this.subParentForModal = this.WaterSanitationService.OpenModalTrigger.subscribe((change) => {
      if (this.changeFromOutSide) {
        this.openDialog(this.template);
      }
    });

    if (this.parentData) {
      this.data = this.parentData;
    }
    this.previewStatuSet();
  }

  ngOnDestroy(): void {
    this.subParentForModal.unsubscribe()
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
    this.dialogRef.close();
    console.log("Check this value", this.data);
    sessionStorage.setItem("changeInPlans", "false");
    await this.saveData(this.data);
    if (!this.changeFromOutSide) this.downloadAsPDF();
    else this._ulbformService.initiateDownload.next(true);
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
    plans.testForDraft(data);
    await plans.postsDataCall(plans.body);
  }
  formStatusCheck = ''
  statusArray = [
    'Not Started',
    'Under Review By State',
    'Completed',
    'In Progress'
  ]

  previewStatuSet() {
    console.log(this.data)
    let allFormsData = JSON.parse(sessionStorage.getItem("allFormsData"))
    if (allFormsData['plansData'].length > 0) {
      let change = sessionStorage.getItem("changeInPlans");
      if (change == "true") {
        if (this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[3]
        } else if (!this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[2]
        }
      } else if (change == "false") {
        if (this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[3]
        } else if (!this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[2]
        }

      }
    } else {
      let change = sessionStorage.getItem("changeInPlans");
      if (change == "true") {
        if (this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[3]
        } else if (!this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[2]
        }
      } else if (change == "false") {
        this.formStatusCheck = this.statusArray[0]

      }

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
