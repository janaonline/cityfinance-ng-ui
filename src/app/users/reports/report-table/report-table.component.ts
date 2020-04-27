import {Component, OnInit} from '@angular/core';
import {FinancialDataService} from '../../services/financial-data.service';
import {
  overAllReportMain,
  overAllSubHeader,
  stateWiseReportMain,
  stateWiseReportSub,
  ulbWiseReportMain,
  ulbWiseReportSub,
  usageReportMain,
  usageReportSub
} from '../../../shared/components/home-header/tableHeaders';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';
import {TableDownloader} from '../../../shared/util/tableDownload/genericTableDownload';

@Component({
  selector: 'app-usage-report',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {

  tableHeadersMain = [];
  tableHeaderSub = [];
  overAllReportData: any = [];
  financialYearFormControl: FormControl = new FormControl('2020-21');
  reportType: string;
  financialYearDropdown: any = [];
  loading = false;

  constructor(private financialDataService: FinancialDataService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(this.initializeDataByParams);
  }

  resetValues({type}) {
    this.reportType = type;
    this.tableHeadersMain = [];
    this.tableHeaderSub = [];
    this.overAllReportData = [];
  }

  initializeDataByParams = ({type}) => {
    this.fetchFinancialYears();
    this.loading = true;
    this.resetValues({type});
    switch (type) {
      case 'overAll':
        this.tableHeadersMain = overAllReportMain;
        this.tableHeaderSub = overAllSubHeader;
        this.fetchOverAllReportData();
        break;
      case 'state':
        this.tableHeadersMain = stateWiseReportMain;
        this.tableHeaderSub = stateWiseReportSub;
        this.fetchStateWiseReportData();
        break;
      case 'ulb':
        this.tableHeadersMain = ulbWiseReportMain;
        this.tableHeaderSub = ulbWiseReportSub;
        this.fetchUlbTypeWiseData();
        break;
      case 'stateUlb':
        this.tableHeadersMain = ulbWiseReportMain;
        this.tableHeaderSub = ulbWiseReportSub;
        this.fetchStateAndUlbTypeWiseData();
        break;
      case 'usage':
        this.tableHeadersMain = usageReportMain;
        this.tableHeaderSub = usageReportSub;
        this.fetchUsageReportData();

    }
  };

  fetchOverAllReportData() {
    this.financialDataService
      .getOverAllReportData(this.financialYearFormControl.value)
      .subscribe(this.handleResponseSuccess,
        error => this.handleResponseFailure);
  }

  handleResponseSuccess = (response) => {
    this.loading = false;
    this.overAllReportData = response['data'];
    if (this.reportType !== 'usage') {
      this.addExtraColumns();
    }
  };

  handleResponseFailure = (error) => {
    this.loading = false;

  };

  totalRowAddCallback(item) {
    const {total} = item;
    let keys = ['count', 'uploaded', 'pending', 'approved', 'rejected'];
    let totalObject = {};
    for (let key of keys) {
      totalObject[key] = item.data.map(item => item[key]).reduce((a, c) => a + (c || 0), 0);
    }
    item.data.unshift(totalObject);
    for (let row of item.data) {
      if (!('audited' in row)) {
        row['notUploaded'] = total - row['uploaded'];
        let percentage = ((row['notUploaded'] / total) * 100) || 0;
        row[`notUploadedPercentage`] = Number(percentage).toFixed(2) + '%';
      }
      keys.forEach(key => {
        let percentage = ((row[key] / total) * 100) || 0;
        row[`${key}Percentage`] = Number(percentage).toFixed(2) + '%';
      });
    }
    return {
      ...item
    };
  }

  private addExtraColumns() {
    switch (this.reportType) {
      case 'stateUlb':
        for (const state of this.overAllReportData) {
          state.data = state.data.map(this.totalRowAddCallback);
          state.overall = this.calculateOverall(state);
        }
        return;
      case 'ulb':
        this.overAllReportData.overall = this.calculateOverall(this.overAllReportData);
        this.overAllReportData.data = this.overAllReportData.data.map(this.totalRowAddCallback);
        return;
    }
    this.overAllReportData = this.overAllReportData.map(this.totalRowAddCallback);
  }

  calculateOverall({data, overall}) {
    const {total: overAllTotal} = overall;
    let keys = ['count', 'uploaded', 'pending', 'approved', 'rejected'];
    let newData = overall.data;
    let totalUlb = data.map(el => el.total).reduce((a, c) => a + c, 0);
    let overAllObject = {};
    for (let key of keys) {
      overAllObject[key] = newData.map(item => item[key]).reduce((a, c) => a + (c || 0), 0);
    }
    keys.forEach(key => {
      let percentage = ((overAllObject[key] / overAllTotal) * 100) || 0;
      overAllObject[`${key}Percentage`] = Number(percentage).toFixed(2) + '%';
    });
    overAllObject['totalUlb'] = totalUlb;
    return {...overall, ...overAllObject};
  }

  private fetchFinancialYears() {
    this.financialDataService.getFinancialYears().subscribe(result => {
      if (result['success']) {
        this.financialDataService.financialYears = result['data'];
        this.setFinancialYearByTable();
      }
    });
  }

  private setFinancialYearByTable() {
    this.financialYearDropdown = this.financialDataService.financialYears;
    if (this.reportType == 'usage') {
      console.log(this.financialYearDropdown);
      this.financialYearDropdown = this.financialYearDropdown.filter(year => year.name >= '2020-21');
    }
  }

  private fetchStateWiseReportData() {
    this.financialDataService
      .getStateWiseReportData(this.financialYearFormControl.value)
      .subscribe(this.handleResponseSuccess,
        error => this.handleResponseFailure);
  }

  private fetchUlbTypeWiseData() {
    this.financialDataService
      .getUlbTypeWiseData(this.financialYearFormControl.value)
      .subscribe(this.handleResponseSuccess,
        error => this.handleResponseFailure);
  }

  private fetchStateAndUlbTypeWiseData() {
    this.financialDataService
      .getStateAndUlbTypeWiseData(this.financialYearFormControl.value)
      .subscribe(this.handleResponseSuccess,
        error => this.handleResponseFailure);
  }

  private fetchUsageReportData() {
    this.financialDataService
      .getUsageReportData(this.financialYearFormControl.value)
      .subscribe(this.handleResponseSuccess,
        error => this.handleResponseFailure);
  }

  tableDownload() {
    let tableElement = <HTMLTableElement>document.getElementById('table');
    let tableDownloader = TableDownloader.getInstance();
    tableDownloader.downloadTable(tableElement, {
      filename: this.reportType,
      extension: 'xlsx'
    });
  }


}
