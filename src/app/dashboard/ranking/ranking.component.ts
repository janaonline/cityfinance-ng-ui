import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Chart } from 'chart.js';
import jsonData from '../../../assets/files/data.json';

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

  statesPill:any = [
    { name: 'Andhra Pradesh', id: '1', color: 'red', status: true },
    { name: 'Haryana', id: '2', color: 'blue', status: true },
    { name: 'Gujarat', id: '3', color: 'green', status: true },
    { name: 'Rajasthan', id: '4', color: 'yellow', status: true }
  ];
  
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

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

  constructor() { }

  ngOnInit() {
    this.rankTableDataFormat(this.filters.finance, 'nationalRank', this.filters.state, this.filters.population);
    this.chartDataFormat();
  }

  onTabChanged($event){
    let clickedIndex = $event.index;

    if(clickedIndex == 0){
      this.plotScatterChart();
    }
  }

  toggleChartData(id){
    let index = this.statesPill.findIndex(item => item.id == id);
    
    let status = this.statesPill[index].status;

    if(status){
      this.statesPill[index].status = false;
    }else{
      this.statesPill[index].status = true;
    }

  }

  rankTableDataFormat(financialType, sortBy, stateId, population){

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
  }

  chartDataFormat(stateId = ''){
    let chartData = this.mainData.slice();

    //sort by state filter
    if(stateId){
      chartData = chartData.filter(row => row.state._id == stateId);
    }

    chartData = this.filterByOverall(this.filters.population, chartData);
    // console.log(result);

    chartData = this.filterByFinancialTransparency([...this.filters.finance], chartData);

    console.log(chartData);

    let data = [];

    //chart labels for shapes
    // 1 -> Municipal Corporation
    // 2 -> Muncipality  
    // 3 -> Town Panchayat

    ['1','2','3'].forEach(type => {
      let filteredData = chartData.filter(item => item.ulbType == type).map(val => {
        return { x : val.population, y : val.indexScore };
      });

      switch (type) {
        case '1':
          data.push({ label: 'Municipal Corporation', data: filteredData });
          break;
        case '2':
          data.push({ label: 'Muncipality', data: filteredData });
          break;
        case '3':
          data.push({ label: 'Town Panchayat', data: filteredData });
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

  plotScatterChart(){
    let color = Chart.helpers.color;
	  let scatterChartData = {
      datasets: [
        {
          borderColor: 'red',
          pointStyle:'rect',
          backgroundColor: color('red').alpha(0.5).rgbString(),
          label: 'Municipal Corporation',
          pointRadius: 6,
          data: this.chartDataset[0].data
        },
        {
          borderColor: 'green',
          backgroundColor: color('green').alpha(0.5).rgbString(),
          pointStyle:'circle',
          pointRadius: 6,
          label: 'Town Panchayat',
          data: this.chartDataset[1].data
        },
        {
          borderColor: 'blue',
          backgroundColor: color('green').alpha(0.5).rgbString(),
          pointStyle:'triangle',
          pointRadius: 6,
          label: 'Town Panchayat',
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
          position: 'bottom',
          align: 'center'
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
    
    console.log(chartScatter.data);
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



}
