import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-four-slb-view',
  templateUrl: './four-slb-view.component.html',
  styleUrls: ['./four-slb-view.component.scss']
})
export class FourSlbViewComponent implements OnInit {

  constructor() { }
  
 @Input() data = {
    formName: '',
    formId: '',
    status: '',
    title: '',
    tables: [
      {
        tableType: 'four-slb',
        "rows": [
          {
            serviceLevelIndicators: 'Water supplied in litre per capita per day(lpcd)',
            benchmark: '135 LPCD',
            achieved2122: '135',
            target2223: '100',
            achieved2223: '135',
           // target2122: '135',
            target2324: '140',
            target2425: '111',
            wghtd_score: '101',
            key: "waterSuppliedPerDay"
          },
          {
            serviceLevelIndicators: '% of Non-revenue water',
            benchmark: '70 %',
            achieved2122: '5',
            target2223: '22',
            achieved2223: '123',
         //   target2122: '433',
            target2324: '455',
            target2425: '22',
            wghtd_score: '12',
            key: "reduc"
          },
          {
            serviceLevelIndicators: '% of households covered with sewerage/septage services',
            benchmark: '100 %',
            achieved2122: '',
            target2223: '6',
            achieved2223: '50',
          //  target2122: '43',
            target2324: '67',
            target2425: '54',
            wghtd_score: '5',
            key: "reduc1"
    
          },
          {
            serviceLevelIndicators: '% of households covered with piped water supply',
            benchmark: '100 %',
            achieved2122: '',
            target2223: '',
            achieved2223: '',
         //   target2122: '',
            target2324: '',
            target2425: '',
            wghtd_score: '8',
            key: "reduc2"
    
          }, 
        ],
        "columns": [
          {
            "key": "serviceLevelIndicators",
            "display_name": "Service Level Indicators",
            unit: 'LPCD'
            
          },
          {
            "key": "benchmark",
            "display_name": "Benchmark",
            unit: ''
          },
          {
            "key": "achieved2122",
            "display_name": "Achieved <br> 2021-22",
            unit: '%'
          },
          {
            "key": "target2223",
            "display_name": "Target <br> 2022-23",
            unit: '%'
          },
          {
            "key": "achieved2223",
            "display_name": "Achieved <br> 2022-23",
            unit: '%'
          },
          // {
          //   "key": "target2122",
          //   "display_name": "Target <br> 2021-22",
          //   unit: '%'
          // },
          {
            "key": "target2324",
            "display_name": "Target <br> 2023-24",
            unit: '%'
          },
          {
            "key": "target2425",
            "display_name": "Target <br> 2024-25",
            unit: '%'
          },
          {
            "key": "wghtd_score",
            "display_name": "Weighted Score",
            unit: ''
          },
    
        ]
      }
    ]
  }

  ngOnInit(): void {
    console.log('table data..', this.data);
  }

}
