import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-state-all-preview',
  templateUrl: './state-all-preview.component.html',
  styleUrls: ['./state-all-preview.component.scss']
})
export class StateAllPreviewComponent implements OnInit {
  uasData;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog,
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
  ngOnInit() {
    console.log('previewData', this.data, this.data[0]);
    this.allFormRes = this.data[0]
     this.gtcError.data = this.data[0]['stategtcertificates'][0];
     this.pfmsStateError = this.data[0]['linkpfmsstates'][0];
     this.waterRejError = this.data[0]['waterrejenuvationrecyclings'][0];
     this.actionPlanError = this.data[0]['actionplans'][0];
     this.grantAllError = this.data[0]['grantdistributions'][0];

    //  for (let index = 0; index < this.waterRejError[0].uaData.length; index++) {
    //   this.waterRejError[0].uaData[index].name = this.uasData[this.waterRejError[0].uaData[index].ua].name;
    // }
     console.log('all single form',this.actionPlanError, this.data[0]['actionplans'][0]);
     this.gtcData = this.gtcError.data;
    this.pfmsStateData = this.pfmsStateError;
    this.waterRejData = this.waterRejError;
    this.actionPlanData = this.actionPlanError
    this.gAllData = this.grantAllError;
     //pfmsStateError


  }

  openModal(){

  }

}
