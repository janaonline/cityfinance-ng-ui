import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/components/share-dialog/share-dialog.component';
import { TableResponse } from '../common-table/common-table.component';
import { FiscalRankingService, Table } from '../fiscal-ranking.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  table: Table = {
    id: "",
    endpoint: '',
    response: null,
  };

  constructor(
    private fiscalRankingService: FiscalRankingService,
    @Inject(MAT_DIALOG_DATA) public data: { table: Table },
  ) { }

  ngOnInit(): void {
    this.table = this.data.table;
    console.log({ table: this.table });
    this.loadTableData(this.data.table);
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
