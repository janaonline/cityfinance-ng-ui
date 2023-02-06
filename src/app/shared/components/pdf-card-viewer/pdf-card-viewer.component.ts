import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NewDashboardService } from 'src/app/pages/new-dashbords/new-dashboard.service';

@Component({
  selector: 'app-pdf-card-viewer',
  templateUrl: './pdf-card-viewer.component.html',
  styleUrls: ['./pdf-card-viewer.component.scss']
})
export class PdfCardViewerComponent implements OnInit, OnChanges {

  constructor(
    public newDashboardService: NewDashboardService,
  ) { }
  // @Input() data:any;
  @Input() cityId:any;
  cardData = [];
  @Input() tabDescription;
  ngOnInit(): void {
    console.log('dataaaaaaa',  this.cityId);
    this.getMoUData();
  }
  ngOnChanges(){
    // this.cardData = this.data;
  }
  getMoUData(){
    this.newDashboardService.getMoUData(this.cityId).subscribe(
      (res:any) => {
        this.cardData = res?.fileUrls;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openFile(url){
    window.open(url, '_blank');
  }


}
