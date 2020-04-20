import {Component, OnInit} from '@angular/core';
import {FinancialDataService} from '../../services/financial-data.service';
import {overAllReportMain, overAllSubHeader} from '../../../shared/components/home-header/tableHeaders';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-usage-report',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {

  tableHeadersMain = [];
  tableHeaderSub = [];
  overAllReportData = [];

  constructor(private financialDataService: FinancialDataService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(this.initializeDataByParams);
  }

  initializeDataByParams = ({type}) => {
    this.tableHeadersMain = [];
    this.tableHeaderSub = [];
    this.overAllReportData = [];
    switch (type) {
      case 'overAll':
        this.tableHeadersMain = overAllReportMain;
        this.tableHeaderSub = overAllSubHeader;
        this.fetchOverAllReportData();
        break;
      case 'state':

    }
  };

  fetchOverAllReportData() {
    this.financialDataService
      .getOverAllReportData()
      .subscribe(this.handleResponseSuccess,
        error => this.handleResponseFailure);
  }

  handleResponseSuccess = (response) => {
    this.overAllReportData = response['data'];
    this.addExtraColumns();
  };

  handleResponseFailure = (error) => {

  };

  private addExtraColumns() {
    this.overAllReportData = this.overAllReportData.map(row => {
      return {
        ...row
      };
    });
  }
}
