import {Component, OnInit, TemplateRef} from '@angular/core';
import {DataEntryService} from '../data-entry/data-entry.service';
import {BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-data-tracker',
  templateUrl: './data-tracker.component.html',
  styleUrls: ['./data-tracker.component.scss']
})
export class DataTrackerComponent implements OnInit {

  ledgerLogs = [];
  fileList = {};
  columnDefs = [
    {headerName: 'State', field: 'stateName'},
    {headerName: 'ULB Name', field: 'ulbName'},
    {headerName: 'Year', field: 'financialYear'},
    {
      headerName: 'Audit Status', field: 'audited',
      cellRenderer: ({data}) => data.audited ? 'Audited' : 'Unaudited'
    },
    {
      headerName: 'Download', field: 'ulb_code_year',
      cellRenderer: function ({data}) {
        return `<button (click)="openModal" class="btn btn-xs">Download</button>`;
      }
    },
  ];

  constructor(private dataEntryService: DataEntryService,
              private modalService: BsModalService,
  ) {
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

  onDownloadClicked({data}, ref: TemplateRef<any>) {
    this.fileList = [];
    this.dataEntryService.getFileList(data._id).subscribe(result => {
      this.fileList = result['data'];
    });
    this.modalService.show(ref);
  }
}
