import { Component, OnInit } from '@angular/core';
import { FiscalRankingService } from '../../fiscal-ranking.service';

@Component({
  selector: 'app-tracking-history-table',
  templateUrl: './tracking-history-table.component.html',
  styleUrls: ['./tracking-history-table.component.scss']
})
export class TrackingHistoryTableComponent implements OnInit {

  constructor(private fiscalRankingService:FiscalRankingService) {}
  
  ngOnInit(): void {
    this.loadTrackingHistory()
  }

  loadTrackingHistory (){
    this.fiscalRankingService.getTrackingHistory().subscribe(result=> {
      console.log("hello::",result)
    } )
  }

}
