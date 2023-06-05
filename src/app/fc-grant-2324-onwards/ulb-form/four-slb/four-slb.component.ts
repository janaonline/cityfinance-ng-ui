import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-four-slb',
  templateUrl: './four-slb.component.html',
  styleUrls: ['./four-slb.component.scss']
})
export class FourSlbComponent implements OnInit {

  constructor() {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuULB"));
   }
  nextRouter;
  backRouter;
  sideMenuItem;
  response  = {
    formName: 'SLBs for Water Supply and Sanitation',
    formId: '',
    status: '',
    title: '',
    tableType: 'four-slb',
    tables: [
      {
        "rows": [
          {
            serviceLevelIndicators: 'Water supplied in litre per capita per day(lpcd)',
            benchmark: '135 LPCD',
            achieved2122: '',
            target2223: '',
            achieved2223: '',
            target2122: '',
            target2324: '',
            target2425: '',
            wghtd_score: ''
          },
          {
            serviceLevelIndicators: '% of Non-revenue water',
            benchmark: '70 %',
            achieved2122: '',
            target2223: '',
            achieved2223: '',
            target2122: '',
            target2324: '',
            target2425: '',
            wghtd_score: ''
    
          },
          {
            serviceLevelIndicators: '% of households covered with sewerage/septage services',
            benchmark: '100 %',
            achieved2122: '',
            target2223: '',
            achieved2223: '',
            target2122: '',
            target2324: '',
            target2425: '',
            wghtd_score: ''
    
          },
          {
            serviceLevelIndicators: '% of households covered with piped water supply',
            benchmark: '100 %',
            achieved2122: '',
            target2223: '',
            achieved2223: '',
            target2122: '',
            target2324: '',
            target2425: '',
            wghtd_score: ''
    
          }, 
        ],
        "columns": [
          {
            "key": "serviceLevelIndicators",
            "display_name": "Service Level Indicators"
          },
          {
            "key": "benchmark",
            "display_name": "Benchmark"
          },
          {
            "key": "target2122",
            "display_name": "Target <br> 2021-22"
          },
          {
            "key": "target2223",
            "display_name": "Target <br> 2022-23"
          },
          {
            "key": "target2324",
            "display_name": "Target <br> 2023-24"
          },
          {
            "key": "target2425",
            "display_name": "Target <br> 2024-25"
          },
          {
            "key": "achieved2122",
            "display_name": "Achieved <br> 2020-21"
          },
       
          {
            "key": "achieved2223",
            "display_name": "Achieved <br> 2021-22"
          },
          {
            "key": "actual2223",
            "display_name": "Actual Indicator <br> 2022-23"
          },
          {
            "key": "mou",
            "display_name": "View MoU"
          },
          {
            "key": "wghtd_score",
            "display_name": "Weighted Score"
          },
    
        ]
      }
    ]
  }
  ngOnInit(): void {
    this.setRouter();
  }

  setRouter() {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuULB"));
    for (const key in this.sideMenuItem) {
      this.sideMenuItem[key].forEach((element) => {
        if (element?.name == "SLBs for Water Supply and Sanitation") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
    }
  }

}
