import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Chart } from 'chart.js';
export interface Food {
  value: string;
  viewValue: string;
}

declare var $:any;

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

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.plotScatterChart();
    }, 200);
  }

  onTabChanged($event){
    let clickedIndex = $event.index;

    if(clickedIndex == 0){
      this.plotScatterChart();
    }
  }

  plotScatterChart(){
    let color = Chart.helpers.color;
	  let scatterChartData = {
      datasets: [
        {
          borderColor: 'red',
          backgroundColor: color('red').alpha(0.5).rgbString(),
          label: 'Andhra Pradesh',
          pointRadius: 3,
          data: [
          {
            x: 1,
            y: 3,
          }, {
            x: 1.26,
            y: 10,
          }, {
            x: 1.58,
            y: 100,
          }, {
            x: 2.0,
            y: 20,
          }, {
            x: 2.51,
            y: 99,
          }, {
            x: 3.16,
            y: 20,
          }, {
            x: 3.98,
            y: 13,
          }, {
            x: 5.01,
            y: 40,
          }, {
            x: 6.31,
            y: 90,
          }, {
            x: 7.94,
            y: 22,
          }, {
            x: 10.00,
            y: 56,
          }, {
            x: 12.6,
            y: 78,
          }, {
            x: 15.8,
            y: 40,
          }, {
            x: 20.0,
            y: 20,
          }, {
            x: 25.1,
            y: 27,
          }, {
            x: 31.6,
            y: 3,
          }, {
            x: 39.8,
            y: 17,
          }, {
            x: 50.1,
            y: 41,
          }, {
            x: 63.1,
            y: 37,
          }, {
            x: 79.4,
            y: 33,
          }, {
            x: 100.00,
            y: 100,
          }, {
            x: 126,
            y: 60,
          }, {
            x: 158,
            y: 67,
          }, {
            x: 200,
            y: 87,
          }, {
            x: 251,
            y: 99,
          }, {
            x: 316,
            y: 36,
          }, {
            x: 398,
            y: 48,
          }, {
            x: 501,
            y: 22,
          }, {
            x: 631,
            y: 69,
          }, {
            x: 794,
            y: 120,
          }]
        },
        {
          borderColor: 'green',
          backgroundColor: color('green').alpha(0.5).rgbString(),
          pointStyle:'rect',
          pointRadius: 6,
          label: 'Haryana',
          data: [
          {
            x: 23,
            y: 3,
          }, {
            x: 234,
            y: 10,
          }, {
            x: 121,
            y: 100,
          }, {
            x: 21,
            y: 20,
          }, {
            x: 33,
            y: 99,
          }, {
            x: 11,
            y: 20,
          }, {
            x: 56,
            y: 13,
          }, {
            x: 89,
            y: 40,
          }, {
            x: 13,
            y: 90,
          }, {
            x: 81,
            y: 22,
          }, {
            x: 132,
            y: 56,
          }, {
            x: 77,
            y: 78,
          }, {
            x: 66,
            y: 40,
          }, {
            x: 77,
            y: 20,
          }, {
            x: 37,
            y: 27,
          }, {
            x: 70,
            y: 3,
          }, {
            x: 100,
            y: 17,
          }, {
            x: 23,
            y: 41,
          }, {
            x: 785,
            y: 37,
          }, {
            x: 794,
            y: 33,
          }, {
            x: 425,
            y: 100,
          }, {
            x: 785,
            y: 60,
          }, {
            x: 332,
            y: 67,
          }, {
            x: 85,
            y: 87,
          }, {
            x: 452,
            y: 99,
          }, {
            x: 132,
            y: 36,
          }, {
            x: 562,
            y: 48,
          }, {
            x: 881,
            y: 22,
          }, {
            x: 240,
            y: 69,
          }, {
            x: 330,
            y: 120,
          }]
        }
      ]
    };

    var canvas:any = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    
		new Chart(ctx, {
      type: 'scatter',
			data: scatterChartData,
			options: {
				title: {
					display: false,
					text: 'Chart.js Scatter Chart'
        },
        legend:{
          display: true,
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
  }

}
