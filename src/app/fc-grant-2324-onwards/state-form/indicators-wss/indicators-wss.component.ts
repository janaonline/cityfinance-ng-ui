import { Component, Inject, OnInit } from '@angular/core';
import { CommonServicesService } from '../../fc-shared/service/common-services.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { IndicatorWssPreviewComponent } from './indicator-wss-preview/indicator-wss-preview.component';
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-indicators-wss',
  templateUrl: './indicators-wss.component.html',
  styleUrls: ['./indicators-wss.component.scss']
})
export class IndicatorsWssComponent implements OnInit {

  constructor(
    private commonServices: CommonServicesService,
    private dialog: MatDialog,
   
  ) { 
    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
    }
    this.setUaList();
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuState"));
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
    // indicators_wss : {
    //   title: 'Indicators for Water Supply and Sanitation(A)',
    //   key: 'indicators_wss',
    //   dataCount: {
    //     fourSlbData : {
    //       name: '',
    //       data: [
    //         {
    //           name: 'Total Number of ULBs in UA',
    //           value: '3',
    //           key: '',
    //           ulbs: [

    //           ]
    //          },
    //          {
    //            name: 'Approved by State',
    //            value: '2',
    //            key: '',
    //            ulbs: [
                
    //            ]
    //           },
    //           {
    //            name: 'Pending for Submission/Approval',
    //            value: '1',
    //            key: '',
    //            ulbs: [
                
    //           ]
    //           }
    //       ]
    //     }
    //   },

    //   tables: [
    //   {
    //     'a': 'aaa',
    //     tableType: 'four-slb',
    //     "rows": [
    //       {
    //         serviceLevelIndicators: 'Water supplied in litre per capita per day(lpcd)',
    //         benchmark: '135 LPCD',
    //         achieved2122: '',
    //         target2223: '',
    //         achieved2223: '',
    //         target2122: '',
    //         target2324: '',
    //         target2425: '',
    //         wghtd_score: ''
    //       },
    //       {
    //         serviceLevelIndicators: '% of Non-revenue water',
    //         benchmark: '70 %',
    //         achieved2122: '',
    //         target2223: '',
    //         achieved2223: '',
    //         target2122: '',
    //         target2324: '',
    //         target2425: '',
    //         wghtd_score: ''
    
    //       },
    //       {
    //         serviceLevelIndicators: '% of households covered with sewerage/septage services',
    //         benchmark: '100 %',
    //         achieved2122: '',
    //         target2223: '',
    //         achieved2223: '',
    //         target2122: '',
    //         target2324: '',
    //         target2425: '',
    //         wghtd_score: ''
    
    //       },
    //       {
    //         serviceLevelIndicators: '% of households covered with piped water supply',
    //         benchmark: '100 %',
    //         achieved2122: '',
    //         target2223: '',
    //         achieved2223: '',
    //         target2122: '',
    //         target2324: '',
    //         target2425: '',
    //         wghtd_score: ''
    
    //       }, 
    //     ],
    //     "columns": [
    //       {
    //         "key": "serviceLevelIndicators",
    //         "display_name": "Service Level Indicators"
    //       },
    //       {
    //         "key": "benchmark",
    //         "display_name": "Benchmark"
    //       },
    //       {
    //         "key": "achieved2122",
    //         "display_name": "Achieved <br> 2021-22"
    //       },
    //       {
    //         "key": "target2223",
    //         "display_name": "Target <br> 2022-23"
    //       },
    //       {
    //         "key": "achieved2223",
    //         "display_name": "Achieved <br> 2022-23"
    //       },
    //       {
    //         "key": "target2122",
    //         "display_name": "Target <br> 2021-22"
    //       },
    //       {
    //         "key": "target2324",
    //         "display_name": "Target <br> 2023-24"
    //       },
    //       {
    //         "key": "target2425",
    //         "display_name": "Target <br> 2024-25"
    //       },
    //       {
    //         "key": "wghtd_score",
    //         "display_name": "Weighted Score"
    //       },
    
    //     ]
    //   }
    // ],
    // uaScore: {
    //   'title' : 'Total UA Score for Water Supply and Sanitation :',
    //    value: '60',
    //    maximum: 60
    // }  
    // },
    // indicators_swm: {
    //   title: 'Indicators for Solid Waste Management(B)',
    //   key: 'indicators_swm',
    //   dataCount: {
    //       odfFormData : {
    //         name: 'ODF',
    //         data: [
    //           {
    //             name: 'Total Number of ULBs in UA',
    //             value: '3',
    //             key: '',
    //             ulbs: [
                
    //             ]
    //            },
    //            {
    //              name: 'Approved by State',
    //              value: '5',
    //              key: '',
    //              ulbs: [
                
    //              ]
    //             },
    //             {
    //              name: 'Pending for Submission/Approval',
    //              value: '6',
    //              key: '',
    //              ulbs: [
                
    //              ]
    //             }
    //         ],
    //         'odfRatings': {
    //           'name': 'ODF Rating',
    //           value: '10'
    //         }
    //       },
    //       gfcFormData : {
    //         name: 'GFC',
    //         data: [
    //           {
    //             name: 'Total Number of ULBs in UA',
    //             value: '3',
    //             key: '',
    //             ulbs: [
                
