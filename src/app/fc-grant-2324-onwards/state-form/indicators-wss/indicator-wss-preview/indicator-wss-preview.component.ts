import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { QuestionnaireService } from 'src/app/pages/questionnaires/service/questionnaire.service';
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");


@Component({
  selector: 'app-indicator-wss-preview',
  templateUrl: './indicator-wss-preview.component.html',
  styleUrls: ['./indicator-wss-preview.component.scss']
})
export class IndicatorWssPreviewComponent implements OnInit {

  styleForPDF = `<style>
  :root {
    font-size: 14px;
  }
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
font-weight: 700 !important;
font-size: 14px;
}

.form-h {
font-size: 18px;
font-weight: 700;
text-align: center;
}

.card {
    padding: 5px 10px;
    background-color: #EBF5F5;
}

  table tbody tr {
    border: 100px solid black;
  }
    table tbody tr:nth-child(even) {
    background: #d7ebeb;
  }
   table tbody tr:nth-child(even) td {
    border:1px solid #d7ebeb;
  }
  table thead th {
    font-size: 10px
  }

  table tbody td, li {
    font-size: 10px
  }


  .h-cls {
    display: none !important;
  }
  .col-sm-6 {
    width: 49% !important;
    display: inline-block !important;
  }
 
  .text-center {
    text-align: center !important;
  }
  .mb-3 {
    margin-bottom : 0.5rem !important;
  }
  .mt-3 {
    margin-top : 0.5rem !important;
  }

.w-f {
    background-color: #ade9e9;
    color: black;
    padding: .6rem 1rem;
    font-weight: 500;
    
}
.m-h {
  background-color: #059b9a;
  color: #fff;
  padding: .5rem 1rem;
  font-weight: 500;
}
.qus {
  font-size: 10px !important;
  margin-top : 0.5rem !important;
}
.ans {
  font-size: 10px !important;
  margin-top : 0.5rem !important;
}
.hd {
  font-size: 12px !important;
  font-weight: 500;
  margin-top : 1rem !important;
}
.tl {
  text-align: left !important;
  font-weight: 500;
  font-size: 12px !important;
}
.p-tb {
  border:1px solid #d7ebeb;
}
.wghtd_score {
  text-align: center !important;
}
.u-n {
  font-size: 12px !important;
  font-weight: 700 !important;
}
. @media print {
  .page-break {
      page-break-before: always;
  }
}
.formHeading {
  font-size: 13px !important;
  margin-bottom : 1rem !important;
}

  </style>`;
  constructor(
    private _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public preData: any,
    private _questionnaireService: QuestionnaireService,
  ) { 
    this.stateName = this.userData["stateName"];
    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
      this.stateName = sessionStorage.getItem('stateName');
    }
  }
  
  @ViewChild("indicators") _html: ElementRef;
  userData = JSON.parse(localStorage.getItem("userData"));
  stateName:string ='';
  stateId:string='';
  ngOnInit(): void {
    console.log('aaa aa preview', this.preData);
    
  }
  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    let downloadFileName =  "indicators_wss.pdf";
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(res.slice(0), "pdf", downloadFileName);
      },
      (err) => {
       swal('Error', "Failed to download,please try again", 'error')
      }
    );
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
  closeMat(){
    this._matDialog.closeAll();
  }
  keepOriginalOrder = (a, b) => b.key - a.key;
  checkScore(score) {
    
    let totalScore = Number(score);
    if (!totalScore || totalScore < 30) {
      return '0 %';
    } else if (totalScore <= 45) {
      return '60 %';
    } else if (totalScore <= 60) {
      return '75 %';
    } else if (totalScore <= 80) {
      return '90 %';
    } else {
      return '100 %';
    }
  }
}
