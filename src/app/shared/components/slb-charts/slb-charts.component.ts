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
  compareByName;
  @Input()
  year;
  ulbList;
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
      name: "National",
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
      this.ulbList = JSON.parse(localStorage.getItem("ulbMapping"));
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
            value.name = this.ulbList[this.cityId].name;
          }
          return value;
        });
        if (
          res["data"].length &&
          res["data"][0].hasOwnProperty("compPercentage")
        ) {
          this.chartLabels.pop();
          this.chartLabels.push({
            name: this.ulbList[this.compareType].name,
            color: "#FFC80F",
          });
        }

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
      this.compareByName =
        this.ulbList[this.compareType].name.split(" ")[0] + "...";
      this.getData();
      return this.sendValue(value);
    } else this.compareType = value;
    this.compareByName = value;
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

  clearAll() {
    this.compareByName = "";
    this.compareType = "";
    if (this.chartLabels.length === 3) {
      this.chartLabels.pop();
      this.chartLabels.push({
        name: "National",
        color: "#FFC80F",
      });
    }

    this.getData();
  }
}
