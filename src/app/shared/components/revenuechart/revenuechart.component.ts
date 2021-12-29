import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import Chart from "chart.js";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CompareDialogComponent } from "../compare-dialog/compare-dialog.component";
@Component({
  selector: "app-revenuechart",
  templateUrl: "./revenuechart.component.html",
  styleUrls: ["./revenuechart.component.scss"],
})
export class RevenuechartComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  @ViewChild("template") template;

  
//Full Doughnut Chart Data of OwnRevenueDashboard Starts
@Input() 
 ownRevenueDoughnut = {
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
}  //Full Doughnut Chart Data of OwnRevenueDashboard Ends

//Full Bar Chart Data of OwnRevenueDashboard Starts
@Input() 
 ownRevenueBarChart = {
  type: 'bar',
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
      backgroundColor: [
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
}; //Full Bar Chart Data of OwnRevenueDashboard Ends
  

  @Input()
  data = {
    datasets: [
      {
        data: [
          {
            x: -10,
            y: 0,
          },
          {
            x: 50,
            y: 20,
          },
          {
            x: 0,
            y: 10,
          },
          {
            x: 19,
            y: 20,
          },
          {
            x: 10,
            y: 5,
          },
          {
            x: 6,
            y: 5.5,
          },
        ],
        label: "Municipality",
        backgroundColor: "#1EBFC6",
      },
      {
        data: [
          {
            x: -10,
            y: 0,
          },
          {
            x: 50,
            y: 20,
          },
          {
            x: 0,
            y: 10,
          },
        ],
        label: "Muncipal Corporation",
        backgroundColor: "#3E5DB1",
      },
      {
        data: [
          {
            x: -10,
            y: 0,
          },
          {
            x: 50,
            y: 20,
          },
          {
            x: 10,
            y: 10,
          },
        ],
        label: "Town Panchayat",
        backgroundColor: "#F5B742",
      },

      {
        type: "line",
        label: "Line Dataset",
        data: [50, 50, 50, 50],
        fill: false,
        borderColor: "rgb(54, 162, 235)",
      },
    ],
  };

  @Input()
  options: {
    elements: {
      point: {
        radius: 7;
      };
    };
    title: {
      display: true;
      text: "Population";
    };
    showLines: false;
    maintainAspectRatio: false;
    legend: {
      position: "bottom";
      align: "center";
      labels: {
        fontSize: 10;
        fontColor: "black";
        usePointStyle: true;
        padding: 28;
      };
    };
    // scales: {
    //   xAxes: [
    //     {
    //       type: "linear";
    //       position: "bottom";
    //     }
    //   ];
    //   yAxes: [
    //     {
    //       type: "linear";
    //       position: "left";
    //     }
    //   ];
    // };
    responsive: true;
  };

  barData = {
    labels: ["Delhi", "Mumbai", "Gurgaon", "Hissar"],
    datasets: [
      {
        data: [10, 30, 40, 50, 60],
        backgroundColor: "blue",
      },
    ],
  };

  scatterData = {
    datasets: [
      {
        label: "Line one",
        data: [
          { x: 0, y: 12 },
          { x: 50, y: 12 },
        ],
        showLine: true,
        fill: false,
        borderColor: "rgba(0, 200, 0, 1)",
      },
      {
        label: "Line Two",
        data: [
          { x: 0, y: 8 },
          { x: 50, y: 8 },
        ],
        showLine: true,
        fill: false,
        borderColor: "red",
      },
      {
        label: "Muncipality",
        data: [
          { x: 12, y: 12 },
          { x: 12, y: 4 },
          { x: 4, y: 6 },
          { x: 6, y: 9 },
          {
            x: 50,
            y: 20,
          },
          {
            x: 10,
            y: 10,
          },
        ],
        showLine: false,
        fill: true,
        borderColor: "#1EBFC6",
        backgroundColor: "#1EBFC6",
      },
      {
        label: "Muncipal Corporation",
        data: [
          { x: 9, y: 12 },
          { x: 8, y: 4 },
          { x: 24, y: 6 },
          { x: 8, y: 9 },
          {
            x: 30,
            y: 20,
          },
          {
            x: 15,
            y: 10,
          },
        ],
        showLine: false,
        fill: true,
        borderColor: "#3E5DB1",
        backgroundColor: "#3E5DB1",
      },
      {
        label: "Town Panchayat",
        data: [
          { x: 21, y: 12 },
          { x: 10, y: 4 },
          { x: 18, y: 6 },
          { x: 16, y: 9 },
          {
            x: 30,
            y: 20,
          },
          {
            x: 15,
            y: 10,
          },
        ],
        showLine: false,
        fill: true,
        borderColor: "#F5B742",
        backgroundColor: "#F5B742",
      },
    ],
  };

  @Input()
  headerActions = [
    {
      name: "shek",
      svg: "../../../../assets/stateform/Icon feather-menu.svg",
    },
    {
      name: "shek",
      svg: "../../../../assets/stateform/Icon feather-menu.svg",
    },
    {
      name: "shek",
      svg: "../../../../assets/stateform/Icon feather-menu.svg",
    },
  ];

  ngOnInit(): void {
    // this.renderChart()
  }

  renderChart(elementId,  graphData){
    const canvas = <HTMLCanvasElement>document.getElementById(elementId);
    const ctx = canvas.getContext("2d");
    const myChart = new Chart(ctx, {
      type: graphData.type,
      // type: "scatter",
      data: graphData.data,
      // data: this.scatterData,

      options: {
        elements: {
          point: {
            radius: 7,
          },
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Population",
              },
              ticks: {
                min: 0,
                max: 50,
              },
              offset: true,
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Total Revenue",
              },
              gridLines: {
                offsetGridLines: true,
                display: false,
              },
              ticks: {
                min: 0,
                max: 30,
              },
              offset: true,
            },
          ],
        },
        legend: {
          position: "bottom",
          align: "center",
          labels: {
            fontSize: 10,
            fontColor: "black",
            // usePointStyle: true,
            padding: 28,
          },
        },
      },
    });
  }

  actionClick(i) {
    console.log(i);
  }

  dialogRef;

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "39rem";
    this.dialogRef = this.dialog.open(this.template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      console.log("result", result);
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
