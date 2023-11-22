import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ulb-details-assessment-parameters',
  templateUrl: './ulb-details-assessment-parameters.component.html',
  styleUrls: ['./ulb-details-assessment-parameters.component.scss']
})
export class UlbDetailsAssessmentParametersComponent implements OnInit {



  table = {
    response: {
      "status": true,
      "message": "Successfully fetched data!",
      "columns": [
        {
          "label": "S. No",
          "key": "sNo",
        },
        {
          "label": "Indicator",
          "key": "indicator"
        },
        {
          "label": "Units",
          "key": "unit"
        },
        {
          "label": "Ulb performance",
          "key": "ulbPerformance"
        },
        {
          "label": "Highest performance",
          "info": "In population category",
          "key": "highPerformance"
        },
        {
          "label": "Lowest performance",
          "info": "In population category",
          "key": "lowPerformance"
        },
        {
          "label": "Ulb Score",
          "info": "Out of 300",
          "key": "ulbScore"
        }
      ],
      "data": [
        {
          "sNo": 1,
          "indicator": "Total Budget size per capita (Actual Total Reciepts)",
          "unit": "Rs",
          "ulbPerformance": 460,
          "highPerformance": 86,
          "lowPerformance": 256,
          "ulbScore": 260
        },
        {
          "sNo": 1,
          "indicator": "Own Revenue per capita",
          "unit": "Rs",
          "ulbPerformance": 460,
          "highPerformance": 86,
          "lowPerformance": 256,
          "ulbScore": 260
        },
        {
          "sNo": 1,
          "indicator": "Property Tax per capita",
          "unit": "Rs",
          "ulbPerformance": 460,
          "highPerformance": 86,
          "lowPerformance": 256,
          "ulbScore": 260
        },
      ],
      "lastRow": [
        "",
        "",
        "",
        "",
        "",
        "Total",
        "$sum",
      ]
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
