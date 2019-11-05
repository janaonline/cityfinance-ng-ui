import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  activeTab = 'Revenue';
  statesAggArry: any;
  statistics: any;
  years: any;
  particulars: any;
  selectedParticulars: any;
  statsForm = new FormGroup({
    states: new FormControl()
  });
  charLabelKeys: any;
  selectedState: any;

  chartData: any;
  selectedIndex: any;
  charLabel: string[];

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.years = ['2015-16', '2016-17', '2017-18'];
    this.charLabelKeys = ['total', 'municipalCorporation', 'municipality', 'townPanchayat'];
    this.charLabel = ['Total', 'Municipal Corporation', 'Municipality', 'Town Panchayat'];

    this.commonService.loadStatesAgg()
      .subscribe(statesObj => {
        this.statesAggArry = statesObj;
        this.statsForm.controls['states'].setValue(statesObj[0]);
        this.selectedState = statesObj[0];
        this.loadUlbsCovered()
        this.loadDefaultData();
      });

    this.commonService.loadHomeStatisticsData()
      .subscribe(data => {
        this.statistics = data;
        this.loadDefaultData();
      });

      this.loadParticulars()
  }

  loadDefaultData(){
    if(this.selectedState && this.statistics) {
      this.loadStats(this.particulars[0].title, 0)
    }
  }

  onTabSwitch(activeTab: string) {
    this.activeTab = activeTab;
    this.loadParticulars();
    this.loadStats(this.particulars[0].title, 0)
  }

  loadUlbsCovered() {
    if(this.selectedState && this.statistics) {
      this.selectedState = this.statsForm.value.states;
      this.loadStats(this.particulars[0].title, 0)
    }
  }  

  loadStats(particular, index) {
    this.selectedIndex = index;
    var filterData;
    // console.log(this.statistics)
    if(this.selectedState){
      // console.log('selected: "' + particular + '" state: "' + this.selectedState.State + '"');
      // console.log('Active tab: '+ this.activeTab);
      filterData = this.statistics.filter(obj => { 
        if( (obj.type == this.activeTab) && (obj.state.toLowerCase() == this.selectedState.State.toLowerCase()) 
            && (obj.particulars.toLowerCase() == particular.toLowerCase()) ){
                return obj
        }
       });
       console.log('filteredData: ' + filterData)
    }

    this.chartData = {
      dataSet: [ { data: [], label: null}  ],
        chartLabels: ['']
      }
  this.chartData.dataSet = [];
  this.chartData.chartLabels = this.charLabel;
  this.years.forEach(yr => {
    var tempData = [];
    if(filterData.length == 0) {
      tempData = [0, 0, 0, 0]
    } else {
      filterData.forEach(data => {
        if(data.year == yr)
          this.charLabelKeys.forEach(key => {
            tempData.push(parseInt(data[key] ? data[key] : 0))
          })
      });
    }
    this.chartData.dataSet.push({data: tempData, label: yr});
  });
  // console.log(this.chartData)
  }

  loadParticulars() {
    if(this.activeTab == 'Revenue'){
      this.particulars = [
          {
            title: 'Total Revenue',
            icon: 'fa-bar-chart',
            chartClass: 'text-warning bg-primary'
          },
          {
            title: 'Tax Revenue',
            icon: 'fa-bar-chart',
            chartClass: 'text-warning bg-primary',
          },
          {
            title: 'Non Tax Revenue',
            icon: 'fa-area-chart',
            chartClass: 'text-warning bg-primary'
          },
          {
            title: 'Revenue Grants, Contributions & Subsidies',
            icon: 'fa-money',
            chartClass: 'text-warning bg-primary',
            tooltip: "Revenue Grants, Contributions & Subsidies"
          },
          {
            title: 'Other Income',
            icon: 'fa-line-chart',
            chartClass: 'text-warning bg-primary',
          }
        ];
      } else {
        this.particulars = [
          {
            title: 'Total Expenses',
            icon: 'fa-bar-chart',
            chartClass: 'text-warning bg-primary',
            tooltip: 'Total expenses'
          },
          {
            title: 'Establishment Expenses',
            icon: 'fa-bar-chart',
            chartClass: 'text-warning bg-primary',
            tooltip: 'Establishment expenses'
          },
          {
            title: 'Administrative Expenses',
            icon: 'fa-area-chart',
            chartClass: 'text-warning bg-primary',
            tooltip: "Administrative Expenses"
          },
          {
            title: 'Operation & Maintenance',
            icon: 'fa-money',
            chartClass: 'text-warning bg-primary',
            tooltip: 'Operation & Maintenance'
          },
          {
            title: 'Interest & Finance Charges',
            icon: 'fa-line-chart',
            chartClass: 'text-warning bg-primary',
            tooltip: 'Interest & finance charges'
          },
          {
            title: 'Revenue Grants, Contributions & Subsidies (Exp)',
            icon: 'fa-money',
            chartClass: 'text-warning bg-primary',
            tooltip: "Revenue Grants, Contributions & Subsidies"
          },
          {
            title: 'Other Expenses',
            icon: 'fa-line-chart',
            chartClass: 'text-warning bg-primary',
            tooltip: 'Other expenses'
          },
        ]
      } 
  }

}
