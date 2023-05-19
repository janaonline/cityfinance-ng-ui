import { Component, OnInit } from '@angular/core';
import { TableResponse } from '../common-table/common-table.component';
import { FiscalRankingService } from '../fiscal-ranking.service';

interface Table {
  endpoint: string;
  response: TableResponse
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tables: Table[] = [
    {
      endpoint: 'fiscal-ranking/overview/UlbActivities',
      response: null,
    },
    // {
    //   endpoint: 'fiscal-ranking/overview/PMUActivities',
    //   response: null,
    // },
    // {
    //   endpoint: 'fiscal-ranking/overview/populationWise',
    //   response: null,
    // },
  ]

  constructor(
    private fiscalRankingService: FiscalRankingService
  ) { }

  ngOnInit(): void {

    this.tables.forEach(table => {
      this.loadTableData(table);
      console.log(this.tables);
    })
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
