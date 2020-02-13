import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Chart} from 'chart.js';
import {DashboardService} from '../../../shared/services/dashboard/dashboard.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {tableHeaders} from '../../home-header/tableHeaders';
import {of} from 'rxjs';
import {el} from '@angular/platform-browser/testing/src/browser_util';

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
    {title: 'Own Revenue %', id: 'ownRevenue ', description: '(A/B)'},
    {title: 'Min. Own Revenue %', id: 'minOwnRevenuePercentage'},
    {title: 'Max. Own Revenue %', id: 'maxOwnRevenuePercentage'}
  ];

  selectedState: string = '';
  commonTableData = [];
  commonTableDataDisplay = [];
  yearForm: FormGroup;
  selectedYears: any = [];
  modalRef: BsModalRef;
  modalTableHeaders = [
    {title: 'ULB name', click: true, id: 'name'},
    {title: 'Population', id: 'population'},
    {title: 'Own Revenues (A) ', id: 'ownRevenue', description: '(Rs in crores)'},
    {title: 'Revenue Expenditure (B)', id: 'revenueExpenditure', description: '(Rs in crores)'},
    {title: 'Own Revenue % (A/B)', id: 'ownRevenuePercentage'},
  ];
  modalTableData: {
    populationCategory: string,
    year: string,
    data: any[],
  };
  loading = false;
  singleULBView = false;
  selectedUlb: { _id?: string };

  tabIndexChangeHandler(event): void {
    this.singleULBView = false;
    this.selectedUlb = {};
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

  handleError = () => {
    this.loading = false;
  };

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
    //this.filterDisplayDataTableYearWise();
  }

  onDropdownClose(event: any) {
    this.fetchData();
  }

  private fetchUlBsData(ulbIdsArray: string[]) {
    if (ulbIdsArray.length) {
      this.modalItemClicked(ulbIdsArray[ulbIdsArray.length - 1]);
    } else {
      if (this.singleULBView) {
        this.singleULBView = false;
        this.fetchData();
      }
    }
  }

  private filterDisplayDataTableYearWise() {
    switch (this.tabIndex) {
      case 2:
      case 4:
        this.renderCharts();
        break;
      case 5:
      case 3:
        for (let year of this.commonTableData) {
          let newDataRow = {};
          let allKeys = Object.keys(year.data[0]);
          for (let prop of allKeys) {
            if (typeof year.data[0][prop] == 'number') {
              let count = year.data.reduce((a, c) => a + c[prop], 0);
              newDataRow[prop] = count;
            } else {
              if (prop == 'populationCategory') {
                newDataRow[prop] = 'Total';
              }
            }
          }
          year.data.push(newDataRow);
        }
        break;
    }

  }

  private fetchTableDataSuccess = (response: any) => {
    this.loading = false;
    this.commonTableData = response['data'];
    this.commonTableDataDisplay = response['data'];
    this.filterDisplayDataTableYearWise();
    if (this.singleULBView) {
      this.modalItemClicked(this.selectedUlb._id);
    }
  };

  private callAPi(callback, args) {
    callback(args);
  }

  private fetchData() {
    this.loading = true;
    this.commonTableDataDisplay = [];
    this.commonTableHeaders = tableHeaders[this.tabIndex];
    switch (this.tabIndex) {
      case 0:
        this.dashboardService
          .fetchDependencyOwnRevenueData(JSON.stringify(this.selectedYears), this.selectedState)
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;
      case 1:
        this.dashboardService
          .fetchSourceOfRevenue(JSON.stringify(this.selectedYears), this.selectedState)
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;
      case 2:
        this.dashboardService
          .fetchFinancialRevenueExpenditure(JSON.stringify(this.selectedYears), this.selectedState)
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;
      case 3:
        this.dashboardService
          .fetchRevenueExpenditure(JSON.stringify(this.selectedYears), this.selectedState)
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;

      case 4:
        this.dashboardService
          .fetchCashAndBankBalance(JSON.stringify(this.selectedYears), this.selectedState)
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;
      case 5:
        this.dashboardService
          .fetchOutStandingDebt(JSON.stringify(this.selectedYears), this.selectedState)
          .subscribe(this.fetchTableDataSuccess, this.handleError);
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
          console.log(this.commonTableHeaders, labels);
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
    function sortCallback(a, b) {
      if (typeof a[id] == 'number') {
        return a[id] - b[id];
      } else if (!isNaN(Number(a[id]))) {
        return a[id] - b[id];
      } else if (a[id] > b[id]) {
        return -1;
      } else if (a[id] < b[id]) {
        return 1;
      } else {
        return 0;
      }
    }

    const {id} = header;
    this.commonTableDataDisplay = this.commonTableDataDisplay.map(year => {
      let totalArray = year.data[year.data.length - 1];
      year.data = year.data.slice(0, year.data.length - 1).sort(sortCallback);
      year.data = [...year.data, totalArray];
      return year;
    });
    if (header.hasOwnProperty('status') && header.status == true) {
      header.status = false;
    } else {
      header.status = true;
      this.commonTableDataDisplay = this.commonTableDataDisplay.map(year => {
        let totalArray = year.data[year.data.length - 1];
        year.data = year.data.slice(0, year.data.length - 1).reverse();
        year.data = [...year.data, totalArray];
        return year;
      });
    }
  }

  openModal(UlbModal: TemplateRef<any>, range, year) {
    this.modalTableData = {
      data: range['ulbs'],
      year,
      populationCategory: range['populationCategory']
    };
    this.modalTableHeaders[0].click = true;
    this.modalRef = this.modalService.show(UlbModal, {class: 'modal-lg'});
  }

  modalItemClicked(rowClickedId) {
    this.singleULBView = true;
    let newYears = [];
    for (let year of this.commonTableData) {
      for (let row of year.data) {
        if (row.ulbs) {
          for (let ulb of row.ulbs) {
            if (ulb._id == rowClickedId) {
              this.selectedUlb = ulb;
              let newYear = {year: year.year, data: [ulb]};
              newYears.push(newYear);
            }
          }
        }
      }
    }
    this.commonTableDataDisplay = newYears;
    this.commonTableHeaders = this.modalTableHeaders;
    this.commonTableHeaders[0].click = false;
    if (this.modalRef) {
      this.modalRef.hide();
    }

  }

  filterDataStateWise(event: string) {
    this.selectedState = event;
    this.fetchData();
  }


  sortDialogHeader(header) {

    function sortCallback(a, b) {
      if (typeof a[id] == 'number') {
        return a[id] - b[id];
      } else if (!isNaN(Number(a[id]))) {
        return a[id] - b[id];
      } else if (a[id] > b[id]) {
        return -1;
      } else if (a[id] < b[id]) {
        return 1;
      } else {
        return 0;
      }
    }

    const {id} = header;
    this.modalTableData.data = this.modalTableData.data.sort(sortCallback);
    if (header.hasOwnProperty('status') && header.status == true) {
      header.status = false;
    } else {
      header.status = true;
      this.modalTableData.data = this.modalTableData.data.reverse();
    }
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
