import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DashboardService } from "../../services/dashboard/dashboard.service";

@Component({
  selector: "app-slb-charts",
  templateUrl: "./slb-charts.component.html",
  styleUrls: ["./slb-charts.component.scss"],
})
export class SlbChartsComponent implements OnInit, OnChanges {
  constructor(
    public dashboardServices: DashboardService,
    public dialog: MatDialog
  ) {}

  isCompare = false;
  slbGaugeCharts = [];
  @Input() data: any;
  @Input() cityId: any;
  aboutSlbCharts = "";
  dialogRef;
  @ViewChild("template") template;
  @Output()
  compareChange = new EventEmitter();
  @Input()
  compareDialogType = 3;
  compareType = "";
  @Input()
  year;
  ulbData;
  yearList = [
    "2015-16",
    "2016-17",
    "2017-18",
    "2018-19",
    "2019-20",
    "2020-21",
    "2021-22",
  ];
  chartLabels = [
    {
      name: "ulb",
      color: "#224BD5",
    },
    {
      name: "Benchmark",
      color: "#29CFD6",
    },
    {
      name: "",
      color: "",
    },
    {
      name: "Good",
      color: "#04D30C",
    },
    {
      name: "Bad",
      color: "#E64E4E",
    },
    {
      name: "Ok",
      color: "#FFC80F",
    },
  ];

  yearValueChange(value) {
    console.log(value);
    this.year = value;
    this.getData();
  }

  ngOnInit(): void {
    console.log("data slb charts", this.data);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.aboutSlbCharts = this.data?.mainContent[0]?.about;
      this.getData();
    }
    if (changes.cityId) {
      this.ulbData = JSON.parse(localStorage.getItem("ulbMapping"));
      // this.ulbData = this.ulbData[changes.cityId.currentValue];
    }
  }
  getData() {
    let typeName = this.data.name;
    switch (this.data.name) {
      case "Storm Water Drainage":
        typeName = "storm water";
        break;
      case "Solid Waste Management":
        typeName = "solid waste";
        break;
      case "Waste Water Management":
        typeName = "sanitation";
        break;
    }

    let queryParams = {
      compUlb: this.compareType,
      ulb: this.cityId,
      type: typeName,
      year: this.year,
    };

    this.dashboardServices.fetchCitySlbChartData(queryParams).subscribe(
      (res: any) => {
        console.log("city respo", res);
        this.chartLabels = this.chartLabels.map((value) => {
          if (value.name == "ulb") {
            value.name = this.ulbData[this.cityId].name;
          }
          if (
            value.name === "" &&
            res["data"][0].hasOwnProperty("compPercentage")
          ) {
            value.name = this.ulbData[this.compareType].name;
            value.color = "#FFC80F";
          }
          return value;
        });
        res.data.map((value) => {
          if (value.percentage)
            value.percentage = Number(value.percentage.toFixed(2));
          else value.percentage = 0;
          if (value.value === "NA") {
            value.value = 0;
          }
        });
        this.slbGaugeCharts = res?.data.map((value, Index) => {
          Object.assign(value, { type: 6 });
          Object.assign(value, { chartId: Index + "slb-Charts" + value.type });
          return value;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

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

  ownRevenueCompValue(value) {
    this.compareChange.emit(value);
  }

  getCompareCompValues(value) {
    if (Array.isArray(value)) {
      this.compareType = value[0]._id;
      this.getData();
      return this.sendValue(value);
    } else this.compareType = value;
    this.sendValue();
    this.getData();
  }
  sendValue(ulbs = []) {
    let data = {
      year: this.year.value,
      ulbs: ulbs,
      compareType: this.compareType,
    };
    this.compareChange.emit(data);
  }
}
