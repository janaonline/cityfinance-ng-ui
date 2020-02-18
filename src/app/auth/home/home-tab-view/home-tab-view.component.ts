import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Chart} from 'chart.js';
import {DashboardService} from '../../../shared/services/dashboard/dashboard.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {tableHeaders} from '../../home-header/tableHeaders';
import 'chartjs-plugin-labels';

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

  commonTableHeaders: any[] = tableHeaders[0];

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
      years: [[this.yearLookup[1]]]
    });
    this.selectedYears = [this.yearLookup[1].id];
  }

  ngOnInit() {
    this.fetchData();
  }

  onDropdownSelect(event: any) {
    this.selectedYears.push(event.id);
    //  this.filterDisplayDataTableYearWise();
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
      case 3:
      case 1:
        this.renderCharts();
        break;
      case 4:
      case 5:
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
    this.commonTableData = [];
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
    if (Chart.instances) {
      Chart.instances = {};
    }

    function prependDataColorDiv(parentNode: HTMLElement, props: any) {
      const div = document.createElement('div');
      div.style.backgroundColor = props._options.backgroundColor;
      div.style.borderColor = props._options.borderColor;
      div.style.borderWidth = props._options.borderWidth;
      div.style.width = '25px';
      div.style.height = '25px';
      div.style.display = 'inline-block';
      parentNode['prepend'](div);
    }

    for (let yearRow of this.commonTableData) {
      const elementIdPrefix = 'canvas--' + yearRow.year;
      let yearWiseCharts = [];
      let legendGenerated = false;
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
      } else {
        for (let index = 0; index < yearRow.data.length; index++) {
          let row = yearRow.data[index];
          const elementId = `${elementIdPrefix}--${index}`;
          let labels: any[] = Object.keys(row).filter(key => (typeof row[key] == 'number') || !isNaN(Number(row[key])));
          labels = labels
            .filter(label => !['numOfUlb', 'totalUlb', 'taxRevenue', 'rentalIncome', 'feesAndUserCharges'].includes(label))
            .map(label => {
              let titleObj: { data?: number, name?: string } = {};
              try {
                titleObj.name = this.commonTableHeaders.find(header => header.id == label).title;
                titleObj.data = row[label];
              } catch (e) {
                return {name: 'Label not available', data: row[label]};
              }
              return titleObj;
            });
          const data = labels.map(l => l.data);
          const chartLabels = labels.map(l => l.name);
          const chartTitle = row[this.commonTableHeaders[0].id];
          setTimeout(() => {
            let c = this.renderPieChart({
                type: 'pie',
                data,
                labels: chartLabels,
                elementId,
                chartTitle,
                legend: false,
                options: {
                  plugins:
                    {
                      labels: {
                        position: 'border',
                        fontColor: (data) => {
                          if (data.dataset.backgroundColor[data.index]) {
                            const rgb = this.hexToRgb(data.dataset.backgroundColor[data.index]);
                            const threshold = 140;
                            const luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
                            return luminance > threshold ? 'black' : 'white';
                          }
                          return 'black';
                        }
                        ,
                        render: function (args) {
                          if (args.value > 4) {
                            return args.value;
                          }
                        },
                      }
                    }
                }
              })
            ;
            yearWiseCharts.push(c);
            if (!legendGenerated) {
              let legendClass = `.legend-${yearRow.year}`;
              document.querySelector(legendClass).innerHTML = c.generateLegend();
              const legendItems = document.querySelector(legendClass).getElementsByTagName('li');
              const legendItemContainer = document.querySelector(legendClass);
              if (legendItemContainer) {
                const containerUl = legendItemContainer.getElementsByTagName('ul');
                if (containerUl.length) {
                  containerUl[0].style.display = 'flex';
                  containerUl[0].style.alignItems = 'flex-start';
                  containerUl[0].style.marginTop = '1rem';
                }
              }
              for (let i = 0; i < legendItems.length; i++) {
                yearWiseCharts[0].chart.getDatasetMeta(0).data.forEach(meta => {
                  if (meta._index == i) {
                    legendItems[i].style.display = 'flex';
                    legendItems[i].style.flexDirection = 'column';
                    legendItems[i].style.justifyContent = 'center';
                    legendItems[i].style.padding = '1rem';
                    prependDataColorDiv(legendItems[i], meta);
                  }
                });

                /**
                 * Below code adds the hide/show functionality on custom legends
                 */
                /*legendItems[i].addEventListener('click', (e) => {
                  for (let yearChart of yearWiseCharts) {
                    yearChart.chart.getDatasetMeta(0).data.forEach(meta => {
                      if (meta._index == i) {
                        if (meta.hidden) {
                          legendItems[i].innerHTML = legendItems[i].textContent;
                        } else {
                          legendItems[i].innerHTML = legendItems[i].textContent.strike();
                        }
                        meta.hidden = !meta.hidden;
                        prependDataColorDiv(legendItems[i], meta);
                        yearChart.chart.update();
                      }
                    });
                  }
                }, false);*/
              }
              legendGenerated = true;
            }
          }, 1);
        }
      }
    }
  }

  hexToRgb(colorString) {
    const result = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  renderPieChart({
                   type = 'pie',
                   labels,
                   data,
                   chartTitle,
                   elementId,
                   legend = true,
                   options = {}
                 }) {


    return new Chart(elementId, {
      type,
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'

            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        onClick: function (e, v) {
          // console.log('clicked', e, v);
        },
        title: {
          onClick: function (e, titleBlock) {
          },
          display: true,
          text: chartTitle
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem, data) {
              const title = data.labels[tooltipItem[0].index];
              if (title.split(' ').length > 3) {
                return [
                  [title.split(' ').slice(0, 3).join(' ')],
                  [title.split(' ').slice(3, title.split(' ').length).join(' ')]
                ];
              }
              return title;
            },
            label: function (tooltipItem, data) {
              const label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return label + '%';
            }
          },
        },
        legend: {
          display: legend,
          position: 'bottom',
        },
        responsive: true,
        ...options,
      },
    });
  }

  sortHeader(header) {
    const {id} = header;
    this.commonTableDataDisplay = this.commonTableDataDisplay.map(year => {
      let totalArray = year.data[year.data.length - 1];
      year.data = year.data.slice(0, year.data.length - 1).sort((a, b) => this.sortCallBack(a, b, id));
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

  fixToDecimalPlace(count, n = 2) {
    if (count.toString().includes('.')) {
      return Number(count).toFixed(n);
    } else {
      return count;
    }
  }

  getTotalRow(rows: any[]) {
    let newDataRow = {};
    let allKeys = Object.keys(rows[0]);
    for (let prop of allKeys) {
      if (typeof rows[0][prop] == 'number') {
        let count = rows.reduce((a, c) => a + c[prop], 0);
        newDataRow[prop] = this.fixToDecimalPlace(count, 2);
      } else {
        if (!isNaN(rows[0][prop])) {
          let count = rows.reduce((a, c) => a + Number(c[prop]), 0);
          newDataRow[prop] = this.fixToDecimalPlace(count, 2);
        }
        if (prop == 'populationCategory') {
          newDataRow[prop] = 'Total';
        }
      }
    }
    return newDataRow;
  }

  openModal(UlbModal: TemplateRef<any>, range, year) {

    const totalRow = this.getTotalRow(range['ulbs']);
    totalRow['name'] = 'Total';
    this.modalTableData = {
      data: range['ulbs'].concat([totalRow]),
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


  sortCallBack(a, b, id) {
    let aVal = a[id], bVal = b[id];
    if (typeof a[id] != 'number' && a[id].includes('%')) {
      aVal = a[id].replace('%', '');
      bVal = b[id].replace('%', '');
    }
    if (typeof aVal == 'number') {
      return aVal - bVal;
    } else if (!isNaN(Number(aVal))) {
      return aVal - bVal;
    } else if (aVal > bVal) {
      return -1;
    } else if (aVal < bVal) {
      return 1;
    } else {
      return 0;
    }
  }

  sortDialogHeader(header) {

    const {id} = header;
    let totalArray = this.modalTableData.data[this.modalTableData.data.length - 1];
    this.modalTableData.data = this.modalTableData.data
      .slice(0, this.modalTableData.data.length - 1)
      .sort((a, b) => this.sortCallBack(a, b, id))
      .concat(totalArray);
    if (header.hasOwnProperty('status') && header.status == true) {
      header.status = false;
    } else {
      header.status = true;
      this.modalTableData.data = this.modalTableData.data
        .slice(0, this.modalTableData.data.length - 1)
        .reverse()
        .concat(totalArray);
    }
  }
}

