import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '../../fc-shared/service/common-services.service';

@Component({
  selector: 'app-indicators-wss',
  templateUrl: './indicators-wss.component.html',
  styleUrls: ['./indicators-wss.component.scss']
})
export class IndicatorsWssComponent implements OnInit {

  constructor(
    private commonServices: CommonServicesService
  ) { 
    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
    }
    this.setUaList();
  }
  isApiInProgress:boolean = false;
  response = {
    formName: 'Indicators for Water Supply and Sanitation',
    formId: '',
    status: '',
    statusId: '',
    info: 'The below tables denotes the aggregate indicators and targets of ULBs in respective UA',
    previousYrMsg: '',
    data: {
      indicators_wss : {
        title: 'Indicators for Water Supply and Sanitation(A)',
        key: 'indicators_wss',
        dataCount: {
          fourSlbData : {
            name: '',
            data: [
              {
                name: 'Total Number of ULBs in UA',
                value: '3',
                key: '',
                ulbs: [
  
                ]
               },
               {
                 name: 'Approved by State',
                 value: '2',
                 key: '',
                 ulbs: [
                  
                 ]
                },
                {
                 name: 'Pending for Submission/Approval',
                 value: '1',
                 key: '',
                 ulbs: [
                  
                ]
                }
            ]
          }
        },
  
        tables: [
        {
          'a': 'aaa',
          tableType: 'four-slb',
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
              "key": "achieved2122",
              "display_name": "Achieved <br> 2021-22"
            },
            {
              "key": "target2223",
              "display_name": "Target <br> 2022-23"
            },
            {
              "key": "achieved2223",
              "display_name": "Achieved <br> 2022-23"
            },
            {
              "key": "target2122",
              "display_name": "Target <br> 2021-22"
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
              "key": "wghtd_score",
              "display_name": "Weighted Score"
            },
      
          ]
        }
      ],
      uaScore: {
        'title' : 'Total UA Score for Water Supply and Sanitation : 60.00(out of maximum 60)',
         value: '60'
      }  
      },
      indicators_swm: {
        title: 'Indicators for Solid Waste Management(B)',
        key: 'indicators_swm',
        dataCount: {
            odfFormData : {
              name: 'ODF',
              data: [
                {
                  name: 'Total Number of ULBs in UA',
                  value: '3',
                  key: '',
                  ulbs: [
                  
                  ]
                 },
                 {
                   name: 'Approved by State',
                   value: '5',
                   key: '',
                   ulbs: [
                  
                   ]
                  },
                  {
                   name: 'Pending for Submission/Approval',
                   value: '6',
                   key: '',
                   ulbs: [
                  
                   ]
                  }
              ],
              'odfRatings': {
                'name': 'ODF Rating',
                value: '10'
              }
            },
            gfcFormData : {
              name: 'GFC',
              data: [
                {
                  name: 'Total Number of ULBs in UA',
                  value: '3',
                  key: '',
                  ulbs: [
                  
                  ]
                 },
                 
                 {
                   name: 'Approved by State',
                   value: '2',
                   key: '',
                   ulbs: [
                  
                   ]
                  },
                  {
                   name: 'Pending for Submission/Approval',
                   value: '1',
                   key: '',
                   ulbs: [
                  
                   ]
                  }
              ],
              'odfRatings': {
                'name': 'GFC Rating',
                value: '10'
              }
            }
          },
        uaScore: {
          'title' : 'Total UA Score for Solid Waste Management : 39.53 (out of maximum 40 marks)',
           value: '39.4'
        }
      },
      performanceAsst: {
        title: 'Performance Assessment',
        key: 'performanceAsst',
        name: 'On the basis of the total marks obtained by UA, proportionate grants shall be recommended by MOH&UA as per the table given below:',
        info: '',
        id: '',
        tables: [
          {
            tableType: 'lineItem-highlited',
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
        ],
        dataCount: {  
          },
        uaScore: {
          'title' : `On the basis of the total marks obtained by UA,
           proportionate grants shall be recommended by MOH&UA as per the table given below:`,
           value: '100'
        }
      }
    }
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
  stateId:string='';
  uasList: any;
  isCollapsed: boolean[] = [];
  userData = JSON.parse(localStorage.getItem("userData"));
  Year = JSON.parse(localStorage.getItem("Years"));
  ngOnInit(): void {
    
  }

  setUaList(){
    this.isApiInProgress = true
    this.commonServices.formGetMethod(`dashboard/state?state_id=${this.stateId}`, '').subscribe(
      (res) => {
        let newList = {};
        res["data"]["uaList"].forEach((element) => {
         // this.UANames.push(element.name)
          newList[element._id] = element;
        });
        this.isApiInProgress = false;
       // this.uasList = newList;
       sessionStorage.setItem("UasList", JSON.stringify(newList));
       this.uasList = Object.values(JSON.parse(sessionStorage.getItem("UasList")))
      // this.benchmarks = this.services.map((el) => (parseInt(el.benchmark)))
      },
      (err) => {
        console.log(err);
        this.isApiInProgress = false;
      }
    );
  };

  foldCard(index, ua_id) {
    console.log(ua_id)
    let params = {
      ua: ua_id,
      design_year: this.Year["2022-23"]
    }
//  //   this.commonServices.getWaterSupplyData(params).subscribe(
//   //    (res: any) => {
//         // this.getData = res['data']
//         // this.gfcScoreRoundOff = parseFloat(this.getData?.gfc?.score).toFixed(2)
//         // this.odfScoreRoundOff = parseFloat(this.getData?.odf?.score).toFixed(2)
//         // this.combinedActualTarget = this.targetActual
//         // this.getTotalWeightedScore();
//         // this.setRowData();
//         // this.odfGfcTotalScore = this.getData?.odf.score + this.getData?.gfc.score
//         // this.odfGfcTotalScore = parseFloat(this.odfGfcTotalScore).toFixed(2)
//         // this.checkScore();
//         // this.parseWeightedScore();
//         // this.totalAplusB =parseFloat(this.totalWeightedScore) + parseFloat(this.odfGfcTotalScore)
//         // res?.message == 'Insufficient Data' ? this.noDataFound = true : this.noDataFound = false
//         // if(this.noDataFound){
//         //   swal("", 'Data could not shown as ULBs data is pending for approval by State Government.', "");
//         // }
//   //    },
//   //    (err) => {
//        // this.getData = null;  // this.getData = res['data']
//         // this.gfcScoreRoundOff = parseFloat(this.getData?.gfc?.score).toFixed(2)
//         // this.odfScoreRoundOff = parseFloat(this.getData?.odf?.score).toFixed(2)
//         // this.combinedActualTarget = this.targetActual
//         // this.getTotalWeightedScore();
//         // this.setRowData();
//         // this.odfGfcTotalScore = this.getData?.odf.score + this.getData?.gfc.score
//         // this.odfGfcTotalScore = parseFloat(this.odfGfcTotalScore).toFixed(2)
//         // this.checkScore();
//         // this.parseWeightedScore();
//         // this.totalAplusB =parseFloat(this.totalWeightedScore) + parseFloat(this.odfGfcTotalScore)
//         // res?.message == 'Insufficient Data' ? this.noDataFound = true : this.noDataFound = false
//         // if(this.noDataFound){
//         //   swal("", 'Data could not shown as ULBs data is pending for approval by State Government.', "");
//         // }
//       }
//     )
    this.isCollapsed[index] = !this.isCollapsed[index];
    console.log(this.isCollapsed.length, this.uasList);

    for (let i = 0; i <= this.uasList.length; i++) {
      console.log(i);
      if (i != index) {
        this.isCollapsed[i] = false;
      }
    }

  }
  keepOriginalOrder = (a, b) => b.key - a.key;
}
