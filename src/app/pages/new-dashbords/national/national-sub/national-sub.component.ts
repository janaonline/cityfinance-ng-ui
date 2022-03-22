import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { Chart } from "chart.js";
import { I } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-national-sub',
  templateUrl: './national-sub.component.html',
  styleUrls: ['./national-sub.component.scss']
})
export class NationalSubComponent implements OnInit {
  constructor(
    protected router: Router,
    private activateRoute: ActivatedRoute,
    private _commonServices: CommonService
  ) { }
  public chart: Chart;
  public doughnut: Chart;
  public dynamicDoughnut: Chart;

  tabData;
  aboutTab;
  nationalFilter = new FormControl();
  globalOptions = [];
  filteredOptions: Observable<any[]>;
  tableData;
  popBtn = true;
  tableView = true;
  graphView = false;
  barChartsLabels;
  doughnutLabels = [
    {
     name: 'Own Revenue',
     color: '#1E44AD',
    },
    {
     name: 'Assigned Revenue',
     color: '#25C7CE',
    },
    {
     name: 'Grants',
     color: '#585FFF',
    },
    {
     name: 'Interest Income',
     color: '#FFD72E',
    },
    {
     name: 'Other Income',
     color: '#22A2FF',
    },
    {
     name: 'State & Hire Charges',
     color: '#FF608B'
    },

  ]
  yearLookup = [
    { id: "2018-19", itemName: "2018-19" },
    { id: "2019-20", itemName: "2019-20" },
    { id: "2020-21", itemName: "2020-21" },
    { id: "2021-22", itemName: "2021-22" },
  ];
  totalRevenue = true;
  mixRevenue = false;
  doughnutArray;
  @ViewChildren('mycharts') allMyCanvas: any;
  mixRDoughnutPopulationCategory:any = [
    {
      id: 'p1',
      title: '4M+',
      data: [40, 20, 15, 10, 10, 5],
      chart: []
    },
    {
      id: 'p2',
      title: '1M-4M',
      data: [10, 10, 10, 10, 10, 50],
      chart: []
    },
    {
      id: 'p3',
      title: '500k-1M',
      data: [25, 5, 25, 15, 25, 5],
      chart: []
    },
    {
      id: 'p4',
      title: '100K-500K',
      data: [5, 10, 10, 15, 20, 40],
      chart: []
    },
    {
      id: 'p5',
      title: '<100K',
      data: [40, 20, 15, 10, 10, 5],
      chart: []
    },
  ]
  mixRDoughnutUlbType:any = [
    {
      id: 't1',
      title: 'Municipal Corporation',
      data: [40, 20, 15],
      chart: []
    },
    {
      id: 't2',
      title: 'Municipality',
      data: [40, 20, 15],
      chart: []
    },
    {
      id: 't3',
      title: 'Town Panchayat',
      data: [10, 10, 5],
      chart: []
    },
  ]
  ngOnInit(): void {
   this.nationalFilter.valueChanges
   .subscribe(value => {
     if(value?.length >= 1){
       this._commonServices.postGlobalSearchData(value,"", "").subscribe((res: any) => {
         console.log(res?.data);
         let emptyArr:any = []
           this.filteredOptions = emptyArr;
         if(res?.data.length > 0 ){
           this.filteredOptions = res?.data;
           //this.noDataFound = false;
         }else{

           let emptyArr:any = []
           this.filteredOptions = emptyArr;
          // this.noDataFound = true;
           console.log('no data found')
         }
       });
     }
     else {
       return null;
     }
   })
   this.subFilterFn('popCat');

  }

