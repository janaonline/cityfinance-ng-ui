import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-state-all-preview',
  templateUrl: './state-all-preview.component.html',
  styleUrls: ['./state-all-preview.component.scss']
})
export class StateAllPreviewComponent implements OnInit {

  constructor() { }
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
  ngOnInit(): void {
  }
  openModal(){

  }

}
