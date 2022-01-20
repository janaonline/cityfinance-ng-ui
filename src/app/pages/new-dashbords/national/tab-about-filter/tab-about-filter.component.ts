import { AfterViewInit, Component, Input, OnChanges, OnInit  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { Chart } from "chart.js";
@Component({
  selector: 'app-tab-about-filter',
  templateUrl: './tab-about-filter.component.html',
  styleUrls: ['./tab-about-filter.component.scss']
})
export class TabAboutFilterComponent implements OnInit, OnChanges {

  constructor(
    protected router: Router,
    private activateRoute: ActivatedRoute,
    private _commonServices: CommonService
  ) { }
  public chart: Chart;
  @Input() data = [];

  tabData;
  aboutTab;
  nationalFilter = new FormControl();
  globalOptions = [];
  filteredOptions: Observable<any[]>;
  tableData;
  popBtn = true;
  tableView = true;
  graphView = false;
  ngOnInit(): void {
   console.log('tab data', this.data);
   this.nationalFilter.valueChanges
   .subscribe(value => {
     if(value?.length >= 1){
       this._commonServices.postGlobalSearchData(value).subscribe((res: any) => {
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
  ngOnChanges(){
    if(this.data){
      this.activeTabFn(this.data[0]);
      this.router.navigate([`dashboard/national/61e150439ed0e8575c881028`]);
    }

  }
  activeTabFn(item){
   this.aboutTab = item?.subHeaders[0]?.mainContent[0]?.about;
  // this.router.navigate([`dashboard/national/${item._id}`]);
  }
  subFilterFn(type) {
    if(type == 'popCat'){
      this.popBtn = true;
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
    if(type == 'ulbType'){
      this.popBtn = false;
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
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["<100k", "100K-500K", "500K-1M", "1M-4M", "4M+"],
        datasets: [
          {
            label: "Average",
            data: [20, 80, 23, 80, 120,160],
            backgroundColor: '#456EDE',
            borderWidth: 1,
            barThickness: 40
          }
        ]
      },
      options: {
        legend: {
            position: 'bottom'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display:false
            }
            }
          ],
          xAxes: [
            {
            gridLines: {
                display:false
            }
          }
      ],
        }
      }
    });
  }
}