  activeTabFn(item){
   this.aboutTab = item?.subHeaders[0]?.mainContent[0]?.about;
  // this.router.navigate([`dashboard/national/${item._id}`]);
  }
  subFilterFn(type) {

    this.doughnutArray = [];
    if(type == 'popCat'){
      this.popBtn = true;
      this.doughnutArray = this.mixRDoughnutPopulationCategory;
     if(!this.totalRevenue){
        this.dynamicDoughnutChartInit(this.doughnutArray);
      }
      if(this.totalRevenue){
      this.barChartsLabels = ["<100k", "100K-500K", "500K-1M", "1M-4M", "4M+"];
      if(this.graphView){
        this.barChartInit();
      }
      this.tableData = {
          timeStamp : 12332323434,
          success:true,
          message: 'success',
          data: [
            {
              tableId:1,
              name:"Revenue Table",
              tableClass: 'revenue_tb',
              border:"1",
              bgColor: '#9D84B7',
              columns : [
                {
                key: 'ulb_pop_category',
                display_name: "ULB Population Category",
                },
              {
                key: 'revenue',
                display_name: "Revenue (in Cr)",
              },
              {
                key: 'revenuePerCapita',
                display_name: "Revenue Per Capita (in Rs.)",
                // th_style: {
                //   backgroundColor : 'gray',
                //   fontSize: '15px',
                //   color: 'blue'
                // },
                // td_style: {
                //   backgroundColor : 'white',
                //   fontSize: '15px',
                //   color: 'red'
                // }
              },
               {
                  key : 'DataAvailPercentage',
                  display_name: 'Data Availability Percentage'
               },
              ],
              rows: [
                {
                 // lineItem: 'Average',
                  ulb_pop_category:'Average',
                  revenue: '12000',
                  revenuePerCapita: '12000',
                  DataAvailPercentage: '75%'
                },
                {
                  // lineItem: 'Average',
                   ulb_pop_category:'4M+',
                   revenue: '500',
                   revenuePerCapita: '500',
                   DataAvailPercentage: '50%'
                 },
                {
                 // lineItem: 'Municipal Corporation',
                  ulb_pop_category:'1M-4M',
                  revenue: '501',
                  revenuePerCapita: '121',
                  DataAvailPercentage: '50%'
                },
                {
                 // lineItem: 'Municipality',
                  ulb_pop_category:'500K-1M',
                  revenue: '1500',
                  revenuePerCapita: '111',
                  DataAvailPercentage: '30%'
                },
                {
                 // lineItem: 'Town Panchayat',
                  ulb_pop_category:'100K-500K',
                  revenue: '1200',
                  revenuePerCapita: '600',
                  DataAvailPercentage: '10%'
                },
                {
                  // lineItem: 'Town Panchayat',
                   ulb_pop_category:'<100K',
                   revenue: '1200',
                   revenuePerCapita: '600',
                   DataAvailPercentage: '5%'
                 },

              ]
            },

          ]
      }
    }

    }
    if(type == 'ulbType'){
      this.popBtn = false;
      this.doughnutArray = this.mixRDoughnutUlbType;
      if(!this.totalRevenue){
      this.dynamicDoughnutChartInit(this.doughnutArray);
     }
      if(this.totalRevenue){
      this.barChartsLabels = ['Municipal Corporation', 'Municipality', 'Town Panchayat'];
      if(this.graphView){
        this.barChartInit();
      }
      this.tableData = {
        timeStamp : 12332323434,
        success:true,
        message: 'success',
        data: [
          {
            tableId:1,
            name:"Revenue Table",
            tableClass: 'revenue_tb',
            border:"1",
            bgColor: '#9D84B7',
            columns : [
              {
              key: 'ulb_pop_category',
              display_name: "ULB Population Category",
              },
            {
              key: 'revenue',
              display_name: "Revenue (in Cr)",
            },
            {
              key: 'revenuePerCapita',
              display_name: "Revenue Per Capita (in Rs.)",
              // th_style: {
              //   backgroundColor : 'gray',
              //   fontSize: '15px',
              //   color: 'blue'
              // },
              // td_style: {
              //   backgroundColor : 'white',
              //   fontSize: '15px',
              //   color: 'red'
              // }
            },
             {
                key : 'DataAvailPercentage',
                display_name: 'Data Availability Percentage'
             },
            ],
            rows: [
              {
               // lineItem: 'Average',
                ulb_pop_category:'Average',
                revenue: '12000',
                revenuePerCapita: '12000',
                DataAvailPercentage: '75%'
              },
              {
               // lineItem: 'Municipal Corporation',
                ulb_pop_category:'Municipal Corporation',
                revenue: '501',
                revenuePerCapita: '121',
                DataAvailPercentage: '50%'
              },
              {
               // lineItem: 'Municipality',
                ulb_pop_category:'Municipality',
                revenue: '1500',
                revenuePerCapita: '111',
                DataAvailPercentage: '30%'
              },
              {
               // lineItem: 'Town Panchayat',
                ulb_pop_category:'Town Panchayat',
                revenue: '1200',
                revenuePerCapita: '600',
                DataAvailPercentage: '10%'
              },

            ]
          },

        ]
      }
    }
    }
   console.log('btn', type)
  }

