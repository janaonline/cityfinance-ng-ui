import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { services } from '../../../users/data-upload/components/configs/water-waste-management';
import { WaterManagement } from '../../../users/data-upload/models/financial-data.interface';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { WaterSupplyPreviewComponent } from './water-supply-preview/water-supply-preview.component';
import { State2223Service } from '../state-services/state2223.service';
import { SweetAlert } from "sweetalert/typings/core";
import { StateDashboardService } from 'src/app/pages/stateforms/state-dashboard/state-dashboard.service';
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-water-supply',
  templateUrl: './water-supply.component.html',
  styleUrls: ['./water-supply.component.scss']
})
export class WaterSupplyComponent implements OnInit {
  design_year;
  yearValue;
  getData = null
  odfGfcTotalScore;
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

  nodataFound = false;
  combinedActualTarget = [];
  waterWasteManagementForm: FormGroup;
  benchmarks = []
  services: {
    key: keyof WaterManagement;
    name: string;
    benchmark: string;
  }[] = services;
  firstWeightedScore;
  secondWeightedScore;
  thirdWeightedScore;
  fourthWeightedScore;
  detailsOfUa;
  templateData;
  uasList;
  totalWeightedScore
  public isCollapsed: boolean[] = [];
  uaDetails;
  recommendedData:any='';
  firstRowData = []
  secondRowData = []
  thirdRowData = []
  fourthRowData = []
  checkIndex: boolean = false;
  totalAplusB;
  UANames = [];
  id;
  targetActual = [{ key: "1", name: "Actual Indicator <br> 2020-21" },
  { key: "2", name: "Target <br> 2021-22" },
  { key: "3", name: "Actual Indicator <br> 2021-22" },
  { key: "4", name: "Target <br> 2022-23" },
  { key: "5", name: "Target <br> 2023-24" },
  { key: "6", name: "Target <br> 2024-25" }]


  constructor(
    private dialog: MatDialog,
    private stateService: State2223Service,
    public stateDashboardService: StateDashboardService,
  ) {
    this.getDesignYear();
    this.id = sessionStorage.getItem("sessionID");
    this.setUaList()
  }
  

