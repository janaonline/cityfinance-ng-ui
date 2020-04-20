import {Component, OnInit} from '@angular/core';
import {FinancialDataService} from '../../services/financial-data.service';
import {overAllReportMain, overAllSubHeader} from '../../../shared/components/home-header/tableHeaders';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-usage-report',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {

  tableHeadersMain = [];
  tableHeaderSub = [];
  overAllReportData = [];
  financialYearFormControl: FormControl = new FormControl('2015-16');
  reportType: string;
  private financialYearDropdown: any = [];

  constructor(private financialDataService: FinancialDataService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.fetchFinancialYears();
    this.activatedRoute.params.subscribe(this.initializeDataByParams);
  }

  initializeDataByParams = ({type}) => {
    this.reportType = type;
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
      .getOverAllReportData(this.financialYearFormControl.value)
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
      const {total, data} = row;
      let keys = ['uploaded', 'pending', 'approved', 'rejected'];
      let totalObject = {};
      for (let key of keys) {
        let sum = row.data.map(item => item[key]).reduce((a, c) => a + (c || 0), 0);
        totalObject[key] = sum;
        totalObject[`${key}percentage`] = Number(sum / total).toFixed(2);
      }
      row.data.unshift(totalObject);
      return {
        ...row
      };
    });
    console.log(this.overAllReportData);
  }

  private fetchFinancialYears() {
    this.financialDataService.getFinancialYears().subscribe(result => {
      if (result['success']) {
        this.financialYearDropdown = result['data'];
      }
    });
  }
}