  graphViewFn() {
    console.log('graph......');

    this.tableView = false;
    this.graphView = true;
    this.barChartInit();
  }
  tableViewFn(){
    console.log('table......');
    this.tableView = true;
    this.graphView = false;
  }

  barChartInit(){
    if(this.chart){
      this.chart.destroy();
    }
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: this.barChartsLabels,
        datasets: [
          {
            // label: "Average",
            data: [20, 80, 23, 80, 120,160],
            backgroundColor: '#456EDE',
            borderWidth: 1,
            barThickness: 40
          },
          {
            type: 'line',
            label: 'Average',
            data: [80, 80, 80, 80, 80, 80],
            fill: false,
            borderColor: 'rgb(54, 162, 235)'
          }
        ]
      },
      options: {
        legend: {
            position: 'bottom',
            display : false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display:false
               // drawOnChartArea: false
            }
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero:true
            },
            gridLines: {
              //  display:false
              drawOnChartArea: false
            }
          }
      ],
        }
      }
    });
  }
  getTotalRevenue(){
    this.totalRevenue = true;
    this.mixRevenue = false;
    this.tableView = true;
    this.graphView = false;
  }
  getRevenueMix() {
    this.totalRevenue = false;
    this.mixRevenue = true;
    this.doughnutChartInit();
    if(this.popBtn){
      this.dynamicDoughnutChartInit(this.mixRDoughnutPopulationCategory);
      // this.mixRDoughnutPopulationCategory.forEach((el)=>{
      //   this.dynamicDoughnutChartInit();
      // })
    }
    if(!this.popBtn){
      this.dynamicDoughnutChartInit(this.mixRDoughnutUlbType);
      // this.mixRDoughnutUlbType.forEach((el)=>{
      //   this.dynamicDoughnutChartInit(el);
      // })
    }
  }
  doughnutChartInit(){
    this.doughnut = new Chart('doughnut', {
      type: 'doughnut',
      data: {
        labels: ['Own Revenue','Assigned Revenue', 'Grants', 'Interest Income', 'Other Income', 'State & Hire Charges'],
        datasets: [
          {
            data: [40, 20, 15, 10, 10, 5],
            backgroundColor: ['#1E44AD','#25C7CE', '#585FFF', '#FFD72E', '#22A2FF', '#FF608B'],
            fill: false
          },
        ]
      },
      options: {
        legend: {
         // position: 'bottom'
         display: false
        },
      }
    });
}


dynamicDoughnutChartInit(chartArray){
  console.log('loop val', this.allMyCanvas._results)
  let canvasCharts = this.allMyCanvas._results;  // Get array with all canvas
  canvasCharts.map((myCanvas, i) => {   // For each canvas, save the chart on the charts array
    if(chartArray[i].chart) {
     // chartArray[i].chart.destroy();
    }
     chartArray[i].chart = new Chart(myCanvas.nativeElement.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Own Revenue','Assigned Revenue', 'Grants', 'Interest Income', 'Other Income', 'State & Hire Charges'],
        datasets: [
          {
            data: chartArray[i].data,
            backgroundColor: ['#1E44AD','#25C7CE', '#585FFF', '#FFD72E', '#22A2FF', '#FF608B'],
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
      }
     })
  });
  // let dynamicDoughnut: Chart;
  // dynamicDoughnut  = new Chart(`${val.id}`, {
  //   type: 'doughnut',
  //   data: {
  //     labels: ['Own Revenue','Assigned Revenue', 'Grants', 'Interest Income', 'Other Income', 'State & Hire Charges'],
  //     datasets: [
  //       {
  //         data: val.data,
  //         backgroundColor: ['#1E44AD','#25C7CE', '#585FFF', '#FFD72E', '#22A2FF', '#FF608B'],
  //         fill: false
  //       },
  //     ]
  //   },
  //   options: {
  //     legend: {
  //       display: false
  //     },
  //   }
  // });
}
}

