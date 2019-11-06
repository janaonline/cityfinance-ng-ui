import { Component, OnInit } from '@angular/core';
import { DataEntryService } from '../data-entry/data-entry.service';

@Component({
  selector: 'app-data-tracker',
  templateUrl: './data-tracker.component.html',
  styleUrls: ['./data-tracker.component.scss']
})
export class DataTrackerComponent implements OnInit {

  ledgerLogs = [];
  columnDefs = [
    {headerName: 'State', field: 'state' },
    {headerName: 'ULB Name', field: 'ulb' },
    {headerName: 'Year', field: 'year' },
    // {headerName: 'Wards', field: 'wards', filter: "agNumberColumnFilter" },
    // {headerName: 'Area', field: 'area', filter: "agNumberColumnFilter" },
    // {headerName: 'Population', field: 'population', filter: "agNumberColumnFilter" },
    {headerName: 'Audit Status', field: 'audit_status'},
    {headerName: 'Download', field: 'ulb_code_year', 
      cellRenderer: function(params) {
        return '<a href="https://jccd-cityfinance.s3.ap-south-1.amazonaws.com/downloads/credit-rating/excel/' + params.value.substr(0, 6)+params.value.substr(8,2)+params.value.substr(11,2)+'.xlsx' + '" target="_blank"><i class="fa fa-file-excel-o" aria-hidden="true"></i></a> / <a href="https://jccd-cityfinance.s3.ap-south-1.amazonaws.com/downloads/credit-rating/pdf/' + params.value.substr(0, 6)+params.value.substr(8,2)+params.value.substr(11,2)+'.pdf' + '" target="_blank"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a>'
      }
    },
    
  
  ];
  constructor(private dataEntryService: DataEntryService) { }

  ngOnInit() {
    this.dataEntryService.getLedgerLogs({}).subscribe(res => {
      if(res['success']){
        this.ledgerLogs = res['data'];
      } else{
        alert('Failed');
      }
    })
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

}
