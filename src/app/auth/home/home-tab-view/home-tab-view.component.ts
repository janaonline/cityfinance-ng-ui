import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Chart} from 'chart.js';

import {DashboardService} from '../../../shared/services/dashboard/dashboard.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

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
  yearsDropdownSettings = {
    text: 'Select Years',
    primaryKey: 'id',
    badgeShowLimit: 1
  };

  commonTableHeaders: any[] = [
    {title: 'Population Category', click: true, id: 'populationCategory'},
    {title: 'Number of ULBs', id: 'numOfUlb'},
    {title: 'Own Revenues', id: 'ownRevenue', description: '(Rs in crores)'},
    {
      title: 'Revenue Expenditure',
      id: 'revenueExpenditure',
      description: '(Rs in crores)'
    },
    {title: 'Own Revenue', id: 'ownRevenue'},
    {title: 'Min. Own Revenue', id: 'minOwnRevenuePercentage'},
    {title: 'Max. Own Revenue', id: 'maxOwnRevenuePercentage'}
  ];
  modalTableHeaders = [];

  commonTableData = [];
  commonTableDataDisplay = [];
  yearForm: FormGroup;
  selectedYears: any = [];
  modalRef: BsModalRef;

  ulbCoverageData = [];

  ulbTypeSelected: string;

  tabIndexChangeHandler(event): void {
    this.tabIndex = event;
    this.fetchData();
  }

  constructor(protected formBuilder: FormBuilder,
              protected dashboardService: DashboardService,
              private modalService: BsModalService,
  ) {
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
    this.selectedYears.splice(
      this.selectedYears.findIndex(year => event.id == year),
      1
    );
    this.filterDisplayDataTableYearWise();
  }

  onDropdownClose(event: any) {
    console.log(event);
  }

  private fetchUlBsData(ulbIdsArray: string[]) {
    if (ulbIdsArray.length) {
      for (const ulb of ulbIdsArray) {
        this.dashboardService.fetchULBData(ulb).subscribe(response => {
          this.commonTableHeaders = [
            {title: 'ULB Name', id: 'ulbName'},
            {
              title: 'Population',
              id: 'populationCategory'
            }
          ].concat(this.commonTableHeaders.slice(2));
        });
      }
    } else {
    }
  }

  private filterDisplayDataTableYearWise() {
    this.commonTableDataDisplay = this.commonTableData.filter(data =>
      this.selectedYears.includes(data.year)
    );
    if (this.tabIndex == 2 || this.tabIndex == 4) {
      this.renderCharts();
    }
  }

  private fetchTableDataSuccess = (response: any) => {
    this.commonTableData = response['data'];
    this.filterDisplayDataTableYearWise();
  };

  private fetchData() {
    this.commonTableHeaders = [
      {title: 'Population Category', id: 'populationCategory'},
      {title: 'Number of ULBs', id: 'numOfUlb'}
    ].concat(this.commonTableHeaders.slice(2));

    switch (this.tabIndex) {
      case 0:
        this.commonTableHeaders = [
          {title: 'Population Category', click: true, id: 'populationCategory'},
          {title: 'Number of ULBs', id: 'numOfUlb'},
          {
            title: 'Own Revenues',
            id: 'ownRevenue',
            description: '(Rs in crores)'
          },
          {
            title: 'Revenue Expenditure',
            id: 'revenueExpenditure',
            description: '(Rs in crores)'
          },
          {title: 'Own Revenue', id: 'ownRevenue'},
          {title: 'Min. Own Revenue', id: 'minOwnRevenuePercentage'},
          {title: 'Max. Own Revenue', id: 'maxOwnRevenuePercentage'}
        ];
        this.dashboardService
          .fetchDependencyOwnRevenueData('3232')
          .subscribe(this.fetchTableDataSuccess);
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
          {title: 'Other Income', id: 'otherIncome'}
        ];
        this.dashboardService
          .fetchSourceOfRevenue('')
          .subscribe(this.fetchTableDataSuccess);
        break;
      case 2:
        this.commonTableHeaders = [
          {title: 'Population Category', id: 'populationCategory'},
          {title: 'Number of ULBs', id: 'numOfUlb'},
          {title: 'Assigned Revenue & revenue grants', id: 'assignedRevenueAndRevenueGrants'},
          {title: 'Deficit financed by Capital grants', id: 'deficitFinanceByCapitalGrants'},
          {title: 'Interest Income', id: 'interestIncome'},
          {title: 'Own Revenues', id: 'ownRevenue'},
          {title: 'Other Income', id: 'ulbName'},
          {title: 'Other Income', id: 'otherIncome'}
        ];
        this.dashboardService
          .fetchFinancialRevenueExpenditure('')
          .subscribe(this.fetchTableDataSuccess);
        break;
      case 3:
        this.commonTableHeaders = [
          {title: 'Population Category', id: 'populationCategory'},
          {title: 'Establishment expense', id: 'establishmentExpense'},
          {title: 'Administrative Expense', id: 'administrativeExpense'},
          {title: 'Operational & Maint. Expense', id: 'operationalAndMaintananceExpense'},
          {title: 'Interest & Finance Expense ', id: 'interestAndFinanceExpense'},
          {title: 'Others', id: 'other'}
        ];
        this.dashboardService
          .fetchRevenueExpenditure('')
          .subscribe(this.fetchTableDataSuccess);
        break;

      case 4:
        this.commonTableHeaders = [
          {title: 'Population Category', id: 'populationCategory'},
          {title: 'Number of ULBs', id: 'numOfUlb'},
          {title: 'Cash & Bank Balance (Rs in crore)', id: 'cashAndBankBalance'}
        ];
        this.dashboardService
          .fetchCashAndBankBalance('')
          .subscribe(this.fetchTableDataSuccess);
        break;
      case 5:
        this.commonTableHeaders = [
          {title: 'Population Category', id: 'populationCategory'},
          {title: 'Number of ULBs', id: 'numOfUlb'},
          {title: 'Loans from Central Government', id: 'LoanFromCentralGovernment'},
          {title: 'Loans from Financial Institutions including Banks', id: 'loanFromFIIB'},
          {title: 'Loans from State Government', id: 'loanFromStateGovernment'},
          {title: 'Total Debt', id: 'total'}
        ];
        this.dashboardService
          .fetchOutStandingDebt('')
          .subscribe(this.fetchTableDataSuccess);
        break;
    }
  }

  fetchCoverage() {
  }

  onDropDownSelectAll(event) {
    this.yearForm.controls['years'].setValue(event);
    this.selectedYears = event.map(e => e.id);
    this.filterDisplayDataTableYearWise();
  }

  private renderCharts() {
    this.commonTableDataDisplay.forEach((yearRow, index) => {
      const elementIdPrefix = 'canvas--' + yearRow.year;
      if (this.tabIndex == 4) {
        const label = yearRow.data.map(row => row['populationCategory']);
        const dataNoOfUlb = yearRow.data.map(row => row['numOfUlb']);
        const dataBankBalance = yearRow.data.map(
          row => row['cashAndBankBalance']
        );
        const elementId1 = `${elementIdPrefix}--${0}`;
        const elementBankBalance = `${elementIdPrefix}--${1}`;
        setTimeout(() => {
          this.renderPieChart({
            type: 'pie',
            data: dataNoOfUlb,
            labels: label,
            elementId: elementId1,
            chartTitle: 'No of ulb'
          });
          this.renderPieChart({
            type: 'pie',
            data: dataBankBalance,
            labels: label,
            elementId: elementBankBalance,
            chartTitle: 'Bank balance'
          });
        }, 1);
        // this.commonTableDataDisplay[index].data = this.commonTableDataDisplay[index].data.slice(0, 2);
      } else {
        yearRow.data.forEach((row, index) => {
          const elementId = `${elementIdPrefix}--${index}`;
          let labels = Object.keys(row).filter(
            key => typeof row[key] === 'number'
          );
          labels = labels.map(label => {
            try {
              label = this.commonTableHeaders.find(header => header.id == label)
                .title;
            } catch (e) {
              return 'Label not available';
            }
            return label;
          });
          const data = Object.values(row).filter(
            value => typeof value === 'number'
          );
          const chartTitle = row[this.commonTableHeaders[0].id];
          setTimeout(() => {
            this.renderPieChart({
              type: 'pie',
              data,
              labels,
              elementId,
              chartTitle
            });
          }, 1);
        });
      }
    });
  }

  renderPieChart({
                   type = 'pie',
                   labels,
                   data,
                   chartTitle,
                   elementId,
                   options = {}
                 }) {
    new Chart(elementId, {
      type,
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: chartTitle
        },

        legend: {
          display: true,
          position: 'bottom'
        },
        responsive: true
      },
      ...options
    });
  }

  sortHeader(header) {
    const {id} = header;
    console.log(id);
    if (header.hasOwnProperty('status') && header.status == true) {
      header.status = false;
      this.commonTableDataDisplay = this.commonTableDataDisplay.map(year => {
        year.data = year.data.sort((a, b) => {
          if (a[id] > b[id]) {
            return -1;
          } else if (a[id] < b[id]) {
            return 1;
          } else {
            return 0;
          }
        });
        return year;
      });
    } else {
      header.status = true;
      this.commonTableDataDisplay = this.commonTableDataDisplay.map(year => {
        year.data = year.data.sort((a, b) => {
          if (a[id] > b[id]) {
            return 1;
          } else if (a[id] < b[id]) {
            return -1;
          } else {
            return 0;
          }
        });
        return year;
      });
    }
  }

  openModal(UlbModal: TemplateRef<any>, range) {
    console.log(range);
    //this.dashboardService.fetchUlbCoverage(range);
    this.modalRef = this.modalService.show(UlbModal, {class: 'modal-lg'});
    this.modalTableHeaders = [
      {title: 'ULB name', click: true, id: 'ulbName'},
      {title: 'Population', click: true, id: 'populationCategory'},
      {title: 'Number of ULBs', id: 'numOfUlb'},
      {title: 'Own Revenues', id: 'ownRevenue', description: '(Rs in crores)'},
      {title: 'Revenue Expenditure', id: 'revenueExpenditure', description: '(Rs in crores)'},
    ];
  }
}

function legendClickCallback(legendItemIndex): any {
  [].slice
    .call(document.querySelectorAll('.myChart'))
    .forEach((chartItem, index) => {
      const chart = Chart.instances[index];
      const dataItem = chart.data.datasets[legendItemIndex];
      if (dataItem.hidden == true || dataItem.hidden == null) {
        dataItem.hidden = false;
      } else {
        dataItem.hidden = true;
      }
      chart.update();
    });
}
