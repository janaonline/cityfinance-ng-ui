import {
  Component,
  Input,
  Output,
  OnInit,
  SimpleChanges,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "app-revenue-mix",
  templateUrl: "./revenue-mix.component.html",
  styleUrls: ["./revenue-mix.component.scss"],
})
export class RevenueMixComponent implements OnInit {
  @Input() chartData;
  @Input() chartId;
  @Input() chartTitle;
  @Input() chartOptions;
  @Input() multiChart: boolean = false;
  @Input() returnCompType: boolean = false;
  @Output() dounghnuChartLabels = new EventEmitter<any>();

  @Output()
  compType = new EventEmitter();

  doughnutArray: any = [
    {
      id: "p1",
      title: "State Average",
      type: "doughnut",
      data: {
    
        labels: [
          "Own Revenue",
          "Assigned Revenue",
          "Grants",
          "Interest Income",
          "Other Income",
          "State & Hire Charges",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [0,0,0,0,0,0],
            backgroundColor: [
              "#76d12c",
              "#ed8e3b",
              "#15c3eb",
              "#eb15e3",
              "#e6e21c",
              "#fc3d83",
            ],
            hoverOffset: 4,
          },
        ],
      },

      options: {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                return previousValue + currentValue;
              });
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
              return percentage + "%";
            }
          }
        },
        legend: {
          display: false,
        },
      },
    },
    {
      id: "p2",
      title: "Municipality",
      type: "doughnut",
      data: {
       
        labels: [
       
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [],
            backgroundColor: [
              "#76d12c",
              "#ed8e3b",
              "#15c3eb",
              "#eb15e3",
              "#e6e21c",
              "#fc3d83",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                return previousValue + currentValue;
              });
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
              return percentage + "%";
            }
          }
        },
        legend: {
          display: false,
        },
      },
    },
    {
      id: "p3",
      title: "Municipal Corporation",
      type: "doughnut",
      data: {
       
        labels: [
        
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [],
            backgroundColor: [
              "#76d12c",
              "#ed8e3b",
              "#15c3eb",
              "#eb15e3",
              "#e6e21c",
              "#fc3d83",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                return previousValue + currentValue;
              });
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
              return percentage + "%";
            }
          }
        },
        legend: {
          display: false,
        },
      },
    },
    {
      id: "p4",
      title: "Town Panchayat",
      type: "doughnut",
      data: {
        
        labels: [
          
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [],
            backgroundColor: [
              "#76d12c",
              "#ed8e3b",
              "#15c3eb",
              "#eb15e3",
              "#e6e21c",
              "#fc3d83",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                return previousValue + currentValue;
              });
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
              return percentage + "%";
            }
          }
        },
        legend: {
          display: false,
        },
      },
    },
  ];