  ngOnInit() {
    
  }
  setUaList(){
    this.stateDashboardService.getCardData(this.id).subscribe(
      (res) => {
        let newList = {};
        res["data"]["uaList"].forEach((element) => {
          this.UANames.push(element.name)
          newList[element._id] = element;
        });
        sessionStorage.setItem("UasList", JSON.stringify(newList));
        this.uasList = Object.values(JSON.parse(sessionStorage.getItem("UasList")))
        this.benchmarks = this.services.map((el) => (parseInt(el.benchmark)))
      },
      (err) => {
        console.log(err);
      }
    );
  }
  setPage(pageNoClick: number) {
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip =
      (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    // this.searchUsersBy(this.filterForm.value);
  }
 
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
  onPreview() {
      let getData={
        getData: this.getData,
        firstRowData: this.firstRowData,
        secondRowData: this.secondRowData,
        thirdRowData: this.thirdRowData,
        fourthRowData: this.fourthRowData,
        odfGfcTotalScore: this.odfGfcTotalScore,
        combinedActualTarget: this.combinedActualTarget,
        totalWeightedScore: this.totalWeightedScore,
        recommendedData: this.recommendedData,
        firstWeightedScore: this.firstWeightedScore,
        secondWeightedScore: this.secondWeightedScore,
        thirdWeightedScore: this.thirdWeightedScore,
        fourthWeightedScore: this.fourthWeightedScore, 
        totalAplusB:this.totalAplusB,
        noDataFound: this.noDataFound
      }
    let dialogRef = this.dialog.open(WaterSupplyPreviewComponent, {
      data: getData,
      height: "100%",
      width: "90%",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  getDesignYear(){
    this.design_year = JSON.parse(localStorage.getItem("Years"));
    this.yearValue = this.design_year["2022-23"];
  }
  noDataFound : boolean = false;
  gfcScoreRoundOff;
  odfScoreRoundOff;
  foldCard(index, ua_id) {
    console.log(ua_id)
    let params = {
      ua: ua_id,
      design_year: this.yearValue
    }
    this.stateService.getWaterSupplyData(params).subscribe(
      (res: any) => {
        this.getData = res['data']
        this.gfcScoreRoundOff = parseFloat(this.getData?.gfc?.score).toFixed(2)
        this.odfScoreRoundOff = parseFloat(this.getData?.odf?.score).toFixed(2)
        this.combinedActualTarget = this.targetActual  
        this.getTotalWeightedScore();
        this.setRowData();
        this.odfGfcTotalScore = this.getData?.odf.score + this.getData?.gfc.score
        this.odfGfcTotalScore = parseFloat(this.odfGfcTotalScore).toFixed(2)    
        this.checkScore();
        this.parseWeightedScore(); 
        this.totalAplusB =parseFloat(this.totalWeightedScore) + parseFloat(this.odfGfcTotalScore)
        res?.message == 'Insufficient Data' ? this.noDataFound = true : this.noDataFound = false
        if(this.noDataFound){
          swal("", 'Data could not shown as ULBs data is pending for approval by State Government.', "");    
        }
      },
      (err) => {
        this.getData = null
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
   checkScore(){
    let totalSummaryData =parseFloat(this.totalWeightedScore) + parseFloat(this.odfGfcTotalScore)
        
        if(totalSummaryData < 30){
          this.recommendedData = '0 %'
        }else if(totalSummaryData > 30 && totalSummaryData <= 45){
          this.recommendedData = '60 %'
        }else if(totalSummaryData > 45 && totalSummaryData <= 60){
          this.recommendedData = '75 %'
        }else if(totalSummaryData > 60 && totalSummaryData <= 80){
          this.recommendedData = '90 %'
        }else if(totalSummaryData > 80){
          this.recommendedData = '100 %'
        }
   }
   setRowData(){
    this.firstRowData = [parseFloat(this.getData?.fourSLB?.data?.waterSuppliedPerDay2021).toFixed(2),      
      parseFloat(this.getData?.fourSLB?.data?.waterSuppliedPerDay2122).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.waterSuppliedPerDay_actual2122).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.waterSuppliedPerDay2223).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.waterSuppliedPerDay2324).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.waterSuppliedPerDay2425).toFixed(2)
      ]

    this.secondRowData = [parseFloat(this.getData?.fourSLB?.data?.reduction2021).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.reduction2122).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.reduction_actual2122).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.reduction2223).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.reduction2324).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.reduction2425).toFixed(2)
      ]

    this.thirdRowData = [parseFloat(this.getData?.fourSLB?.data?.houseHoldCoveredWithSewerage2021).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.houseHoldCoveredWithSewerage2122).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.houseHoldCoveredWithSewerage_actual2122).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.houseHoldCoveredWithSewerage2223).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.houseHoldCoveredWithSewerage2324).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.houseHoldCoveredWithSewerage2425).toFixed(2)
        ]

    this.fourthRowData = [parseFloat(this.getData?.fourSLB?.data?.houseHoldCoveredPipedSupply2021).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.houseHoldCoveredPipedSupply2122).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.houseHoldCoveredPipedSupply_actual2122).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.houseHoldCoveredPipedSupply2223).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.houseHoldCoveredPipedSupply2324).toFixed(2),
      parseFloat(this.getData?.fourSLB?.data?.houseHoldCoveredPipedSupply2425).toFixed(2)
           ]
   }
   getTotalWeightedScore(){
    this.totalWeightedScore = this.getData?.fourSLB?.data?.waterSuppliedPerDay_score + 
                                  this.getData?.fourSLB?.data?.reduction_score + 
                                  this.getData?.fourSLB?.data?.houseHoldCoveredWithSewerage_score +
                                  this.getData?.fourSLB?.data?.houseHoldCoveredPipedSupply_score
    this.totalWeightedScore = parseFloat(this.totalWeightedScore).toFixed(2)
   }
  parseWeightedScore(){
    this.firstWeightedScore = parseFloat(this.getData?.fourSLB?.data?.waterSuppliedPerDay_score).toFixed(2) 
        this.secondWeightedScore = parseFloat(this.getData?.fourSLB?.data?.reduction_score).toFixed(2) 
        this.thirdWeightedScore = parseFloat(this.getData?.fourSLB?.data?.houseHoldCoveredWithSewerage_score).toFixed(2) 
        this.fourthWeightedScore = parseFloat(this.getData?.fourSLB?.data?.houseHoldCoveredPipedSupply_score).toFixed(2)
  }
}


