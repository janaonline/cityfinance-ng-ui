import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicators-wss',
  templateUrl: './indicators-wss.component.html',
  styleUrls: ['./indicators-wss.component.scss']
})
export class IndicatorsWssComponent implements OnInit {

  constructor() { }
  isApiInProgress:boolean = false;
  response = {
    formName: 'Indicators for Water Supply and Sanitation',
    formId: '',
    status: '',
    statusId: '',
    info: 'The below tables denotes the aggregate indicators and targets of ULBs in respective UA',
    previousYrMsg: '',

  }

  performanceAssesmentTable = {
    name: '',
    info: '',
    id: '',
    tableType: 'lineItem-highlited',
    tables: [
      {
        rows: [
          {
            "marks" : '% of Recommended tied grant',
            "less30" : '0%',
            "30To45" : '60%',
            "45To60": '75%',
            "60To80": "90%",
            "greater80" : '100%'
          }
        ],
        columns: [
          {
              "key": "marks",
              "display_name": "Marks"
          },
          {
            "key": "less30",
            "display_name": "< 30"
          },
          {
            "key": "30To45",
            "display_name": "< 30 and <=45"
          },
          {
            "key": "45To60",
            "display_name": "> 45 and <=60"
          },
          {
            "key":  "60To80",
            "display_name": "> 60 and <=80"
          },
          {
            "key": "greater80",
            "display_name": "> 80"
          }
        ]
      }
    ]
  }
  ngOnInit(): void {
    
  }

}
