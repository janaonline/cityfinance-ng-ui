import { Component, OnInit,Inject, Optional } from '@angular/core';
import { FiscalRankingService } from '../../fiscal-ranking.service';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-tracking-history-table',
  templateUrl: './tracking-history-table.component.html',
  styleUrls: ['./tracking-history-table.component.scss']
})
export class TrackingHistoryTableComponent implements OnInit {
  tableData : any[] = []
  message : String = ""
  showLoader:Boolean = true
  constructor(
    private dialog:MatDialog,
    private fiscalRankingService:FiscalRankingService,
    @Optional() @Inject(MAT_DIALOG_DATA) public queryData: { queryParams: any },
    ) {}
  
  ngOnInit(): void {
    this.loadTrackingHistory(this.queryData.queryParams)
  }
  alertClose(){
    this.dialog.closeAll();
  }
  loadTrackingHistory (params={}){
    this.fiscalRankingService.getTrackingHistory(params).subscribe(result=> {
      this.tableData =  result.data
      this.message = result.message
      this.showLoader = false
      
    } ,(error)=>{
      this.message = "No history found"
      this.showLoader = false
    })
  }

}