    //             ]
    //            },
               
    //            {
    //              name: 'Approved by State',
    //              value: '2',
    //              key: '',
    //              ulbs: [
                
    //              ]
    //             },
    //             {
    //              name: 'Pending for Submission/Approval',
    //              value: '1',
    //              key: '',
    //              ulbs: [
                
    //              ]
    //             }
    //         ],
    //         'odfRatings': {
    //           'name': 'GFC Rating',
    //           value: '10'
    //         }
    //       }
    //     },
    //   uaScore: {
    //     'title' : 'Total UA Score for Solid Waste Management :',
    //      value: '39.4',
    //      maximum: 40
    //   }
    // },
    // performanceAsst: {
    //   title: 'Performance Assessment',
    //   key: 'performanceAsst',
    //   name: 'On the basis of the total marks obtained by UA, proportionate grants shall be recommended by MOH&UA as per the table given below:',
    //   info: '',
    //   id: '',
    //   tables: [
    //     {
    //       tableType: 'lineItem-highlited',
    //       rows: [
    //         {
    //           "marks" : '% of Recommended tied grant',
    //           "less30" : '0%',
    //           "30To45" : '60%',
    //           "45To60": '75%',
    //           "60To80": "90%",
    //           "greater80" : '100%'
    //         }
    //       ],
    //       columns: [
    //         {
    //             "key": "marks",
    //             "display_name": "Marks"
    //         },
    //         {
    //           "key": "less30",
    //           "display_name": "< 30"
    //         },
    //         {
    //           "key": "30To45",
    //           "display_name": "< 30 and <=45"
    //         },
    //         {
    //           "key": "45To60",
    //           "display_name": "> 45 and <=60"
    //         },
    //         {
    //           "key":  "60To80",
    //           "display_name": "> 60 and <=80"
    //         },
    //         {
    //           "key": "greater80",
    //           "display_name": "> 80"
    //         }
    //       ]
    //     }
    //   ],
    //   dataCount: {  
    //     },
    //   uaScore: {
    //     'title' : `Total UA Score`
    // 
    //      value: '100',
    //      maximum : 100
    //   }
    // }
   }
  }


  stateId:string='';
  uasList: any;
  isCollapsed: boolean[] = [];
  noDataFound:boolean = false;
  userData = JSON.parse(localStorage.getItem("userData"));
  Year = JSON.parse(localStorage.getItem("Years"));
  nextRouter: string = '';
  backRouter: string = '';
  sideMenuItem : any;
  ngOnInit(): void {
    this.setRouter();
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
      design_year: this.Year["2023-24"]
    }
   this.commonServices.formGetMethod('UA/get2223', params).subscribe(
     (res: any) => {
      console.log('aaaaa', res);
      this.noDataFound = false;
      this.response.data = res?.data?.data;
      if(!this.response["data"]["indicators_wss"]["tables"]?.length) {
        this.noDataFound = true;
        swal("", 'Data could not shown as ULBs data is pending for approval by State Government.', "");
      }
     },
     (err) => {
      console.log('aaaaa', err);
      swal("Error", `${err?.message}`, "error");
      }
    )
   
      this.isCollapsed[index] = !this.isCollapsed[index];
      console.log(this.isCollapsed.length, this.uasList);
  
      for (let i = 0; i <= this.uasList.length; i++) {
        console.log(i);
        if (i != index) {
          this.isCollapsed[i] = false;
        }
      }
    

  }
 onPreview() {
  let uaLen = this.uasList?.length;
    for(let i = 0; i< uaLen; i++){
      let uas = this.uasList[i];
      let params = {
        ua: uas?._id,
        design_year: this.Year["2023-24"]
      }
     this.commonServices.formGetMethod('UA/get2223', params).subscribe(
       (res: any) => {
        console.log('aaaaa', i,  res);
        uas["formData"] = res?.data?.data;
        if(uaLen-1 == i) this.openPreview();
       },
       (err) => {
        if(uaLen-1 == i) this.openPreview();
        }
      )
    }
    
  }
  openPreview(){
    let dialogRef = this.dialog.open(IndicatorWssPreviewComponent, {
      data: this.uasList,
      height: "80%",
      width: "90%",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }
  templateData;
  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };
  listFetchOption = {
    filter: null,
    sort: null,
    role: null,
    skip: 0,
    limit: this.tableDefaultOptions.itemPerPage,
  };
  openDialog(template, item) {
    
    this.templateData = item
    console.log('tempdata', item)
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(template, {
      height: "auto",
      width: "600px"
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  closeDialog() {
    this.dialog.closeAll();
}
setPage(pageNoClick: number) {
  this.tableDefaultOptions.currentPage = pageNoClick;
  this.listFetchOption.skip =
    (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
  // this.searchUsersBy(this.filterForm.value);
}
setRouter() {
  this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuState"));
  for (const key in this.sideMenuItem) {
    this.sideMenuItem[key].forEach((element) => {
      if (element?.folderName == "indicators_wss") {
        this.nextRouter = element?.nextUrl;
        this.backRouter = element?.prevUrl;
      }
    });
  }
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
