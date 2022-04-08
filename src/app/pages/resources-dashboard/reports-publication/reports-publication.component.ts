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
  constructor(
    private _commonService : CommonService,private resourcesDashboard: ResourcesDashboardService
  ) { 
    this._commonService.getPublicFileList().subscribe((res)=>{
      this.cardData = res
      console.log(this.cardData)
    })
    this.resourcesDashboard.castCount.subscribe(data =>{
      this.learningCount =data?.key?.report
      this.searchedValue = data?.name
       this.learningToggle =data?.toggle ? true : false;
       if(data?.key?.total == 0){
        this.noData = true
        this.dataReceived = false;
      } 
    })
  }
  cardData = []
  openFile(url){
    window.open(url, '_blank');
  }
   filterComponent;
  ngOnInit(): void {
    this.filterComponent = {
      comp: 'report-publications'
    }
  }

  filterData(e){
    console.log('reports publications', e)
}

}