//population based
  newDoughnutArray: any = [
    {
      id: "p5",
      title: "Maharashtra",
      data: {
        type: "doughnut",
        labels: [
          "Own Revenue",
          "Assigned Revenue",
          "Grants",
          "Interest Income",
          "Other Income",
          "State & Hire Charges",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100, 90, 75, 64],
            backgroundColor: [
              "#76d12c",
              "#ed8e3b",
              "#15c3eb",
              "#eb15e3",
              "#e6e21c",
              "#fc3d83",
            ],
            hoverOffset: 4,
          },
        ],
      },

      options: {
        legend: {
          display: false,
        },
      },
    },
    {
      id: "p6",
      title: "<100K",
      data: {
        type: "doughnut",
        labels: [
          "Own Revenue",
          "Assigned Revenue",
          "Grants",
          "Interest Income",
          "Other Income",
          "State & Hire Charges",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100, 90, 75, 64],
            backgroundColor: [
              "#76d12c",
              "#ed8e3b",
              "#15c3eb",
              "#eb15e3",
              "#e6e21c",
              "#fc3d83",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
      },
    },
    {
      id: "p7",
      title: "100K-500K",
      data: {
        type: "doughnut",
        labels: [
          "Own Revenue",
          "Assigned Revenue",
          "Grants",
          "Interest Income",
          "Other Income",
          "State & Hire Charges",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100, 90, 75, 64],
            backgroundColor: [
              "#76d12c",
              "#ed8e3b",
              "#15c3eb",
              "#eb15e3",
              "#e6e21c",
              "#fc3d83",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
      },
    },
    {
      id: "p8",
      title: "500k - 1M",
      data: {
        type: "doughnut",
        labels: [
          "Own Revenue",
          "Assigned Revenue",
          "Grants",
          "Interest Income",
          "Other Income",
          "State & Hire Charges",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100, 90, 75, 64],
            backgroundColor: [
              "#76d12c",
              "#ed8e3b",
              "#15c3eb",
              "#eb15e3",
              "#e6e21c",
              "#fc3d83",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
      },
    },
  ];
//population based again
  doughnutArray1 = [
    {
      type: "doughnut",
      id: "p1",
      title: "4M+",
      data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    },
    {
      type: "doughnut",
      id: "p2",
      title: "4M+",
      data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    },
    {
      type: "doughnut",
      id: "p3",
      title: "4M+",
      data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    },
    {
      type: "doughnut",
      id: "p4",
      title: "4M+",
      data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    },
    {
      type: "doughnut",
      id: "p5",
      title: "4M+",
      data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    },
  ];
//single dounught
  doughnutChartData = {
    type: "doughnut",
    data: {
      type: "doughnut",
      labels: [
        "Own Revenue",
        "Assigned Revenue",
        "Grants",
        "Interest Income",
        "Other Income",
        "State & Hire Charges",
      ],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100, 90, 75, 64],
          backgroundColor: [
            "#1E44AD",
            "#25C7CE",
            "#585FFF",
            "#FFD72E",
            "#22A2FF",
            "#FF608B",
          ],
          hoverOffset: 4,
        },
      ],
    },

  };
