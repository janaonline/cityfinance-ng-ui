import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DashboardService} from '../../../shared/services/dashboard/dashboard.service';


@Component({
  selector: 'app-home-tab-view',
  templateUrl: './home-tab-view.component.html',
  styleUrls: ['./home-tab-view.component.scss']
})
export class HomeTabViewComponent implements OnInit {
  tabIndex: any = 0;
  yearLookup = [
    {id: '2015-16', itemName: '2015-16'},
    {id: '2016-17', itemName: '2016-17'},
    {id: '2017-18', itemName: '2017-18'}
  ];
  yearsDropdownSettings = {text: 'Select Years', primaryKey: 'id', badgeShowLimit: 1};


  commonTableHeaders: any[] = [
    {title: 'Population Category', id: 'populationCategory'},
    {title: 'Number of ULBs', id: 'numOfUlb'},
    {title: 'Own Revenues', id: 'ownRevenue', description: '(Rs in crores)'},
    {title: 'Revenue Expenditure', id: 'revenueExpenditure', description: '(Rs in crores)'},
    {title: 'Own Revenue', id: 'ownRevenue'},
    {title: 'Min. Own Revenue', id: 'minOwnRevenuePercentage'},
    {title: 'Max. Own Revenue', id: 'maxOwnRevenuePercentage'}
  ];

  commonTableData = [];
  commonTableDataDisplay = [];
  yearForm: FormGroup;
  selectedYears: any = [];

  ulbTypeSelected: string;

  tabIndexChangeHandler(event): void {
    this.tabIndex = event;
    this.fetchData();


  }

  constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService) {
    this.yearForm = formBuilder.group({
      years: [[this.yearLookup[0]]]
    });
    this.selectedYears = [this.yearLookup[0].id];


  }

  ngOnInit() {
    this.fetchData();
  }

  onDropdownSelect(event: any) {
    this.selectedYears.push(event.id);
    this.filterDisplayDataTableYearWise();
  }

  resetPopupValues() {
    this.selectedYears = [];
    this.yearForm.controls['years'].setValue([]);
    this.filterDisplayDataTableYearWise();
  }

  onDropdownDeSelect(event: any) {
    this.selectedYears.splice(this.selectedYears.findIndex(year => event.id == year), 1);
    this.filterDisplayDataTableYearWise();

  }

  onDropdownClose(event: any) {
    console.log(event);
  }

  private fetchUlBsData(ulbIdsArray: string[]) {
    if (ulbIdsArray.length) {
      for (let ulb of ulbIdsArray) {
        this.dashboardService.fetchULBData(ulb).subscribe(response => {
          this.commonTableHeaders = [{title: 'ULB Name'}, {title: 'Population'}].concat(this.commonTableHeaders.slice(2));
        });
      }
    } else {

    }
  }

  private filterDisplayDataTableYearWise() {
    this.commonTableDataDisplay = this.commonTableData.filter((data) => this.selectedYears.includes(data.year));
  }

  private fetchTableDataSuccess = (response: any) => {

    this.commonTableData = response['data'];
    this.filterDisplayDataTableYearWise();

  };

  private fetchData() {
    this.commonTableHeaders = [{title: 'Population Category', id: 'populationCategory'},
      {title: 'Number of ULBs', id: 'numOfUlb'}].concat(this.commonTableHeaders.slice(2));

    switch (this.tabIndex) {
      case 0:
        this.commonTableHeaders = [
          {title: 'Population Category', id: 'populationCategory'},
          {title: 'Number of ULBs', id: 'numOfUlb'},
          {title: 'Own Revenues', id: 'ownRevenue', description: '(Rs in crores)'},
          {title: 'Revenue Expenditure', id: 'revenueExpenditure', description: '(Rs in crores)'},
          {title: 'Own Revenue', id: 'ownRevenue'},
          {title: 'Min. Own Revenue', id: 'minOwnRevenuePercentage'},
          {title: 'Max. Own Revenue', id: 'maxOwnRevenuePercentage'}
        ];
        this.dashboardService.fetchDependencyOwnRevenueData('3232').subscribe(this.fetchTableDataSuccess);
        break;
      case 1:
        this.commonTableHeaders = [
          {title: 'Population Category', id: 'populationCategory'},
          {title: 'Number of ULBs', id: 'numOfUlb'},
          {title: 'Tax Revenue (a)', id: 'taxRevenue'},
          {title: 'Rental Income (b)', id: 'rentalIncome'},
          {title: 'Fees & user charges (c)', id: 'feesAndUserCharges'},
          {title: 'Own revenues (a+b+c)', id: 'ownRevenues'},
          {title: 'Sale & hire charges', id: 'saleAndHireCharges'},
          {title: 'Assigned revenue', id: 'assignedRevenue'},
          {title: 'Grants', id: 'grants'},
          {title: 'Interest Income', id: 'interestIncome'},
          {title: 'Other Income', id: 'otherIncome'},
        ];
        this.dashboardService.fetchSourceOfRevenue('')
          .subscribe(this.fetchTableDataSuccess);
        break;
      case  3:
        this.commonTableHeaders = [
          {title: 'Population Category', id: 'populationCategory'},
          {title: 'Establishment expense', id: 'establishmentExpense'},
          {title: 'Administrative Expense', id: 'administrativeExpense'},
          {title: 'Operational & Maint. Expense', id: 'operationalAndMaintananceExpense'},
          {title: 'Interest & Finance Expense ', id: 'interestAndFinanceExpense'},
          {title: 'Others', id: 'other'},
        ];
        this.dashboardService.fetchRevenueExpenditure('')
          .subscribe(this.fetchTableDataSuccess);
        break;
      case 4:
        this.commonTableHeaders = [
          {title: 'Population Category', id: 'populationCategory'},
          {title: 'Number of ULBs', id: 'numOfUlb'},
          {title: 'Cash & Bank Balance (Rs in crore)', id: 'cashAndBankBalance'},
        ];
        this.dashboardService.fetchCashAndBankBalance('')
          .subscribe(this.fetchTableDataSuccess);
        break;
    }

  }

  onDropDownSelectAll(event) {
    this.yearForm.controls['years'].setValue(event);
    this.selectedYears = event.map(e => e.id);
    this.filterDisplayDataTableYearWise();

  }
}
