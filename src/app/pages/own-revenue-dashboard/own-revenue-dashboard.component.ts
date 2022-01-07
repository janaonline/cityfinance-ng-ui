import { Component, OnInit ,Input, ViewChild, TemplateRef } from '@angular/core';
// import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import Chart from 'chart.js';
import {OwnRevenueService}from "./own-revenue.service";


@Component({
  selector: 'app-own-revenue-dashboard',
  templateUrl: './own-revenue-dashboard.component.html',
  styleUrls: ['./own-revenue-dashboard.component.scss']
})
export class OwnRevenueDashboardComponent implements OnInit {
  @ViewChild("ownRevenueFiltersPopup")
  private ownRevenueFiltersPopup: TemplateRef<any>;

  ToggleString: string = "";
  showButton: boolean = true;

  close() {
    this.ToggleString = ""
    this.showButton = true;
  }
  open() {
    this.ToggleString = "the year YY. Data is not available for AA, BB and CC Municipal Corporation. For more details, download thecomplete set of ULBs for which the data is available for the year YY.";
    this.showButton = false;
  }


// Dummy data for table
 columnAttribute = [
   { "id": 1,
     "title": "ULB Population Category"
   },
   { "id": 2,
     "title": "Average Own Revenue Collections (In Crore Rs.)"
   },
   { "id": 3,
     "title": "Median Own Revenue Per Capita"
   },
   { "id": 4,
     "title": "Percentage Of Cities Where Own Revenues Meet Revenue Expenditure"
   },
   { "id": 5,
     "title": "Average Own Revenues As Percentage Of Revenue Expenditure"
   }
  ]

 users = [
  {
    "id": 1,
    "name": "4M+",
    "username": "50",
    "email": "30",
  },
  {
    "id": 2,
    "name": "500K - 1M",
    "username": "50",
    "email": "30",
  },
  {
    "id": 3,
    "name": "100K - 500K",
    "username": "50",
    "email": "10",
  },
  {
    "id": 4,
    "name": "1M - 4M",
    "username": "40",
    "email": "20",
  },
  {
    "id": 5,
    "name": "200K - 500K",
    "username": "50",
    "email": "30",
  }
]

doughnutChartId = `ownRevenue-doughnutChart-${Math.random()}`
barChartId = `ownRevenue-barChart-${Math.random()}`


doughnutChartData= {
  type: 'doughnut',
  data: {
   labels: [
         'Property Tax',
         'Advertisement Tax',
         'Total License Fee',
         'Water Charges',
         'Sewerage Charges',
         'Rental Income',
         'Other Income'
     ],
   datasets: [
     {
       data: [68,22,19,7,5,,15,20],
       backgroundColor: [
         'rgba(30, 68, 173, 1)',
         'rgba(37, 199, 206, 1)',
         'rgba(88, 95, 255, 1)',
         'rgba(255, 215, 46, 1)',
         'rgba(34, 162, 255, 1)',
         'rgba(255, 96, 139, 1)',
         'rgba(25, 229, 158, 1)'
       ],
       fill: false
     },
   ],
   options: {
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 28,
      }
    },
    responsive: true
  }
},
}

barChartData = {
  type: 'bar',
  data: {
      labels: [
          "Jalandhar",
          "Chennai",
          "Pune",
          "Amhedabad",
          "Mumbai",
          "Jaipur",
          "Rohtak",
          "Nashik",
          "Nagpur",
          "Thane"
        ],
    datasets: [
                  {
                    data: [160, 140, 120, 100, 80, 60, 40, 20, 10, 5],
                    backgroundColor:
                     [
                        "rgba(30, 68, 173, 1)",
                        "rgba(34, 76, 192, 1)",
                        "rgba(37, 83, 211, 1)",
                        "rgba(51, 96, 219, 1)",
                        "rgba(69, 110, 222, 1)",
                        "rgba(88, 125, 225, 1)",
                        "rgba(106, 139, 229, 1)",
                        "rgba(134, 162, 237, 1)",
                        "rgba(147, 170, 234, 1)",
                        "rgba(168, 188, 240, 1)"
                      ],
                  },
               ],
},
}

  //Table Data Ends

  @Input()
  cardData = [revenueCollection, revenuePerCapita, revenueExpenditure, revenuePercentage];

  // this.ownRevenueService.test() public matdialog: MatDialog
  constructor(private ownRevenueService:OwnRevenueService
              ) {

   }

  ngOnInit(): void {

    // Half Doughnut Data
    const canvas = <HTMLCanvasElement> document.getElementById('myChart1');
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [
              {
                  label: 'Availability',
                  data: [75,25],
                  backgroundColor: [
                      'rgba(51, 96, 219, 1)',
                      'rgba(218, 226, 253, 1)',
                    ],
              }
          ]
        },
        options: {
          rotation: 1 * Math.PI,
                   circumference: 1 * Math.PI,
                   legend: {
                       display: false
                   },
                   cutoutPercentage: 80
         }
    });

      // Full Doughnut Data
      const myChart1 = new Chart('canvas', {
        type: 'doughnut',
        data: {
          labels: [
                'Property Tax',
                'Advertisement Tax',
                'Total License Fee',
                'Water Charges',
                'Sewerage Charges',
                'Rental Income',
                'Other Income'
            ],
          datasets: [
            {
              data: [68,22,19,7,5,,15,20],
              backgroundColor: [
                'rgba(30, 68, 173, 1)',
                'rgba(37, 199, 206, 1)',
                'rgba(88, 95, 255, 1)',
                'rgba(255, 215, 46, 1)',
                'rgba(34, 162, 255, 1)',
                'rgba(255, 96, 139, 1)',
                'rgba(25, 229, 158, 1)'
              ],
              fill: false
            },
          ],
        },
        options: {
          legend: {
            display: true,
            position: 'bottom'
          },
          tooltips:{
            enabled:true
          },
          cutoutPercentage: 45,
          responsive: true
        }
      });
  }

}

// openOwnRevenuePopump() {
//   this.matdialog.open(this.ownRevenueFiltersPopup, {
//     height: "fit-content",
//     width: "50vw",
//   });
// }


const revenueCollection = {
  "type": "5",
  "title": "1000 Cr",
  "subTitle": "Own Revenue Collections",
  "svg": "../../../assets/resources-das/north_east_green_24dp.svg",
  "percentage": "5%",
  "color":"#22C667"
}

const revenuePerCapita = {
  "type": "5",
  "title": "1000",
  "subTitle": "Own Revenue Per Capita",
  "svg": "../../../assets/resources-das/north_east_green_24dp.svg",
  "percentage": "3%",
   "color":"#22C667"
}

const revenueExpenditure = {
  "type":"5",
  "title": "120",
  "subTitle": "Cities Where Own Revenue Meet Revenue Expenditure",
  "svg": "../../../assets/resources-das/south_west_red_24dp.svg",
  "percentage": "2%",
  "color":"#E64E4E"
}

const revenuePercentage = {
  "type":"5",
  "title": "72%",
  "subTitle": "Own Revenue As A Percentage Of Revenue Expenditure",
  "svg": "../../../assets/resources-das/north_east_green_24dp.svg",
  "percentage": "3%",
  "color":"#22C667"
}

function openOwnRevenuePopup() {
  throw new Error('Function not implemented.');
}

