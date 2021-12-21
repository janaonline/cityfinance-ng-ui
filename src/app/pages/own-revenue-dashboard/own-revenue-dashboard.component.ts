import { Component, OnInit ,Input } from '@angular/core';
import Chart from 'chart.js';
import {OwnRevenueService}from "./own-revenue.service"

@Component({
  selector: 'app-own-revenue-dashboard',
  templateUrl: './own-revenue-dashboard.component.html',
  styleUrls: ['./own-revenue-dashboard.component.scss']
})
export class OwnRevenueDashboardComponent implements OnInit {

//   showShortDesciption = true
//   alterDescriptionText() {
//     this.showShortDesciption = !this.showShortDesciption
//  }

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
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
    "address": {
      "street": "Douglas Extension",
      "suite": "Suite 847",
      "city": "McKenziehaven",
      "zipcode": "59590-4157",
      "geo": {
        "lat": "-68.6102",
        "lng": "-47.0653"
      }
    },
    "phone": "1-463-123-4447",
    "website": "ramiro.info",
    "company": {
      "name": "Romaguera-Jacobson",
      "catchPhrase": "Face to face bifurcated interface",
      "bs": "e-enable strategic applications"
    }
  },
  {
    "id": 4,
    "name": "Patricia Lebsack",
    "username": "Karianne",
    "email": "Julianne.OConner@kory.org",
    "address": {
      "street": "Hoeger Mall",
      "suite": "Apt. 692",
      "city": "South Elvis",
      "zipcode": "53919-4257",
      "geo": {
        "lat": "29.4572",
        "lng": "-164.2990"
      }
    },
    "phone": "493-170-9623 x156",
    "website": "kale.biz",
    "company": {
      "name": "Robel-Corkery",
      "catchPhrase": "Multi-tiered zero tolerance productivity",
      "bs": "transition cutting-edge web services"
    }
  },
  {
    "id": 5,
    "name": "Chelsey Dietrich",
    "username": "Kamren",
    "email": "Lucio_Hettinger@annie.ca",
    "address": {
      "street": "Skiles Walks",
      "suite": "Suite 351",
      "city": "Roscoeview",
      "zipcode": "33263",
      "geo": {
        "lat": "-31.8129",
        "lng": "62.5342"
      }
    },
    "phone": "(254)954-1289",
    "website": "demarco.info",
    "company": {
      "name": "Keebler LLC",
      "catchPhrase": "User-centric fault-tolerant solution",
      "bs": "revolutionize end-to-end systems"
    }
  },
  {
    "id": 6,
    "name": "Mrs. Dennis Schulist",
    "username": "Leopoldo_Corkery",
    "email": "Karley_Dach@jasper.info",
    "address": {
      "street": "Norberto Crossing",
      "suite": "Apt. 950",
      "city": "South Christy",
      "zipcode": "23505-1337",
      "geo": {
        "lat": "-71.4197",
        "lng": "71.7478"
      }
    },
    "phone": "1-477-935-8478 x6430",
    "website": "ola.org",
    "company": {
      "name": "Considine-Lockman",
      "catchPhrase": "Synchronised bottom-line interface",
      "bs": "e-enable innovative applications"
    }
  },
  {
    "id": 7,
    "name": "Kurtis Weissnat",
    "username": "Elwyn.Skiles",
    "email": "Telly.Hoeger@billy.biz",
    "address": {
      "street": "Rex Trail",
      "suite": "Suite 280",
      "city": "Howemouth",
      "zipcode": "58804-1099",
      "geo": {
        "lat": "24.8918",
        "lng": "21.8984"
      }
    },
    "phone": "210.067.6132",
    "website": "elvis.io",
    "company": {
      "name": "Johns Group",
      "catchPhrase": "Configurable multimedia task-force",
      "bs": "generate enterprise e-tailers"
    }
  },
  {
    "id": 8,
    "name": "Nicholas Runolfsdottir V",
    "username": "Maxime_Nienow",
    "email": "Sherwood@rosamond.me",
    "address": {
      "street": "Ellsworth Summit",
      "suite": "Suite 729",
      "city": "Aliyaview",
      "zipcode": "45169",
      "geo": {
        "lat": "-14.3990",
        "lng": "-120.7677"
      }
    },
    "phone": "586.493.6943 x140",
    "website": "jacynthe.com",
    "company": {
      "name": "Abernathy Group",
      "catchPhrase": "Implemented secondary concept",
      "bs": "e-enable extensible e-tailers"
    }
  },
  {
    "id": 9,
    "name": "Glenna Reichert",
    "username": "Delphine",
    "email": "Chaim_McDermott@dana.io",
    "address": {
      "street": "Dayna Park",
      "suite": "Suite 449",
      "city": "Bartholomebury",
      "zipcode": "76495-3109",
      "geo": {
        "lat": "24.6463",
        "lng": "-168.8889"
      }
    },
    "phone": "(775)976-6794 x41206",
    "website": "conrad.com",
    "company": {
      "name": "Yost and Sons",
      "catchPhrase": "Switchable contextually-based project",
      "bs": "aggregate real-time technologies"
    }
  },
  {
    "id": 10,
    "name": "Clementina DuBuque",
    "username": "Moriah.Stanton",
    "email": "Rey.Padberg@karina.biz",
    "address": {
      "street": "Kattie Turnpike",
      "suite": "Suite 198",
      "city": "Lebsackbury",
      "zipcode": "31428-2261",
      "geo": {
        "lat": "-38.2386",
        "lng": "57.2232"
      }
    },
    "phone": "024-648-3804",
    "website": "ambrose.net",
    "company": {
      "name": "Hoeger LLC",
      "catchPhrase": "Centralized empowering task-force",
      "bs": "target end-to-end models"
    }
  }
]

  //Table Data Ends

  @Input()
  cardData = [revenueCollection, revenuePerCapita, revenueExpenditure, revenuePercentage];

  constructor(private ownRevenueService:OwnRevenueService) {
    this.ownRevenueService.test()
   }

  ngOnInit(): void {

    // Half Doughnut Data
    const canvas = <HTMLCanvasElement> document.getElementById('myChart1');
    console.log("#####",canvas);
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
          cutoutPercentage: 45
        }
      });
  }
  
}


const revenueCollection = {
  "type": "5",  
  "title": "1000 Cr",
  "subTitle": "Own Revenue Collections",
  "svg": "../../../assets/form-icon/north_east_black_24dp.svg",
  "percentage": "5%",
}

const revenuePerCapita = {
  "type": "5",
  "title": "1000",
  "subTitle": "Own Revenue Per Capita",
  "svg": "../../../assets/form-icon/north_east_black_24dp.svg",
  "percentage": "3%",
}

const revenueExpenditure = {
  "type":"5",
  "title": "120",
  "subTitle": "Cities Where Own Revenue Meet Revenue Expenditure",
  "svg": "../../../assets/form-icon/south_west_black_24dp.svg",
  "percentage": "2%",
}

const revenuePercentage = {
  "type":"5",
  "title": "72%",
  "subTitle": "Own Revenue As A Percentage Of Revenue Expenditure",
  "svg": "../../../assets/form-icon/north_east_black_24dp.svg",
  "percentage": "3%",
}

