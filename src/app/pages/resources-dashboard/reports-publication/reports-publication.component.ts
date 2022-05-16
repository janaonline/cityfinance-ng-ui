import { Component, OnInit } from '@angular/core';
import {CommonService} from 'src/app/shared/services/common.service'
import { ResourcesDashboardService } from '../resources-dashboard.service';
@Component({
  selector: 'app-reports-publication',
  templateUrl: './reports-publication.component.html',
  styleUrls: ['./reports-publication.component.css']
})
export class ReportsPublicationComponent implements OnInit {
  learningCount:any
  searchedValue:any
  learningToggle:boolean=false
  noData:boolean=false
  dataReceived:boolean=true
  stateIdsMap : any = JSON.parse( localStorage.getItem("stateIdsMap"))
  constructor(
    private _commonService : CommonService,private resourcesDashboard: ResourcesDashboardService
  ) { 
    this._commonService.getPublicFileList().subscribe((res)=>{
      this.cardData = res
      console.log("cardData=>",this.cardData)
    })
    this.resourcesDashboard.castSearchedData.subscribe(data =>{
      this.learningToggle =data
    }) 
    this.resourcesDashboard.castCount.subscribe(data =>{
      this.learningCount =data?.key?.reportsAndPublication
      this.searchedValue = data?.name
       this.learningToggle =data?.toggle ? true : false;
       if(data?.key?.total == 0){
        this.noData = true
        this.dataReceived = false;
      } 
    })
  }
  cardData = []

  pdfInput: any = {
    toolKitVisible: "",
    type: "PDF",
    header: "Reports_Publications",
    subHeader: "",
    globalName: "",
    state: "",
    ulb: "",
    year: "",
  }

  getCardData(){
    this.resourcesDashboard.getPdfData(this.pdfInput).subscribe((res: any) => {
      console.log("best practice data", res)
    })
  }

  openFile(url){
    window.open(url, '_blank');
  }
   filterComponent;
  ngOnInit(): void {
    this.getCardData()
    console.log("stateIdsMap", this.stateIdsMap)
    this.filterComponent = {
      comp: 'report-publications'
    }
  }

  filterData(e){
    console.log('reports publications', e.value, this.stateIdsMap[e.value?.state])
    
  }

}