//options
  doughnutChartOptions = {
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        usePointStyle: true,
      },
    },
  };

  multipleChartLabelArray = [
    { text: "test", color: "#FF608B" },
    { text: "test", color: "#FF608B" },
    { text: "test", color: "#FF608B" },
  ];
  constructor() {}

  ulbTab:boolean = false;
  populationTab:boolean = false;

  finalMultipleDoughnut = [];
  getChartLabel(event){
    console.log(event)
    let data = []
     event.forEach(element => {
      data.push(element.text)
    });
console.log('labels',data )
    this.dounghnuChartLabels.emit(data)
  }
  getMultipleDoughnutCharts() {
    if (this.ulbTab) {
      this.finalMultipleDoughnut = this.doughnutArray;
    }else if (this.populationTab) {
      this.finalMultipleDoughnut = this.newDoughnutArray;
    }
    this.finalMultipleDoughnut = [ ...this.finalMultipleDoughnut ];
    console.log(this.finalMultipleDoughnut);
  }

  mulpleChartShow = false;

  ulbFunction(value) {
    console.log(value);
    if (value == 1) {
      this.ulbTab = true;
      this.populationTab = false;
      
      this.mulpleChartShow = true;
      this.compType.emit('ulbType')
    }
    if (value == 2) {
      this.ulbTab = false;
      this.populationTab = true;
      
      this.mulpleChartShow = true;
      this.compType.emit('popType')
    }
    if (value == 3) {
      this.ulbTab = false;
      this.populationTab = false;
    
      this.mulpleChartShow = false;
      this.compType.emit('default')
    }

    console.log("this.ulbTab", this.ulbTab, this.populationTab);
  }

  ngOnInit(): void {
    this.getMultipleDoughnutCharts();
    console.log("doughnutArray", this.doughnutArray1);
  }
  initializeDounughtArry(){
    this.doughnutArray = [
      {
        id: "p1",
        title: "State Average",
        type: "doughnut",
        data: {
      
          labels: [
            "Own Revenue",
            "Assigned Revenue",
            "Grants",
            "Interest Income",
            "Other Income",
            "State & Hire Charges",
          ],
          datasets: [
            {
              label: "My First Dataset",
              data: [0,0,0,0,0,0],
              backgroundColor: [
                "#76d12c",
                "#ed8e3b",
                "#15c3eb",
                "#eb15e3",
                "#e6e21c",
                "#fc3d83",
              ],
              hoverOffset: 4,
            },
          ],
        },
  
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                  return previousValue + currentValue;
                });
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
                return percentage + "%";
              }
            }
          },
          legend: {
            display: false,
          },
        },
      },
      {
        id: "p2",
        title: "Municipality",
        type: "doughnut",
        data: {
         
          labels: [
         
          ],
          datasets: [
            {
              label: "My First Dataset",
              data: [],
              backgroundColor: [
                "#76d12c",
                "#ed8e3b",
                "#15c3eb",
                "#eb15e3",
                "#e6e21c",
                "#fc3d83",
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                  return previousValue + currentValue;
                });
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
                return percentage + "%";
              }
            }
          },
          legend: {
            display: false,
          },
        },
      },
      {
        id: "p3",
        title: "Municipal Corporation",
        type: "doughnut",
        data: {
         
          labels: [
          
          ],
          datasets: [
            {
              label: "My First Dataset",
              data: [],
              backgroundColor: [
                "#76d12c",
                "#ed8e3b",
                "#15c3eb",
                "#eb15e3",
                "#e6e21c",
                "#fc3d83",
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                  return previousValue + currentValue;
                });
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
                return percentage + "%";
              }
            }
          },
          legend: {
            display: false,
          },
        },
      },
      {
        id: "p4",
        title: "Town Panchayat",
        type: "doughnut",
        data: {
          
          labels: [
            
          ],
          datasets: [
            {
              label: "My First Dataset",
              data: [],
              backgroundColor: [
                "#76d12c",
                "#ed8e3b",
                "#15c3eb",
                "#eb15e3",
                "#e6e21c",
                "#fc3d83",
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                  return previousValue + currentValue;
                });
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
                return percentage + "%";
              }
            }
          },
          legend: {
            display: false,
          },
        },
      },
    ]
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("revenue chages", changes);

    if (changes && changes.returnCompType && changes.returnCompType.currentValue) {
      if (changes.returnCompType.currentValue == 'ulbType') {
        this.ulbTab = true;
        this.populationTab = false;
      } else if (changes.returnCompType.currentValue == 'popType') {
        this.ulbTab = false;
        this.populationTab = true;
      } else {
        this.ulbTab = false;
        this.populationTab = false;
      }
    }
    if(!changes.chartData.firstChange){
console.log(this.chartData)
this.initializeDounughtArry();
if(Array.isArray(this.chartData)){
  this.chartData.forEach(el=>{
    if(Object.keys(el)[0] == 'mData'){
        let val: any = Object.values(el)[0][0]
        console.log(val)
        val.forEach(el2 => {
          this.doughnutArray[1].data.labels.push(el2['code'])
          this.doughnutArray[1].data.datasets[0].data.push(el2['amount'])
        })
    }
    if(Object.keys(el)[0] == 'mcData'){
      let val : any = Object.values(el)[0][0]
      val.forEach(el2 => {
        this.doughnutArray[2].data.labels.push(el2['code'])
        this.doughnutArray[2].data.datasets[0].data.push(el2['amount'])
      })
  }
  if(Object.keys(el)[0] == 'tpData'){
    let val: any = Object.values(el)[0][0]
    val.forEach(el2 => {
      this.doughnutArray[3].data.labels.push(el2['code'])
      this.doughnutArray[3].data.datasets[0].data.push(el2['amount'])
    })
}
  })

  
  this.doughnutArray[0].data.datasets[0].data = [ 
    this.doughnutArray[1].data.datasets[0].data, 
     this.doughnutArray[2].data.datasets[0].data,  
     this.doughnutArray[3].data.datasets[0].data]
     .reduce(function (a, b) {
        return a.map(function (v, i) {
            return v + b[i];
        });
    });
}
console.log(this.doughnutArray)
this.getMultipleDoughnutCharts() 
}
  }
}
