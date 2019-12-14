import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Chart } from 'chart.js';
import jsonData from '../../../assets/files/data.json';
import colorData from '../../../assets/files/colors.json';

import { RankingService } from '../../shared/services/ranking.service.js';

declare const $:any;

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

  
  years = new FormControl([""]);

  //filters start
  overallFilter = 'Less than 50k';
  overallList = [
    { label: 'Over 1 million', min: 1000000, max: 1000000000000 },
    { label: 'Over 500k but less than 1 million', min: 500000, max: 999999 },
    { label: 'Over 300k but less than 500k', min: 300000, max: 499999 },
    { label: 'Over 100k but less than 300k', min: 100000, max: 299999 },
    { label: 'Over 50k but less than 100k', min: 50000, max: 99999 },
    { label: 'Less than 50k', min: 0, max: 49999 }
  ]

  financialFilter = 'Overall';
  financialList = [
    { value: "Financial Accountability", viewValue: "Financial Accountability" },
    { value: "Financial performance", viewValue: "Financial performance" },
    { value: "Financial position", viewValue: "Financial position" },
    { value: 'Overall', viewValue: 'Overall' }
  ];

  financialReportFilter = 'Overall';
  financialReportList = this.financialList.slice();

  stateFilter = '';
  stateList:any = null;

  stateReportFilter = '';
  stateReportList:any = null;

  ulbTypeFilter = '';
  ulbTypeList:any = null;

  ulbFilter = '';
  ulbList:any = null;

  // anotherList: any[] = [
  //   this.overallList[3],
  // ]
  //fiters end

  statesPill:any = null;

  statesPillClone:any = null;

  legends = null;

  headers:any = {
    0: { key: 'name', color: '#333', status: -1 },
    1: { key: 'stateRank', color: '#333', status: -1 },
    2: { key: 'nationalRank', color: '#333', status: -1 },
    3: { key: 'indexScore', color: '#333', status: -1 },
  }
  

  mainData:any = jsonData;

  colorsData:any = colorData;

  chartDataset:any = null;

  rankTableData:any = null;

  filters:any = {
    population: [
      // { label: '1 to 1000', min: 1, max: 1000 },
      // { label: '1001 to 2000', min: 1001, max: 2000 },
      // { label: '2001 to 3000', min: 2001, max: 3000 },
      { label: 'Less than 50k', min: 0, max: 49999 }
    ],
    finance: ['Overall'],
    state: ''
  };

  constructor(private rankingService:RankingService) { 
  }

  ngOnInit() {
    this.getAllUlbData();
  }

  async getAllUlbData(){
    await this.rankingService.loadRankinModuleData().subscribe((res:any) => {
        this.mainData = res.data;
        console.log(this.mainData);
        this.mapColorMainData();
      });
  }
    
  onTabChanged($event){
    let clickedIndex = $event.index;
    
    if(clickedIndex == 0){
      $("canvas#canvas").remove();
      $("div.chart-container").append('<canvas id="canvas"></canvas>');
      this.plotScatterChart();
    }
  }
    
  getStatesList(){
    let data = this.mainData.slice();
    this.stateList = this.distinctObjectFromArrayState(data);
    this.stateList.push({id: '', name: 'All States'});

    this.stateReportList = this.stateList.slice();
  }

  getUlbList(){
    let data = this.mainData.slice();
    this.ulbList = data.map(list => {
      return { id: list._id, name: list.name};
    });
    this.ulbList.push({id: '', name: 'All'});

    this.ulbTypeList = this.distinctObjectFromArrayUlb(data);

    let values = this.ulbTypeList.slice();
    this.legends = values.map(x => {
      return {  ulbId: x.id, color: '#ffc500', status: true};
    });
  }

  toggleChartData(id, via = "", ulId = ''){
    $("canvas#canvas").remove();
    $("div.chart-container").append('<canvas id="canvas"></canvas>');
    if(via){
      this.statesPill = this.statesPillClone.slice();
      //change label to active or inactive
      if(this.legends[id - 1].color == '#ffc500'){
        this.legends[id - 1].color = '#555';
      }else{
        this.legends[id - 1].color = '#ffc500';
      }

      let index = this.legends.findIndex(item => item.ulbId == ulId);

      let status = this.legends[index].status;
        
      if(status){
        this.legends[index].status = false;
      }else{
        this.legends[index].status = true;
      }
      // //console.log(this.legends);

      this.chartDataFormat('', 'pills', id);
    }else{
      let index = this.statesPill.findIndex(item => item.id == id);
      
      let status = this.statesPill[index].status;
  
      if(status){
        this.statesPill[index].status = false;
      }else{
        this.statesPill[index].status = true;
      }
      this.chartDataFormat('', 'pills');
    }
  }

  rankTableDataFormat(financialType, sortBy, stateId, population){

    // //console.log(this.filters);

    let tableData = this.mainData.slice();

    //sort by state filter
    if(stateId){
      tableData = tableData.filter(row => row.state._id == stateId);
    }

    // console.log(tableData);

    //sort by type
    if(financialType.length){
      tableData = this.filterByFinancialTransparency(financialType, tableData);
    }

    if(population.length){
      tableData = this.filterByOverall(population, tableData);
      //console.log(tableData);
    }

    //sort by table column
    if(sortBy){
      tableData = tableData.sort((a,b) => (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0));
    }

    this.rankTableData = tableData;

    // const distinct = (value, index, self) => {
    //   return self.indexOf(value) === index;
    // }

  }

  chartDataFormat(stateId = '', via = '', ulbId = ''){
    let chartData = this.mainData.slice();
    if(via){
      let result = [];

      if(ulbId){
        let data = this.legends.slice();
  
        let activeLegends = data.filter(legend => legend.status == true);
        // console.log(activeLegends);

        activeLegends.forEach(item => {
          let dummy = chartData.slice();
          let legend = dummy.filter(val => val.ulbType._id == item.ulbId);
          result.push(...legend);
        });
        
        // console.log(result);

        let states = [];
        result.forEach(ulb => {
          let pill = this.statesPill.find(state => state.id == ulb.state._id);
          if(pill){
            states.push(pill);
          }
        });

        states = this.distinctObjectFromArrayStateName(states);

        this.statesPill = states.map(item => {
          item['status'] = true;
          return item;
        });
      }else{
        let data = this.statesPill.slice();
  
        let activeStates = data.filter(state => state.status == true);
        

        activeStates.forEach(item => {
          let state = chartData.slice().filter(val => val.state._id == item.id);
          result.push(...state);
        });
      }

      
      // console.log(this.statesPill);

      if(this.statesPill.length){
        let values = [];
        this.statesPill.forEach(item => {
          let val = result.slice().filter(x => x.state._id == item.id);
          if(val){
            values.push(...val);
          }
        });
        // console.log(values);
        result = values;
        chartData = result;
        //console.log(chartData, 'length');
      }else{
        chartData = [];
      }
    }

    //filter by state filter
    if(stateId){
      chartData = chartData.filter(row => row.state._id == stateId);
    }

    chartData = this.filterByOverall(this.filters.population, chartData);
    // //console.log(result);

    chartData = this.filterByFinancialTransparency([...this.filters.finance], chartData);

    
    let data = [];
    
    //chart labels for shapes
    // 1 -> Municipal Corporation
    // 2 -> Muncipality  
    // 3 -> Town Panchayat
    
    this.ulbTypeList.forEach(type => {
      let filteredData = chartData.filter(item => item.ulbType._id == type.id).map(val => {
        return { x : val.population, y : val.overallIndexScore.toFixed(2) };
      });

      let colorPoints = chartData.filter(item => item.ulbType._id == type.id).map(item => {
        return item.color;
      });

      data.push({ label: type.value, data: filteredData, pointColor: colorPoints});
    });

    this.chartDataset = data;
    setTimeout(() => {
      this.plotScatterChart();
    }, 200);
  }

  pillsDataFormat(stateId = ''){
    let pillMainData = this.mainData.slice();
    //filters by overall
    let pillData = this.filterByOverall(this.filters.population, pillMainData);

    //filter by state
    if(stateId){
      pillData = pillData.filter(row => row.state._id == stateId);
    }

    let data = this.distinctObjectFromArrayState(pillData);

    pillData = data.map(item => {
      return { name: item.name, id: item.id, color: item.color, ulbId: item.ulbType, status: true, hide: false};
    });

    this.statesPill = pillData;
    this.statesPillClone = pillData;
  }

  plotScatterChart(){
    let color = Chart.helpers.color;
	  let scatterChartData = {
      datasets: [
        {
          pointStyle:'rect',
          backgroundColor: '#555',
          label: 'Municipal Corporation',
          pointRadius: 10,
          pointBackgroundColor: this.chartDataset[0].pointColor,
          borderColor: '#ddd',
          data: this.chartDataset[0].data
        },
        {
          backgroundColor: '#555',
          pointStyle:'circle',
          pointRadius: 8,
          label: 'Town Panchayat',
          pointBackgroundColor: this.chartDataset[1].pointColor,
          borderColor: '#ddd',
          data: this.chartDataset[1].data
        },
        {
          backgroundColor: '#555',
          pointStyle:'triangle',
          pointRadius: 10,
          label: 'Town Panchayat',
          pointBackgroundColor: this.chartDataset[2].pointColor,
          borderColor: '#ddd',
          data: this.chartDataset[2].data
        }
      ]
    };

    var canvas:any = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    
		var chartScatter = new Chart(ctx, {
      type: 'scatter',
			data: scatterChartData,
			options: {
				title: {
					display: false,
					text: 'Chart.js Scatter Chart'
        },
        legend:{
          display: false,
          position: 'top',
          align: 'center',
        },
				scales: {
					xAxes: [{
						type: 'linear',
						position: 'bottom',
						ticks: {
							// userCallback: function(tick) {
							// 	return tick.toString() + 'k';
							// }
						},
						scaleLabel: {
							labelString: 'Population',
							display: true,
						}
					}],
					yAxes: [{
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
					}]
				}
			}
    });
  }

  filterData(){
    $("canvas#canvas").remove();
    $("div.chart-container").append('<canvas id="canvas"></canvas>');
    // this.overallFilter.setValue(this.anotherList);
    let pop = this.overallList.find(x => x.label == this.overallFilter);
    this.filters.population = [pop];
    this.filters.finance = [this.financialFilter];
    this.filters.state = this.stateFilter;

    this.rankTableDataFormat(this.filters.finance, 'nationalRank', this.filters.state, this.filters.population);
    this.chartDataFormat(this.filters.state, '', '');
    this.pillsDataFormat(this.filters.state);
  }

  // common functions
  //check range between
  between(x, min, max) {
    return x >= min && x <= max;
  }

  distinct(value, index, self){
    return self.indexOf(value) === index;
  }

  distinctObjectFromArrayState(array){
    const result = Array.from(array.map(x => x.state._id).filter(this.distinct) ).map(
      id => {
        return { 
          id: array.find(s => s.state._id === id).state._id, 
          name: array.find(s => s.state._id === id).state.name,
          color: array.find(s => s.state._id === id).color,
          backColor: array.find(s => s.state._id === id).backColor,
          ulbType: array.find(s => s.state._id === id).ulbType.name,
          state: array.find(s => s.state._id === id).state
        };
      }
    );
    return result;
  }

  distinctObjectFromArrayUlb(array){
    const result = Array.from(array.map(x => x.ulbType._id).filter(this.distinct) ).map(
      id => {
        return { 
          id: array.find(s => s.ulbType._id === id).ulbType._id, 
          value: array.find(s => s.ulbType._id === id).ulbType.name,
        };
      }
    );
    return result;
  }

  distinctObjectFromArrayStateName(array){
    const result = Array.from(array.map(x => x.name).filter(this.distinct) ).map(
      id => {
        return { 
          id: array.find(s => s.name === id).id, 
          name: array.find(s => s.name === id).name, 
          color: array.find(s => s.name === id).color, 
          hide: array.find(s => s.name === id).hide, 
          status: array.find(s => s.name === id).status
        };
      }
    );;
    return result;
  }

  filterByFinancialTransparency(keys:any = [], dataInput:any = []){
    let filteredData = [];

    for(let i = 0; i < keys.length; i++){
      let values = dataInput.map(row => {
        let data = row['financialParameters'].find(x => x.type == keys[i]);
        return {...data, ...row};
      });
      filteredData.push(...values);
    }
    return filteredData;
  }

  filterByOverall(keys:any = [], dataInput:any = []){
    let filteredData = [];

    for(let i = 0; i < keys.length; i++){
      let values = dataInput.map(row => {
        if(this.between(row.population, keys[i].min, keys[i].max)){
          return row;
        }
        return;
      }).filter(item => item);
      filteredData.push(...values);
    }
    return filteredData;
  }

  sortTableData(key, order, index){
    //console.log(key, order, index);
    if(order == -1){
      this.headers[index].status = 1;
      this.headers[index].color = '#43b8ea'

      //ascending
      this.rankTableData.sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
    }else{
      this.headers[index].status = -1;
      this.headers[index].color = '#555'

      //descending
      this.rankTableData.sort((a,b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0));
    }
  }


  mapColorMainData(){
    let totalColors = Object.keys(this.colorsData);
    let stateColorObj = {};
    let stateColors = [];
    for (let d of this.mainData) { 
      for(let col in stateColorObj){
        stateColors.indexOf(stateColorObj[col].key) < 0 ? stateColors.push(stateColorObj[col].key) : "";  
      }
      let availableColors = totalColors.filter(y => stateColors.indexOf(y) < 0);
      if(!stateColorObj.hasOwnProperty(d.state.code)){
        stateColorObj[d.state.code] = availableColors.length ? this.colorsData[availableColors[0]] : this.colorsData[totalColors[0]];
      }
      d['color'] = stateColorObj[d.state.code]['color'];
      d['backColor'] = stateColorObj[d.state.code]['bg'];
    }

    this.rankTableDataFormat(this.filters.finance, 'nationalRanking', this.filters.state, this.filters.population);
    this.getStatesList();
    this.getUlbList();
    this.chartDataFormat();
    this.pillsDataFormat();

  }


}
