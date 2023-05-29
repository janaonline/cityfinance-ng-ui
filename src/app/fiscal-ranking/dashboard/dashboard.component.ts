import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogData } from 'src/app/shared/components/share-dialog/share-dialog.component';
import { TableResponse } from '../common-table/common-table.component';
import { FiscalRankingService, Table } from '../fiscal-ranking.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  table: Table = {
    id: "",
    endpoint: '',
    response: null,
  };

  constructor(
    private fiscalRankingService: FiscalRankingService,
    private route: ActivatedRoute,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { table: Table },
  ) { }

  ngOnInit(): void {
    const queryParams = new URLSearchParams({...this.route.snapshot.params, ...this.route.snapshot.queryParams} as any).toString();
    if(this.data?.table) {
      this.table = this.data.table;
    }
    else if(this.route.snapshot.data.table) {
      this.table = this.route.snapshot.data.table;
    }
    this.loadTableData(this.table, queryParams);
  }

  onUpdate(table, event) {
    console.log({
      table, event
    })
    this.loadTableData(table, event?.queryParams)
  }

  loadTableData(table: Table, queryParams: string = '') {
    this.fiscalRankingService.getTableResponse(table.endpoint, queryParams, table?.response?.columns).subscribe(res => {
      table.response = res;
    })
  }

}
