import {Component, OnInit} from '@angular/core';
import {DataEntryService} from '../data-entry.service';

@Component({
  selector: 'app-ledger-list',
  templateUrl: './ledger-list.component.html',
  styleUrls: ['./ledger-list.component.scss']
})
export class LedgerListComponent implements OnInit {

  ledgerLogs = [];
  columnDefs = [
    {headerName: 'State', field: 'state'},
    {headerName: 'ULB', field: 'ulb'},
    {headerName: 'Year', field: 'year'},
    {headerName: 'Wards', field: 'wards', filter: 'agNumberColumnFilter'},
    {headerName: 'Area', field: 'area', filter: 'agNumberColumnFilter'},
    {headerName: 'Population', field: 'population', filter: 'agNumberColumnFilter'},
    {headerName: 'Audit Status', field: 'audit_status'},
    {headerName: 'Audit Firm', field: 'audit_firm'},
    {headerName: 'Partner Name', field: 'partner_name'},
    {headerName: 'ICAI Membership#', field: 'icai_membership_number'},
    {
      headerName: 'Reverified At', field: 'reverified_at', filter: 'agDateColumnFilter', valueFormatter: (params) => {
        var date = new Date(parseInt(params.value));
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getUTCFullYear();
      }
    },
    {headerName: 'Reverified By', field: 'reverified_by', filter: 'agDateColumnFilter'},
  ];

  constructor(private dataEntryService: DataEntryService) {
  }

  ngOnInit() {
    this.dataEntryService.getLedgerLogs({}).subscribe(res => {
      if (res['success']) {
        this.ledgerLogs = res['data'];
      } else {
        alert('Failed');
      }
    });
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

}
