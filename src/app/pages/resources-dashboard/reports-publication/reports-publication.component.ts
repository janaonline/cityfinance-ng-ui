import { Component, OnInit } from '@angular/core';
import {CommonService} from 'src/app/shared/services/common.service'
@Component({
  selector: 'app-reports-publication',
  templateUrl: './reports-publication.component.html',
  styleUrls: ['./reports-publication.component.css']
})
export class ReportsPublicationComponent implements OnInit {

  constructor(
    private _commonService : CommonService
  ) { 
    this._commonService.getPublicFileList().subscribe((res)=>{
      this.cardData = res
      console.log(this.cardData)
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
