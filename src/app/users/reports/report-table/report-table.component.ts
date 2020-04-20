import {Component, OnInit} from '@angular/core';
import {FinancialDataService} from '../../services/financial-data.service';
import {overAllReportMain, overAllSubHeader} from '../../../shared/components/home-header/tableHeaders';

@Component({
  selector: 'app-usage-report',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {

  tableHeadersMain = overAllReportMain;
  tableHeaderSub = overAllSubHeader;
  reportData = [];

  constructor(private financialDataService: FinancialDataService) {
  }

  ngOnInit() {
    this.fetchReportData();
  }

  fetchReportData() {
    this.financialDataService
      .getOverAllReportData()
      .subscribe(this.handleResponseSuccess,
        error => this.handleResponseFailure);
  }

  handleResponseSuccess = (response) => {
    this.reportData = response['data'];
    this.addExtraColumns();
  };

  handleResponseFailure = (error) => {

  };

  private addExtraColumns() {
    this.reportData = this.reportData.map(row => {
      return {
        ...row
      };
    });
  }
}
