import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Chart} from 'chart.js';
import {DashboardService} from '../../../shared/services/dashboard/dashboard.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ModalTableHeader, modalTableHeaders, tableHeaders} from '../../home-header/tableHeaders';
import 'chartjs-plugin-labels';
import 'chartjs-plugin-title-click';
import {TableDownloader} from '../../../shared/util/tableDownload/genericTableDownload';
import {IExtraText, TableDowloadOptions} from '../../../shared/util/tableDownload/models/options';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../../../shared/components/dialog/dialog.component';

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
    // {id: '2017-18', itemName: '2017-18'}
  ];
  yearsDropdownSettings = {
    text: 'Select Years',
    primaryKey: 'id',
    badgeShowLimit: 1
  };

  commonTableHeaders: any[] = tableHeaders[0];
  tabData: any[] = [];
  selectedState: any = {};
  commonTableData = [];
  commonTableDataDisplay = [];
  yearForm: FormGroup;
  selectedYears: any = [];
  modalRef: BsModalRef;
  modalTableHeaders: ModalTableHeader[] = modalTableHeaders[0];
  modalTableData: {
    populationCategory: string,
    year: string,
    data: any[],
  };
  loading = false;
  singleULBView = false;
  selectedUlb: string;

  tabIndexChangeHandler(event): void {
    this.tabIndex = event;
    this.singleULBView = false;
    this.selectedUlb = '';
    // if (!this.tabData[event] && this.selectedState.length > 0) {
    this.selectedState = {};
    this.fetchData();
    // } else {
    this.loading = true;
    if (Chart.instances) {
      Chart.instances = {};
    }
    // setTimeout(() => this.fetchTableDataSuccess(JSON.parse(JSON.stringify(this.tabData[this.tabIndex]))), 1000);
    // }
  }

  constructor(protected formBuilder: FormBuilder,
              protected dashboardService: DashboardService,
              private modalService: BsModalService,
              private _dialog: MatDialog
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

  handleError = (e) => {
    this.commonTableData = [];
    this.commonTableDataDisplay = [];
    this.loading = false;
  };

  resetPopupValues() {
    this.selectedYears = [];
    this.yearForm.controls['years'].setValue([]);
    // this.filterDisplayDataTableYearWise();
  }

  onDropdownDeSelect(event: any) {
    console.log(event);
    this.selectedYears.splice(
      this.selectedYears.findIndex(year => event.id == year),
      1
    );
    //this.filterDisplayDataTableYearWise();
  }

  onDropdownClose(event: any) {
    this.tabData = [];
    if (this.selectedYears.length > 1) {
      this._dialog.open(DialogComponent, {
        width: '40vw',
        data: {message: 'Only ULBs with data for all of the selected years will be displayed.'}
      });
    }
    this.fetchData();
  }

  private fetchUlBsData(ulbIdsArray: string[]) {
    if (ulbIdsArray.length) {
      this.modalItemClicked(ulbIdsArray[ulbIdsArray.length - 1]);
    }
  }

  private filterDisplayDataTableYearWise() {
    switch (this.tabIndex) {
      case 1:
      case 2:
      case 3:
        this.renderCharts();
        break;
      case 4:
      case 5:
        // if (!this.tabData[this.tabIndex]) {
        for (let year of this.commonTableData) {
          if (year.data.length) {
            let newDataRow = this.getTotalRow(year.data);
            year.data.push(newDataRow);
          }
          /*  let allKeys = Object.keys(year.data[0]);
            for (let prop of allKeys) {
              if (typeof year.data[0][prop] == 'number') {
                let count = year.data.reduce((a, c) => a + c[prop], 0);
                newDataRow[prop] = count;
              } else {
                if (prop == 'populationCategory') {
                  newDataRow[prop] = 'Total';
                }
              }
            }*/
        }
        //  }
        break;
    }

  }

  fetchSingleUlbDataSuccess = (response) => {
    this.loading = false;
    let newYears = [];
    let data = response['data'];
    if (data) {
      for (let year of data) {
        try {
          if (year.data[0]['ulbs'] && year.data[0]['ulbs'].length) {
            let newYear = {year: year.year, data: year.data[0]['ulbs']};
            newYears.push(newYear);
          } else {
            let newYear = {year: year.year, data: []};
            newYears.push(newYear);
          }
        } catch (e) {
          let newYear = {year: year.year, data: []};
          newYears.push(newYear);
        }
      }
      this.commonTableDataDisplay = newYears;
      this.commonTableHeaders = modalTableHeaders[this.tabIndex];
      this.commonTableHeaders[0].click = false;
      if (this.modalRef) {
        this.modalRef.hide();
      }
    }
    if (this.tabIndex == 1 || this.tabIndex == 2 || this.tabIndex == 3) {
      this.renderCharts();
    }
  };

  private fetchTableDataSuccess = (response: any) => {
    this.commonTableDataDisplay = [];
    this.commonTableData = [];
    this.commonTableHeaders = tableHeaders[this.tabIndex].map(row => {
      delete row['status'];
      return row;
    });
    if (response['success']) {
      if (this.singleULBView) {
        this.modalItemClicked(this.selectedUlb);
      } else {
        if (response['data']) {
          this.commonTableData = response['data'];
          this.commonTableDataDisplay = response['data'];
          if (this.commonTableDataDisplay.length) {
            this.filterDisplayDataTableYearWise();
          }
        }
      }
      this.tabData[this.tabIndex] = response;
      this.loading = false;
    }
  };

  private callAPi(callback, args) {
    callback(args);
  }

  private fetchData() {
    this.loading = true;
    this.commonTableDataDisplay = [];
    this.commonTableData = [];
    this.commonTableHeaders = tableHeaders[this.tabIndex].map(row => {
      delete row['status'];
      return row;
    });

    switch (this.tabIndex) {
      case 0:
        this.dashboardService
          .fetchDependencyOwnRevenueData(JSON.stringify(this.selectedYears), this.selectedState._id, this.selectedUlb)
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;
      case 1:
        this.dashboardService
          .fetchSourceOfRevenue(JSON.stringify(this.selectedYears), this.selectedState._id)
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;
      case 2:
        this.dashboardService
          .fetchFinancialRevenueExpenditure(JSON.stringify(this.selectedYears), this.selectedState._id)
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;
      case 3:
        this.dashboardService
          .fetchRevenueExpenditure(JSON.stringify(this.selectedYears), this.selectedState._id)
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;

      case 4:
        this.dashboardService
          .fetchCashAndBankBalance(JSON.stringify(this.selectedYears), this.selectedState._id)
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;
      case 5:
        this.dashboardService
          .fetchOutStandingDebt(JSON.stringify(this.selectedYears), this.selectedState._id)
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;
    }
  }

  fetchCoverage() {
  }

  onDropDownSelectAll(event) {
    this.yearForm.controls['years'].setValue(event);
    this.selectedYears = event.map(e => e.id);
    //  this.filterDisplayDataTableYearWise();
  }

  private renderCharts() {
    if (Chart.instances) {
      Chart.instances = {};
    }
    let dataArr = this.commonTableData;
    if (this.singleULBView) {
      dataArr = this.commonTableDataDisplay;
    }

    function prependDataColorDiv(parentNode: HTMLElement, props: any) {
      const div = document.createElement('div');
      div.style.backgroundColor = props._options.backgroundColor;
      div.style.borderColor = props._options.borderColor;
      div.style.borderWidth = props._options.borderWidth;

      div.style.width = '25px';
      //div.style.borderRadius = '50%';
      div.style.height = '25px';
      div.style.marginRight = '5px';
      div.style.display = 'inline-block';
      parentNode['prepend'](div);
    }

    for (let yearRow of dataArr) {
      const elementIdPrefix = 'canvas--' + yearRow.year;
      let yearWiseCharts = [];
      let legendGenerated = false;
      /* if (this.tabIndex == 4) {
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


       }*/
      for (let index = 0; index < yearRow.data.length; index++) {
        let row = yearRow.data[index];
        const elementId = `${elementIdPrefix}--${index}`;
        // let labels: any[] = Object.keys(row).filter(key => (typeof row[key] == 'number') || !isNaN(Number(row[key])));
        let labels: any[] = Object.keys(row).filter(key => {
          if ((typeof row[key] == 'number') || !isNaN(Number(row[key]))) {
            return true;
          }
          // if (typeof row[key] === 'string') {
          //   if (!isNaN(row[key]).includes('%')) {
          //     return true;
          //   }
          // }
          return false;
        });
        labels = labels
          .filter(label => !['numOfUlb', 'total', 'population', 'rangeNum', 'totalUlb', 'taxRevenue', 'rentalIncome', 'feesAndUserCharges'].includes(label))
          .map(label => {
            let titleObj: { data?: number, name?: string } = {};
            try {
              titleObj.name = this.commonTableHeaders.find(header => header.id == label).title;
              if (typeof row[label] === 'string') {
                try {
                  titleObj.data = Number(row[label].replace('%', '')) || 0;
                } catch (e) {
                }
              } else {
                titleObj.data = row[label];
              }
            } catch (e) {
              return {name: 'Label not available', data: Number(row[label].replace('%', '')) || 0};
            }
            return titleObj;
          });
        const data = labels.map(l => l.data);
        const chartLabels = labels.map(l => l.name);
        const chartTitle = row[this.commonTableHeaders[0].id];
        setTimeout(() => {

          const c = this.renderPieChart({
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
                    render: (args) => {
                      if (args.value > 4) {
                        return args.value + '%';
                      }
                    },
                  }
                }
            }
          });
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
                containerUl[0].style.padding = '0';
                containerUl[0].style.alignItems = 'flex-start';
                containerUl[0].style.justifyContent = 'center';
                containerUl[0].style.flexWrap = 'wrap';

                containerUl[0].style.marginTop = '1rem';
              }
            }

            for (let i = 0; i < legendItems.length; i++) {
              yearWiseCharts[0].chart.getDatasetMeta(0).data.forEach(meta => {
                if (meta._index == i) {
                  legendItems[i].style.display = 'flex';
                  legendItems[i].style.marginRight = '5px';
                  //legendItems[i].style.flexDirection = 'column';
                  // legendItems[i].style.textAlign = 'center';
                  //legendItems[i].style.justifyContent = 'center';
                  legendItems[i].style.alignItems = 'center';
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
        }, 10);
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
        title: {
          display: false,
          text: chartTitle,
        },
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) => {
              const title = data.labels[tooltipItem[0].index];
              if (title.split(' ').length > 3) {
                return [
                  [title.split(' ').slice(0, 3).join(' ')],
                  [title.split(' ').slice(3, title.split(' ').length).join(' ')]
                ];
              }
              return title;
            },
            label: (tooltipItem, data) => {
              const label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              // if (!this.singleULBView) {
              return label + '%';
              // }
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

  getTotalRow(rows: any[], headers = this.commonTableHeaders) {
    let newDataRow = {};
    for (let obj of headers) {
      let prop = obj.id;
      let col = headers.find((col: ModalTableHeader) => col.id === prop);
      if (col) {
        if (col.total) {
          if (typeof rows[0][prop] == 'number') {
            let count = rows.reduce((a, c) => a + c[prop], 0);
            newDataRow[prop] = this.fixToDecimalPlace(count, 2);
          } else {
            if (!isNaN(rows[0][prop])) {
              let count = rows.reduce((a, c) => a + Number(c[prop]), 0);
              newDataRow[prop] = this.fixToDecimalPlace(count, 2);
            }
          }
        }
        if (prop == 'populationCategory') {
          newDataRow[prop] = 'Total';
        }
      }
    }
    return newDataRow;
  }

  openModal(UlbModal: TemplateRef<any>, range, year) {
    this.modalTableHeaders = modalTableHeaders[this.tabIndex];
    const totalRow = this.getTotalRow(range['ulbs'], this.modalTableHeaders);
    totalRow['name'] = 'Total';
    const ORPcolumn = this.modalTableHeaders.find(col => col.id === 'ownRevenuePercentage');
    if (ORPcolumn) {
      totalRow['ownRevenuePercentage'] = Number((Number(totalRow['ownRevenue']) / Number(totalRow['revenueExpenditure'])) * 100).toFixed(2) + '%';
    }
    this.modalTableData = {
      data: range['ulbs']
        .sort((a, b) => this.sortCallBack(a, b, 'population'))
        .reverse()
        .concat([totalRow]),
      year,
      populationCategory: range['populationCategory']
    };
    this.modalTableHeaders[0].click = true;
    this.modalTableHeaders = this.modalTableHeaders.map((modal: any) => {
      delete modal['status'];
      return modal;
    });

    this.modalRef = this.modalService.show(UlbModal, {class: 'modal-uq'});
  }


  modalItemClicked(rowClickedId, row: any = {}) {
    this.selectedUlb = rowClickedId;
    this.loading = true;
    this.tabData = [];
    switch (this.tabIndex) {
      case 0:
        this.dashboardService.fetchDependencyOwnRevenueData(JSON.stringify(this.selectedYears), this.selectedState._id, rowClickedId)
          .subscribe(this.fetchSingleUlbDataSuccess, this.handleError);
        break;
      case 1:
        this.dashboardService.fetchSourceOfRevenue(JSON.stringify(this.selectedYears), this.selectedState._id, rowClickedId)
          .subscribe(this.fetchSingleUlbDataSuccess, this.handleError);
        break;
      case 2:
        this.dashboardService.fetchFinancialRevenueExpenditure(JSON.stringify(this.selectedYears), this.selectedState._id, rowClickedId)
          .subscribe(this.fetchSingleUlbDataSuccess, this.handleError);
        break;
      case 3:
        this.dashboardService.fetchRevenueExpenditure(JSON.stringify(this.selectedYears), this.selectedState._id, rowClickedId)
          .subscribe(this.fetchSingleUlbDataSuccess, this.handleError);
        break;
      case 4:
        this.dashboardService.fetchCashAndBankBalance(JSON.stringify(this.selectedYears), this.selectedState._id, rowClickedId)
          .subscribe(this.fetchSingleUlbDataSuccess, this.handleError);
        break;
      case 5:
        this.dashboardService.fetchOutStandingDebt(JSON.stringify(this.selectedYears), this.selectedState._id, rowClickedId)
          .subscribe(this.fetchSingleUlbDataSuccess, this.handleError);
        break;
    }
    this.singleULBView = true;
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  filterDataStateWise(event: any) {
    if (event) {
      this.selectedState = event;
    } else {
      this.selectedState = {};
    }
    this.singleULBView = false;
    this.selectedUlb = '';
    this.tabData = [];
    this.fetchData();
  }


  sortCallBack(a, b, id) {
    let aVal = a[id], bVal = b[id];

    if (typeof a[id] === 'object') {
      aVal = a[id].value;
      bVal = b[id].value;
    }
    if (typeof aVal !== 'number' && aVal.includes('%')) {
      aVal = aVal.replace('%', '');
      bVal = bVal.replace('%', '');
    }
    if (id === 'populationCategory') {
      let populationCategoryObj = {
        '< 1 Lakh': 0,
        '1 Lakh to 10 Lakhs': 1,
        '> 10 Lakhs': 2
      };
      aVal = populationCategoryObj[aVal];
      bVal = populationCategoryObj[bVal];
    }

    if (typeof aVal == 'number') {
      return ((aVal - bVal) == 0) ? -1 : aVal - bVal;
    } else if (!isNaN(Number(aVal))) {
      return ((aVal - bVal) == 0) ? -1 : aVal - bVal;
    } else if (aVal >= bVal) {
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

  downloadTable(elementId = 'table') {
    const tabHeading = [
      'Extent of Dependency on Own Revenues',
      'Sources of Revenue',
      'Sources of Financing Revenue Expenditure',
      'Avenues of Revenue Expenditure',
      'Cash and Bank Balance',
      'Outstanding Debt'


    ];


    const tableElement = <HTMLTableElement>document.getElementById(elementId);
    let tableHeaderText = 'India';
    if (this.selectedState.hasOwnProperty('_id')) {
      tableHeaderText = this.selectedState.name;
    }
    let textFor2ndRow = `File downloaded on  ${new Date().toLocaleDateString()}. `;
    let tabHeadingRow = tabHeading[this.tabIndex];
    let options: TableDowloadOptions = {
      filename: 'table',
      extension: 'xlsx',
      extraTexts: {
        atTop: {
          rows: [
            {
              columns: [
                {
                  text: tabHeadingRow,
                  bold: 'true',
                  text_align: 'center',
                  font_size: '14',
                  colSpan: elementId == 'table' ? this.modalTableHeaders.length : this.commonTableHeaders.length
                }
              ]
            }, {
              columns: [
                {
                  text: tableHeaderText,
                  bold: 'true',
                  text_align: 'center',
                  font_size: '14',
                  colSpan: elementId == 'table' ? this.modalTableHeaders.length : this.commonTableHeaders.length
                }
              ]
            }
          ],
        },
        atBottom: {
          rows: [{
            columns: [{
              text: textFor2ndRow,
              bold: 'false',
              text_align: 'right',
              font_size: '12',
              colSpan: elementId == 'table' ? this.modalTableHeaders.length : this.commonTableHeaders.length
            }]
          }],
        }
      }
    };
    if (tableElement) {
      let tableDownloader = TableDownloader.getInstance();
      tableDownloader.downloadTable(tableElement, {
        ...options
      });
    }
  }

  ngOnDestroy() {
    this.modalService.hide(1);
  }

}

