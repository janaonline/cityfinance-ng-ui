import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chart, ChartOptions } from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as XLSX from 'xlsx';


declare var require: any;
const colorData = require('../../../assets/files/colors.json');
import { RankingService } from '../../shared/services/ranking.service.js';

declare const $: any;

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RankingComponent implements OnInit {
  years = new FormControl();

  showLoader = false;

  selectedYear: any = ['2015-16', '2016-17'];

  // filters start
  overallFilter = 'Over 10 Lakh';
  overallList = [
    { id: 2, label: 'Less than 50 Thousand', min: 0, max: 49999 },
    {
      id: 3,
      label: 'Over 50 Thousand but less than 1 Lakh',
      min: 50000,
      max: 99999
    },
    {
      id: 4,
      label: 'Over 1 Lakh but less than 3 Lakh',
      min: 100000,
      max: 299999
    },
    {
      id: 5,
      label: 'Over 3 Lakh but less than 5 Lakh',
      min: 300000,
      max: 499999
    },
    {
      id: 6,
      label: 'Over 5 Lakh but less than 10 Lakh',
      min: 500000,
      max: 999999
    },
    { id: 7, label: 'Over 10 Lakh', min: 1000000, max: 1000000000000 }
  ];

  financialFilter = 'Overall';
  financialList = [
    { id: 1, value: 'Overall', viewValue: 'Overall' },
    {
      id: 2,
      value: 'Financial Accountability',
      viewValue: 'Financial Accountability'
    },
    {
      id: 3,
      value: 'Financial performance',
      viewValue: 'Financial Performance'
    },
    { id: 4, value: 'Financial position', viewValue: 'Financial Position' }
  ];

  financialReportFilter = '';
  financialReportList = this.financialList.slice();

  stateFilter = '';
  stateList: any = null;

  stateReportFilter = '';
  stateReportList: any = null;

  ulbTypeFilter = '';
  ulbTypeReportList: any = null;
  ulbTypeList: any = null;

  listData: any = [];

  /** control for the selected bank for option groups */
  public ulbFilter: FormControl = new FormControl();

  /** control for the MatSelect filter keyword for option groups */
  public ulbFilterCtrl: FormControl = new FormControl();

  /** list of bank groups filtered by search keyword for option groups */
  public ulbList = new Subject<any>();

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  @ViewChild('reportTable') reportTable: ElementRef;
  //  ulbList:any = null;

  // anotherList: any[] = [
  //   this.overallList[3],
  // ]

  // fiters end

  statesPill: any = null;

  statesPillClone: any = null;

  legends = null;

  headers: any = {
    0: { key: 'name', color: '#333', status: 0 },
    1: { key: 'stateRank', color: '#333', status: 0 },
    2: { key: 'nationalRank', color: '#333', status: 0 },
    3: { key: 'indexScore', color: '#333', status: 0 }
  };

  mainData: any = null;

  scoreData: any = null;

  tableData: any = null;

  tbleRows: any = [];

  colorsData: any = colorData;

  // dummyColor:any = Object.keys(colorData);

  chartDataset: any = null;

  rankTableData: any = null;

  filters: any = {
    population: [
      // { label: '1 to 1000', min: 1, max: 1000 },
      // { label: '1001 to 2000', min: 1001, max: 2000 },
      // { label: '2001 to 3000', min: 2001, max: 3000 },
      { label: 'Over 10 Lakh', min: 1000000, max: 1000000000000 }
    ],
    finance: ['Overall'],
    state: ''
  };

  nationalAvg: any = null;

  constructor(private rankingService: RankingService) {}

  async ngOnInit() {
    await this.getAllUlbData();
    await this.scoreReportData();
  }

  async scoreReportData() {
    // this.showLoader = true;
    await this.rankingService.rankReportData().subscribe(async (res: any) => {
      this.scoreData = await res.data;
      // console.log(this.scoreData);
      this.stateReportList = this.distinctObjectFromArrayState(
        this.scoreData.slice()
      ).map(x => {
        return { id: x.id, name: x.name, state: x.state };
      });

      // console.log(this.stateReportList);
      // this.showLoader = false;
      // this.ulbTypeReportList = this.distinctObjectFromArrayUlb(this.scoreData.slice());
    });
  }

  protected filterULBData() {
    if (!this.listData) {
      return;
    }
    // get the search keyword
    let search = this.ulbFilterCtrl.value;
    const listCopy = this.filterULBGroups(this.listData);
    if (!search) {
      this.ulbList.next(listCopy);
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.ulbList.next(
      listCopy.filter(listGroup => {
        const showlistGroup =
          listGroup.state.toLowerCase().indexOf(search) > -1;
        if (!showlistGroup) {
          listGroup.ulbs = listGroup.ulbs.filter(
            list => list.name.toLowerCase().indexOf(search) > -1
          );
        }
        return listGroup.ulbs.length > 0;
      })
    );
  }

  protected filterULBGroups(data: any) {
    const dataCopy = [];
    data.forEach(dataX => {
      dataCopy.push({
        state: dataX.state,
        ulbs: dataX.ulbs.slice()
      });
    });
    // console.log(dataCopy);
    return dataCopy;
  }

  async getAllUlbData() {
    this.showLoader = true;
    this.mainData = null;
    const pop = this.overallList.find(x => x.label == this.overallFilter);
    const finance = this.financialList.find(
      x => x.viewValue == this.financialFilter
    );

    const obj = {
      populationId: pop.id,
      financialParameter: finance.id
    };

    this.rankingService.heatMapFilter(obj).subscribe(async (res: any) => {
      this.mainData = await res.data;
      this.setNationalAverage(res.data[0]);
      this.showLoader = false;
      // console.log(this.mainData);
      this.mapColorMainData();
    });
  }

  onTabChanged($event) {
    const clickedIndex = $event.index;

    if (clickedIndex == 0) {
      $('canvas#canvas').remove();
      $('div.chart-container').append('<canvas id="canvas"></canvas>');
      this.plotScatterChart();
    }
  }

  async stateChangeRank() {
    // this.mainData = null;
    this.showLoader = true;
    const pop = this.overallList.find(x => x.label == this.overallFilter);
    const obj = {
      populationId: pop.id
    };

    this.rankingService.heatMapFilter(obj).subscribe(async (res: any) => {
      this.mainData = await res.data;
      this.getStatesList();
      this.stateFilter = '';
      this.showLoader = false;
    });
  }

  getStatesList() {
    const data = this.mainData.slice();
    this.stateList = this.distinctObjectFromArrayState(data);
    this.stateList.unshift({ id: '', name: 'All States' });

    this.stateReportList = this.distinctObjectFromArrayState(data);
  }

  getUlbList() {
    let data = this.mainData.slice();

    // this.ulbList.push({id: '', name: 'All'});

    if (this.stateFilter) {
      data = data.filter(x => x.state._id == this.stateFilter);
    }

    this.ulbTypeList = this.distinctObjectFromArrayUlb(data);

    // console.log(data);

    // console.log(this.ulbList);

    const shapeArr = ['square', 'circle', 'triangle-up'];

    const values = this.ulbTypeList.slice();
    this.legends = values.map((x, index) => {
      return {
        ulbId: x.id,
        ulbName: x.value,
        color: '#ffc500',
        status: true,
        class: shapeArr[index]
      };
    });
  }

  toggleChartData(id, via = '', ulId = '') {
    $('canvas#canvas').remove();
    $('div.chart-container').append('<canvas id="canvas"></canvas>');
    if (via) {
      this.statesPill = this.statesPillClone.slice();
      // change label to active or inactive
      if (this.legends[id - 1].color == '#ffc500') {
        this.legends[id - 1].color = '#555';
      } else {
        this.legends[id - 1].color = '#ffc500';
      }

      const index = this.legends.findIndex(item => item.ulbId == ulId);

      const status = this.legends[index].status;

      if (status) {
        this.legends[index].status = false;
      } else {
        this.legends[index].status = true;
      }
      // //console.log(this.legends);

      this.chartDataFormat('', 'pills', id);
    } else {
      const index = this.statesPill.findIndex(item => item.id == id);

      const status = this.statesPill[index].status;

      if (status) {
        this.statesPill[index].status = false;
      } else {
        this.statesPill[index].status = true;
      }
      this.chartDataFormat('', 'pills');
    }
  }

  rankTableDataFormat(financialType, sortBy, stateId, population) {
    // //console.log(this.filters);

    let tableData = this.mainData.slice();

    // sort by state filter
    if (stateId) {
      tableData = tableData.filter(row => row.state._id == stateId);
    }

    // console.log(tableData);

    // sort by type
    if (financialType.length) {
      tableData = this.filterByFinancialTransparency(financialType, tableData);
    }

    if (population.length) {
      tableData = this.filterByOverall(population, tableData);
      // console.log(tableData);
    }

    // sort by table column
    if (sortBy) {
      tableData = tableData.sort((a, b) =>
        a[sortBy] > b[sortBy] ? 1 : b[sortBy] > a[sortBy] ? -1 : 0
      );
    }

    this.rankTableData = tableData;

    // console.log(this.rankTableData);
    // const distinct = (value, index, self) => {
    //   return self.indexOf(value) === index;
    // }
  }

  chartDataFormat(stateId = '', via = '', ulbId = '') {
    let chartData = this.mainData.slice();
    if (via) {
      let result = [];

      if (ulbId) {
        const data = this.legends.slice();

        const activeLegends = data.filter(legend => legend.status == true);
        // console.log(activeLegends);

        activeLegends.forEach(item => {
          const dummy = chartData.slice();
          const legend = dummy.filter(val => val.ulbType._id == item.ulbId);
          result.push(...legend);
        });

        // console.log(result);

        let states = [];
        result.forEach(ulb => {
          const pill = this.statesPill.find(state => state.id == ulb.state._id);
          if (pill) {
            states.push(pill);
          }
        });

        states = this.distinctObjectFromArrayStateName(states);

        this.statesPill = states.map(item => {
          item['status'] = true;
          return item;
        });
      } else {
        const data = this.statesPill.slice();

        const activeStates = data.filter(state => state.status == true);

        activeStates.forEach(item => {
          const state = chartData
            .slice()
            .filter(val => val.state._id == item.id);
          result.push(...state);
        });
      }

      // console.log(this.statesPill);

      if (this.statesPill.length) {
        const values = [];
        this.statesPill.forEach(item => {
          const val = result.slice().filter(x => x.state._id == item.id);
          if (val) {
            values.push(...val);
          }
        });
        // console.log(values);
        result = values;
        chartData = result;
        // console.log(chartData, 'length');
      } else {
        chartData = [];
      }
    }

    // filter by state filter
    if (stateId) {
      chartData = chartData.filter(row => row.state._id == stateId);
    }

    chartData = this.filterByOverall(this.filters.population, chartData);
    // //console.log(result);

    chartData = this.filterByFinancialTransparency(
      [...this.filters.finance],
      chartData
    );

    const data = [];

    const typeArr = [
      { type: 'rect', pointRadius: 10 },
      { type: 'circle', pointRadius: 8 },
      { type: 'triangle', pointRadius: 10 }
    ];

    // chart labels for shapes
    // 1 -> Municipal Corporation
    // 2 -> Muncipality
    // 3 -> Town Panchayat

    // console.log(chartData);

    this.ulbTypeList.forEach((type, index) => {
      const filteredData = chartData
        .filter(item => item.ulbType._id == type.id)
        .map(val => {
          return {
            x: val.population,
            y: val.overallIndexScore.toFixed(2),
            name: val.name
          };
        });

      const colorPoints = chartData
        .filter(item => item.ulbType._id == type.id)
        .map(item => {
          return item.color;
        });

      data.push({
        label: type.value,
        data: filteredData,
        pointColor: colorPoints,
        type: typeArr[index].type,
        pointRadius: typeArr[index].pointRadius
      });
    });

    this.chartDataset = data;
    setTimeout(() => {
      this.plotScatterChart();
    }, 200);
  }

  pillsDataFormat(stateId = '') {
    const pillMainData = this.mainData.slice();
    // filters by overall
    let pillData = this.filterByOverall(this.filters.population, pillMainData);

    // filter by state
    if (stateId) {
      pillData = pillData.filter(row => row.state._id == stateId);
    }

    const data = this.distinctObjectFromArrayState(pillData);

    pillData = data.map(item => {
      return {
        name: item.name,
        id: item.id,
        color: item.color,
        ulbId: item.ulbType,
        status: true,
        hide: false
      };
    });

    this.statesPill = pillData;
    this.statesPillClone = pillData;
  }

  plotScatterChart() {
    const color = Chart.helpers.color;
    const scatterChartData = {
      datasets: [
        // {
        //   pointStyle:'rect',
        //   backgroundColor: '#555',
        //   label: 'Municipal Corporation',
        //   pointRadius: 10,
        //   pointBackgroundColor: this.chartDataset[0].pointColor,
        //   borderColor: '#ddd',
        //   data: this.chartDataset[0].data
        // },
        // {
        //   backgroundColor: '#555',
        //   pointStyle:'circle',
        //   pointRadius: 8,
        //   label: 'Town Panchayat',
        //   pointBackgroundColor: this.chartDataset[1].pointColor,
        //   borderColor: '#ddd',
        //   data: this.chartDataset[1].data
        // },
        // {
        //   backgroundColor: '#555',
        //   pointStyle:'triangle',
        //   pointRadius: 10,
        //   label: 'Town Panchayat',
        //   pointBackgroundColor: this.chartDataset[2].pointColor,
        //   borderColor: '#ddd',
        //   data: this.chartDataset[2].data
        // }
      ]
    };

    this.chartDataset.forEach(element => {
      scatterChartData.datasets.push({
        type: 'scatter',
        pointStyle: element.type,
        backgroundColor: '#555',
        label: element.label,
        pointRadius: element.pointRadius,
        pointBackgroundColor: element.pointColor,
        borderColor: 'black',
        data: element.data
      });
    });

    const canvas: any = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const chartScatter = new Chart(ctx, {
      type: 'scatter',
      data: scatterChartData,
      options: {
        title: {
          display: false,
          text: 'Chart.js Scatter Chart'
        },
        legend: {
          display: false,
          position: 'top',
          align: 'center'
        },
        tooltips: {
          callbacks: {
            title: function(tooltipItem, data) {
              const val = data.datasets[tooltipItem[0].datasetIndex].data.find(
                label => label.x == tooltipItem[0].xLabel
              );
              return val.name;
            },
            label: function(tooltipItem, data) {
              return (
                '( Population : ' +
                tooltipItem.xLabel +
                ' , Index Score : ' +
                tooltipItem.yLabel +
                ' )'
              );
            }
            // afterLabel: function(tooltipItem, data) {
            //   var dataset = data['datasets'][0];
            //   var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
            //   return '(' + percent + '%)';
            // }
          }
        },
        scales: {
          xAxes: [
            {
              type: 'linear',
              position: 'bottom',
              ticks: {
                userCallback: function(tick) {
                  if (tick > 999) {
                    if (tick % 1 === 0) {
                      tick = tick / 1000;
                    } else {
                      tick = (tick / 1000).toFixed(3);
                    }
                    return tick.toString() + 'k';
                  } else {
                    return tick.toString();
                  }
                }
              },
              scaleLabel: {
                labelString: 'Population',
                display: true
              }
            }
          ],
          yAxes: [
            {
              type: 'linear',
              ticks: {
                // userCallback: function(tick) {
                // 	return tick.toString() + 'dB';
                // }
              },
              scaleLabel: {
                labelString: 'Index Score',
                display: true
              }
            }
          ]
        },
        annotation: {
          annotations: [
            {
              drawTime: 'afterDatasetsDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-1',
              value: this.mainData[0].nationalAverageOverallIndexScore.toFixed(),
              borderColor: 'black',
              borderWidth: 2,
              label: {
                enabled: false,
                content: 'National Average'
              }
            }
          ]
        }
      } as ChartOptions,
      plugins: [ChartAnnotation]
    });
  }

  async filterData() {
    Object.keys(this.headers).forEach(x => {
      this.headers[x].color = '#333333';
      this.headers[x].status = 0;
    });
    this.showLoader = true;
    this.mainData = null;
    $('canvas#canvas').remove();
    $('div.chart-container').append('<canvas id="canvas"></canvas>');
    // this.overallFilter.setValue(this.anotherList);

    // this.mainData = null;
    const pop = this.overallList.find(x => x.label == this.overallFilter);
    const obj = {
      populationId: pop.id
    };

    await this.rankingService.heatMapFilter(obj).subscribe(async (res: any) => {
      this.mainData = await res.data;
      this.setNationalAverage(res.data[0]);

      this.filters.population = [pop];
      this.filters.finance = [this.financialFilter];
      this.filters.state = this.stateFilter;
      this.showLoader = false;
      this.mapColorMainData('filter');
    });
  }

  setNationalAverage(avgData) {
    switch (this.financialFilter) {
      case 'Overall':
        this.nationalAvg = avgData.nationalAverageOverallIndexScore;
        break;
      case 'Financial Accountability':
        this.nationalAvg =
          avgData.nationalAverageFinancialAccountabilityIndexScore;
        break;
      case 'Financial performance':
        this.nationalAvg =
          avgData.nationalAverageFinancialPerformanceIndexScore;
        break;
      default:
        this.nationalAvg = avgData.nationalAverageFinancialPositionIndexScore;
        break;
    }
    console.log(avgData, this.nationalAvg);
  }

  // common functions
  // check range between
  between(x, min, max) {
    return x >= min && x <= max;
  }

  distinct(value, index, self) {
    return self.indexOf(value) === index;
  }

  distinctObjectFromArrayState(array) {
    const result = Array.from(array.map(x => x.state._id).filter(this.distinct))
      .map(id => {
        return {
          id: array.find(s => s.state._id === id).state._id,
          name: array.find(s => s.state._id === id).state.name,
          color: array.find(s => s.state._id === id).color,
          backColor: array.find(s => s.state._id === id).backColor,
          ulbType: array.find(s => s.state._id === id).ulbType.name,
          ulbId: array.find(s => s.state._id === id)._id,
          state: array.find(s => s.state._id === id).state
        };
      })
      .sort((x, y) => {
        const textA = x.name.toUpperCase();
        const textB = y.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    return result;
  }

  distinctObjectFromArrayUlb(array) {
    const result = Array.from(
      array.map(x => x.ulbType._id).filter(this.distinct)
    ).map(id => {
      return {
        id: array.find(s => s.ulbType._id === id).ulbType._id,
        value: array.find(s => s.ulbType._id === id).ulbType.name,
        state: array.find(s => s.ulbType._id === id).state
      };
    });
    return result;
  }

  distinctObjectFromArrayStateName(array) {
    const result = Array.from(array.map(x => x.name).filter(this.distinct)).map(
      id => {
        return {
          id: array.find(s => s.name === id).id,
          name: array.find(s => s.name === id).name,
          color: array.find(s => s.name === id).color,
          hide: array.find(s => s.name === id).hide,
          status: array.find(s => s.name === id).status
        };
      }
    );
    return result;
  }

  filterByFinancialTransparency(keys: any = [], dataInput: any = []) {
    const filteredData = [];

    for (let i = 0; i < keys.length; i++) {
      const values = dataInput.map(row => {
        const data = row['financialParameters'].find(x => x.type == keys[i]);
        return { ...data, ...row };
      });
      filteredData.push(...values);
    }
    return filteredData;
  }

  filterByOverall(keys: any = [], dataInput: any = []) {
    const filteredData = [];

    for (let i = 0; i < keys.length; i++) {
      const values = dataInput
        .map(row => {
          if (this.between(row.population, keys[i].min, keys[i].max)) {
            return row;
          }
          return;
        })
        .filter(item => item);
      filteredData.push(...values);
    }
    return filteredData;
  }

  sortTableData(key, order, index) {
    // console.log(key, order, index);
    if (order == -1 || order == 0) {
      Object.keys(this.headers).forEach((x, i) => {
        if (i == index) {
          this.headers[i].status = 1;
          this.headers[i].color = '#43b8ea';
        } else {
          this.headers[i].status = 0;
          this.headers[i].color = '#555';
        }
      });
      console.log(this.headers);
      // ascending
      this.rankTableData.sort((a, b) =>
        a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0
      );
    } else {
      Object.keys(this.headers).forEach((x, i) => {
        if (i == index) {
          this.headers[i].status = -1;
          this.headers[i].color = '#43b8ea';
        } else {
          this.headers[i].status = 0;
          this.headers[i].color = '#555';
        }
      });

      // descending
      this.rankTableData.sort((a, b) =>
        a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0
      );
    }
  }

  mapColorMainData(via = '') {
    const totalColors = Object.keys(this.colorsData);
    const stateColorObj = {};
    const stateColors = [];
    for (const d of this.mainData) {
      for (const col in stateColorObj) {
        stateColors.indexOf(stateColorObj[col].key) < 0
          ? stateColors.push(stateColorObj[col].key)
          : '';
      }
      const availableColors = totalColors.filter(
        y => stateColors.indexOf(y) < 0
      );
      if (!stateColorObj.hasOwnProperty(d.state.code)) {
        stateColorObj[d.state.code] = availableColors.length
          ? this.colorsData[availableColors[0]]
          : this.colorsData[totalColors[0]];
      }
      d['color'] = stateColorObj[d.state.code]['color'];
      d['backColor'] = stateColorObj[d.state.code]['bg'];
    }

    this.rankTableDataFormat(
      this.filters.finance,
      'nationalRanking',
      this.filters.state,
      this.filters.population
    );
    this.getStatesList();
    this.getUlbList();

    if (via) {
      this.chartDataFormat(this.filters.state, '', '');
      this.pillsDataFormat(this.filters.state);
    } else {
      this.chartDataFormat();
      this.pillsDataFormat();
    }
  }

  // table data filter function

  onStateChange() {
    const data = this.scoreData
      .slice()
      .filter(x => x.state._id == this.stateReportFilter);
    this.ulbTypeReportList = this.distinctObjectFromArrayUlb(data.slice());
    // console.log(data, this.ulbTypeReportList);
    this.ulbTypeFilter = '';
    this.ulbFilter.setValue('');
    this.ulbList.next(null);
    this.listData = [];
  }

  onUlbChange() {
    this.ulbList.next(null);
    this.listData = [];
    const data = this.scoreData
      .slice()
      .filter(x => x.state._id == this.stateReportFilter);

    const ulb = data
      .filter(x => x.ulbType._id == this.ulbTypeFilter)
      .map(x => {
        return { id: x._id, name: x.name };
      })
      .sort((x, y) => {
        const textA = x.name.toUpperCase();
        const textB = y.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

    const stateName = this.stateReportList.find(
      x => x.id == this.stateReportFilter
    );

    const obj = { state: stateName ? stateName.name : '', ulbs: ulb };

    this.listData.push(obj);
    // load the initial bank list
    this.ulbList.next(this.filterULBGroups(this.listData));

    // console.log(this.ulbList);

    // listen for search field value changes
    this.ulbFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterULBData();
      });

    this.ulbFilter.setValue('');
  }

  filterTableData() {
    if (this.ulbFilter.value && this.years.value) {
      this.showLoader = true;
      // console.log(this.ulbFilter.value, this.years.value);

      if (!this.financialReportFilter) {
        this.financialReportFilter = 'Overall';
      }

      const prmsArr = [];

      this.years.value.forEach(element => {
        const obj = {
          ulbId: this.ulbFilter.value.id,
          financialYear: [element]
        };
        const prms = new Promise(async (resolve, reject) => {
          this.rankingService.heatMapFilter(obj).subscribe(
            (res: any) => {
              if (res.data.length) {
                resolve({
                  data: res.data[0].financialParameters,
                  year: element
                });
              } else {
                resolve({ data: [], year: element });
              }
            },
            error => {
              reject();
              console.log(error);
            }
          );
        });
        prmsArr.push(prms);
      });
      Promise.all(prmsArr)
        .then(
          values => {
            // console.log(this.financialReportFilter);
            const obj = {};
            for (const value of values) {
              const overall = value.data.find(
                d => d.type == this.financialReportFilter
              );
              if (overall) {
                for (const el of overall.report) {
                  if (!obj.hasOwnProperty(el.name)) {
                    obj[el.name] = [Object.assign({ year: value.year }, el)];
                  } else {
                    obj[el.name].push(Object.assign({ year: value.year }, el));
                  }
                }
              }
              // obj["report"] = overall ? overall.report : [];
              // arr.push(obj);
            }
            const arr = [];
            for (const k in obj) {
              arr.push({ name: k, data: obj[k] });
            }
            this.selectedYear = this.years.value;

            let year;
            const dum = arr.slice();
            if (arr.length) {
              year = dum[0].data.map(x => x.year);
            }

            if (year) {
              for (const yr in this.years.value) {
                // console.log(yr,year.includes(this.years.value[yr]) );
                if (!year.includes(yr)) {
                  for (const row of arr) {
                    this.pushObject(row.data, this.years.value[yr]);
                  }
                }
              }
            }

            // console.log(arr);

            this.tableData = arr;
            this.showLoader = false;
          },
          rejectErr => {
            console.log('rejectErr', rejectErr);
          }
        )
        .catch(caughtError => {
          console.log('caughtError', caughtError);
        });
    }
  }

  pushObject(arr, year) {
    const { length } = arr;
    const id = length + 1;
    const found = arr.some(el => el.year === year);
    if (!found) {
      arr.push({
        year: year,
        name: '-',
        ratio: '-',
        nationalAvgRatio: '-',
        nationalAvgIndexScore: '-',
        indexScore: '-',
        nationalRank: '-',
        stateRank: '-'
      });
    }
    return arr;
  }

  downloadTableData() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.reportTable.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Ulb-score-report.xlsx');
  }

  resetTableData() {
    this.stateReportFilter = '';
    this.ulbTypeFilter = '';
    this.ulbTypeReportList = null;
    this.ulbFilter.setValue('');
    this.ulbList.next(null);
    this.years.setValue(['']);
    this.financialReportFilter = '';
    this.tableData = null;
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
