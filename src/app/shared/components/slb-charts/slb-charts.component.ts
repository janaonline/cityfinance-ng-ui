import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard/dashboard.service';

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
  slbGaugeCharts;
  @Input() data: any;
  @Input() cityId: any;
  aboutSlbCharts = "";
  dialogRef;
  @ViewChild("template") template;
  @Output()
  compareChange = new EventEmitter();
  @Input()
  compareDialogType = 1;
  compareType = "";
  year;
  yearList = ["2015-16", "2016-17", "2017-18", "2018-19", "2019-20", "2020-21"];
  chartLabels = [
    {
      name: "Mumbai",
      color: "#224BD5",
    },
    {
      name: "Benchmark",
      color: "#29CFD6",
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
  }
  getData() {
    let typeName = this.data.name;

    if (this.data.name == "Storm Water Drainage") typeName = "storm water";
    if (this.data.name == "Solid Waste Management") typeName = "solid waste";
    if (this.data.name == "Waste Water Management") typeName = "sanitation";

    let queryParams = {
      compUlb: "",
      ulb: this.cityId,
      type: typeName,
      year: this.year,
    };

    this.dashboardServices.fetchCitySlbChartData(queryParams).subscribe(
      (res: any) => {
        console.log("city respo", res);
        res.data.map((value) => {
          if (value.percentage)
            value.percentage = Number(value.percentage.toFixed(2));
          else value.percentage = 0;
        });
        this.slbGaugeCharts = res?.data;
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
      this.compareType = "ULBs..";
      return this.sendValue(value);
    } else this.compareType = value;
    this.sendValue();
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
