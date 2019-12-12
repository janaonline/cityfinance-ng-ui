import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Chart } from 'chart.js';
import jsonData from '../../../assets/files/data.json';

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

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  //filters start
  overallFilter = new FormControl();
  overallList = [
    { label: '1 to 1000', min: 1, max: 1000 },
    { label: '1001 to 2000', min: 1001, max: 2000 },
    { label: '2001 to 3000', min: 2001, max: 3000 },
    { label: 'All', min: 1, max: 3000 }
  ]

  financialFilter = 'Overall';
  financialList = [
    { value: 'A', viewValue: 'A' },
    { value: 'B', viewValue: 'B' },
    { value: 'C', viewValue: 'C' },
    // { value: 'D', viewValue: 'D' },
    { value: 'Overall', viewValue: 'Overall' }
  ];

  stateFilter = '';
  stateList:any = null;

  anotherList: any[] = [
    this.overallList[3],
  ]
  //fiters end

  statesPill:any = null;

  statesPillClone:any = null;

  legends = [
    { ulbId: '1', color: '#ffc500', status: true },
    { ulbId: '2', color: '#ffc500', status: true },
    { ulbId: '3', color: '#ffc500', status: true }
  ];

  headers:any = {
    0: { key: 'ulbName', color: '#333', status: -1 },
    1: { key: 'stateRank', color: '#333', status: -1 },
    2: { key: 'nationalRank', color: '#333', status: -1 },
    3: { key: 'indexScore', color: '#333', status: -1 },
  }
  

  mainData:any = jsonData;

  chartDataset:any = null;

  rankTableData:any = null;

  filters:any = {
    population: [
      // { label: '1 to 1000', min: 1, max: 1000 },
      // { label: '1001 to 2000', min: 1001, max: 2000 },
      // { label: '2001 to 3000', min: 2001, max: 3000 },
      { label: 'All', min: 1, max: 3000 }
    ],
    finance: ['Overall'],
    state: ''
  };

  constructor() { 
  }

  ngOnInit() {
    this.rankTableDataFormat(this.filters.finance, 'nationalRank', this.filters.state, this.filters.population);
    this.chartDataFormat();
    this.pillsDataFormat();
    this.getStatesList();
    this.overallFilter.setValue(this.anotherList);
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
    this.stateList = data.map(list => {
      return { id: list.state._id, name: list.state.name};
    });
    this.stateList.push({id: '', name: 'All'});
  }

  toggleChartData(id, via = ""){
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

      let index = this.legends.findIndex(item => item.ulbId == id);
      
      let status = this.legends[index].status;
  
      
      if(status){
        this.legends[index].status = false;
      }else{
        this.legends[index].status = true;
      }
      console.log(this.legends);

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

    console.log(this.filters);

    let tableData = this.mainData.slice();

    //sort by state filter
    if(stateId){
      tableData = tableData.filter(row => row.state._id == stateId);
    }

    //sort by type
    if(financialType.length){
      tableData = this.filterByFinancialTransparency(financialType, tableData);
    }

    if(population.length){
      tableData = this.filterByOverall(population, tableData);
      // console.log(tableData);
    }

    //sort by table column
    if(sortBy){
      tableData = tableData.sort((a,b) => (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0));
    }

    this.rankTableData = tableData;
    console.log(this.rankTableData);
  }

  chartDataFormat(stateId = '', via = '', ulbId = ''){
    let chartData = this.mainData.slice();
    if(via){
      let result = [];

      if(ulbId){
        let data = this.legends.slice();
  
        let activeLegends = data.filter(legend => legend.status == true);
        activeLegends.forEach(item => {
          let dummy = chartData.slice();
          let legend = dummy.filter(val => val.ulbType == item.ulbId);
          result.push(...legend);
        });

        console.log(result);


        let states = [];
        result.forEach(ulb => {
          let pill = this.statesPill.find(state => state.id == ulb.state._id);
          if(pill){
            states.push(pill);
          }
        });

        this.statesPill = states.map(item => {
          item['status'] = true;
          return item;
        });
      }else{
        let data = this.statesPill.slice();
  
        let activeStates = data.filter(state => state.status == true);
        
        activeStates.forEach(item => {
          let state = chartData.find(val => val.state._id == item.id);
          result.push(state);
        });
      }

      
      if(this.statesPill.length){
        let values = [];
        this.statesPill.forEach(item => {
          let val = result.find(x => x.state._id == item.id);
          if(val){
            values.push(val);
          }
        });
        result = values;
        chartData = result;
        console.log(chartData, 'length');
      }else{
        chartData = [];
      }
    }

    //filter by state filter
    if(stateId){
      chartData = chartData.filter(row => row.state._id == stateId);
    }

    chartData = this.filterByOverall(this.filters.population, chartData);
    // console.log(result);

    chartData = this.filterByFinancialTransparency([...this.filters.finance], chartData);

    
    let data = [];
    
    //chart labels for shapes
    // 1 -> Municipal Corporation
    // 2 -> Muncipality  
    // 3 -> Town Panchayat
    
    ['1','2','3'].forEach(type => {
      let filteredData = chartData.filter(item => item.ulbType == type).map(val => {
        return { x : val.population, y : val.indexScore };
      });

      let colorPoints = chartData.filter(item => item.ulbType == type).map(item => {
        return item.color;
      });

      switch (type) {
        case '1':
          data.push({ label: 'Municipal Corporation', data: filteredData, pointColor: colorPoints});
          break;
        case '2':
          data.push({ label: 'Muncipality', data: filteredData, pointColor: colorPoints });
          break;
        case '3':
          data.push({ label: 'Town Panchayat', data: filteredData, pointColor: colorPoints });
          break;
        default:
          break;
      }
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

    pillData = pillData.map(item => {
      return { name: item.state.name, id: item.state._id, color: item.color, ulbId: item.ulbType, status: true, hide: false};
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
							userCallback: function(tick) {
								return tick.toString() + 'k';
							}
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
    // this.overallFilter.setValue(this.anotherList);
    this.filters.population = this.overallFilter.value;
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

  filterByFinancialTransparency(keys:any = [], dataInput:any = []){
    let filteredData = [];

    for(let i = 0; i < keys.length; i++){
      let values = dataInput.map(row => {
        let data = row['financialParameters'].find(x => x.type == keys[i]);
        return {...data, ulbName: row.name, ulbType: row.ulbType, color: row.color, backColor: row.backColor, population: row.population, _id: row._id};
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
    console.log(key, order, index);
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


}
