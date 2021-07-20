import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { QuestionnaireService } from '../../questionnaires/service/questionnaire.service';
import { defaultDailogConfiuration } from '../../questionnaires/ulb/configs/common.config';

@Component({
  selector: 'app-state-all-preview',
  templateUrl: './state-all-preview.component.html',
  styleUrls: ['./state-all-preview.component.scss']
})
export class StateAllPreviewComponent implements OnInit {
  uasData;
  @ViewChild("statePre") _html: ElementRef;
 // @ViewChild("template") template;
  showLoader;
  dialogRef;

  styleForPDF = `<style>
  .b-hide {
    display: none;
  }
  .m-h {
    font-size: 20px;
    margin-top: 5px;
    font-weight: 700;
}
.m-h-mr {
  padding-bottom: 1rem !important;
}
.d-m {
  padding-top: 1rem !important;
}
.st-d {
  margin-top: 7px !important;
  margin-bottom: 7px !important;
}
.sub-m-h{
    font-size: 17px;
    font-weight: 600;
    text-align: center;
}
.header-u-p {
  background-color: #047474;
  text-align: center;
  height: 60px;
}

.heading-u-p {
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 700;
  padding-top: 1.3rem !important;
}
.slb-pd-t {
  background-color: #047474;
  text-align: center;
  height: 60px;
}
.slb-h{
  font-size: 18px;
  padding-top: 1.3rem !important;
  font-weight: 700;
}
.card {
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

.h-cls{
      display: none;
    }

    .qus-h-an {
      margin-bottom: .5rem;
      margin-top: 1rem;
      font-size: 10px;
  }

  .ans-h-an {
      margin-bottom: .5rem;
      margin-top: .5rem;
      font-size: 10px;
  }
  @media print {
    .page-break {
        page-break-before: always;
    }
  }
  .h-font {
    display: inline-block;
    font-size: 12px !important;
  }
  .f-r {
    margin-left: 30px;
  }
  .ans-h-an{
    margin-left : .5rem !important;
  }
  .ans-h-na{
    margin-left : 1rem !important;
    margin-bottom: .5rem;
    margin-top: .5rem;
    font-size: 10px !important;
  }
  .hi{
    display:none
  }
  .qus-h-an-ex {
    margin-bottom: .5rem;
    margin-top: .5rem;
    font-size: 10px;
    margin-left : .5rem !important;
  }
  .ans-h-an-b {
      margin-bottom: .5rem;
      margin-top: .5rem;
      margin-left : 1rem !important;
      font-size: 10px;
  }
  .form-status {
    font-size: 10px;
    margin-top: 10px;
  }

.m-h{
  text-align: center;
}
.cont {
  width: 794px;
  background-color: #FFFFFF;
  display: inline-block;
}

.container {
  padding-left: 0;
  padding-right: 0;
}
.header-p{
  word-break: break-all;
}

td, th{
  word-break: break-all;
  font-size: 9px !important;
  padding: 5px 1px !important;
}


.thHeader {
  background-color: #E9E9E9;
  color: #047474;
  font-size: 15px;
  font-weight: normal;
}
th {
  font-weight: normal;
  vertical-align: middle;
  text-align: center;
}
.table>tbody>tr>td,
.table>tbody>tr>th,
.table>tfoot>tr>td,
.table>tfoot>tr>th,
.table>thead>tr>td,
.table>thead>tr>th {
  vertical-align: middle;
  padding: 10px 6px;
}
.bor-in-l {
  word-break: break-all;
}
.tableFooterDiv {
  background-color: #E7E7E7;
  color: #000000;
  font-size: 16px;
}
.f-d-n {
  background-color: #CFCFCF;
  width: 235px;
  height: 35px;
  padding: 7px 8px;
  height: 15px !important;
}
.d-none {
  display: none;
}
label{
  font-size: 9px !important;
}

@media print {
  .page-break {page-break-before: always;}
}
:root {
  font-size: 14px;
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
    font-size: .5rem
  }

  table tbody td, li {
    font-size: .5rem
  }

  .td-width {
    width: 25%;
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

.fa-times {
  display: none;
}
.qus-slb {
  margin-left: 2%;
  font-weight: normal;
  font-size: 12px;
}

.ans-slb {
  margin-left: 1rem;
  font-weight: normal;
  font-size: 12px;
}
.qus-h-an {
  margin-bottom: .5rem;
  margin-top: 1rem;
  font-size: 10px;
}

.ans-h-an {
  margin-bottom: .5rem;
  margin-top: .5rem;
  font-size: 10px;
}
@media print {
.page-break {
    page-break-before: always;
}
}
.h-font {
display: inline-block;
font-size: 12px !important;
}
.f-r {
margin-left: 30px;
}
.ans-h-an{
margin-left : .5rem !important;
}
.hi{
display:none
}
.qus-h-an-ex {
margin-bottom: .5rem;
margin-top: .5rem;
font-size: 10px;
margin-left : .5rem !important;
}
.ans-h-an-b {
  margin-bottom: .5rem;
  margin-top: .5rem;
  margin-left : 1rem !important;
  font-size: 10px;
}

.ans-slb-a {
  margin-left: 5.8rem;
  font-weight: normal !important;
  font-size: 10px !important;
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

.fa-times {
  display: none;
}
.qus-slb {
  margin-left: 2%;
  font-weight: normal;
  font-size: 12px;
}

#donwloadButton{
display: none;
}
h5{
display: inline-flex;
}
.d-i{
display: inline-flex;
width : 33.33%;
}
.mr-l{
margin-left: 22%;
}
  </style>`;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog,
    private _questionnaireService: QuestionnaireService,
    private modalService: BsModalService
  ) {
    this.uasData = JSON.parse(sessionStorage.getItem("UasList"));

  }
  gtcData = null;
  pfmsStateData = null;
  stateSlbData = null;
  waterRejData = null;
  actionPlanData = null;
  gAllData = null;
  changeTrigger: any = {
    changeInGtc: false,
    changeInpfmsStateData: false,
    changeInStateSlb: false,
    changeInWaterRejData: false,
    changeInActionPlanData: false,
    changeIngAllData: false,
  };
  userData = JSON.parse(localStorage.getItem("userData"));

  gtcError = {
    data: {
      million_tied : {
        pdfName : null,
        pdfUrl : null,
        _id : null
      },
      nonmillion_tied : {
        pdfName : null,
        pdfUrl : null,
        _id : null
      },
      nonmillion_untied : {
        pdfName : null,
        pdfUrl : null,
        _id : null
      }
    }
  };

  pfmsStateError : {
      data : {
        excel : {
          url : null,
          name : null,
        }
      }
  };
  stateSlbError : {
    data: [
      waterSuppliedPerDay : {
        baseline : {
          2021 : null
        },
        target : {
          2122: null
          2223: null
          2324: null
          2425 : null
        },
      },
      reduction : {
        baseline : {
          2021 : null
        },
        target : {
          2122: null
          2223: null
          2324: null
          2425 : null
        },
      },
      houseHoldCoveredWithSewerage : {
        baseline : {
          2021 : null
        },
        target : {
          2122: null
          2223: null
          2324: null
          2425 : null
        },
      },
      houseHoldCoveredPipedSupply : {
        baseline : {
          2021 : null
        },
        target : {
          2122: null
          2223: null
          2324: null
          2425 : null
        },
      },
      totalCompletedUlb : null,
      totalPendingUlb : null,
      totalULBsInUA : null,
      uaName : null
    ]
  };

  waterRejError : {
         data : {
           uaData : [],
         }
  };
  actionPlanError : {
    data : {
      uaData : [],
    }
};
grantAllError : {
  data : {
      answer : null,
      fileName : null,
      url : null
  }
};
allFormRes = {};
account =''
fileName ='';
gtFileUrl = '';

  ngOnInit() {
    console.log('previewData', this.data, this.data[0]);
    this.allFormRes = this.data[0]
     this.gtcError.data = this.data[0]['stategtcertificates'][0];
     this.pfmsStateError = this.data[0]['linkpfmsstates'][0];
     this.waterRejError = this.data[0]['waterrejenuvationrecyclings'][0];
     this.actionPlanError = this.data[0]['actionplans'][0];
     this.grantAllError = this.data[0]['grantdistributions'][0];
     console.log('g-all-data', this.grantAllError, this.data[0]['grantdistributions'][0]);


    //  for (let index = 0; index < this.waterRejError[0].uaData.length; index++) {
    //   this.waterRejError[0].uaData[index].name = this.uasData[this.waterRejError[0].uaData[index].ua].name;
    // }

     this.gtcData = this.gtcError.data;
    this.pfmsStateData = this.pfmsStateError;
    this.waterRejData = this.waterRejError;
    this.actionPlanData = this.actionPlanError
    this.gAllData = this.grantAllError;
    console.log('all single form', this.gAllData);
    if (this.gAllData.answer == true) {
      console.log('dsvfdbad', this.gAllData.answer);

      this.gAllData.answer = "yes";
     // this.fileName = this.gAllData.fileName;
     // this.gtFileUrl = this.gAllData.url;
    } else if (this.gAllData.answer == false) {
      this.account = "no";
    }
     //pfmsStateError


  }

  openModal(){
  this.downloadAsPdf();
  }
  downloadAsPdf(){
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    this.showLoader = true;
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(res.slice(0), "pdf", "allStateForm.pdf");
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

  }


