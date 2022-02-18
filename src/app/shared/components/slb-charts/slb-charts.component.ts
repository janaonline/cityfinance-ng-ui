import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-slb-charts',
  templateUrl: './slb-charts.component.html',
  styleUrls: ['./slb-charts.component.scss']
})
export class SlbChartsComponent implements OnInit, OnChanges {

  constructor(
    public dashboardServices : DashboardService,
    public dialog: MatDialog
  ) { }

  isCompare = false;
  slbGaugeCharts;
  @Input() data: any;
  @Input() cityId: any;
  aboutSlbCharts ='';
  dialogRef;
  @ViewChild("template") template;
  @Output()
  compareChange = new EventEmitter();
  @Input()
  compareDialogType = 1;
  compareType = "";
  year;

  ngOnInit(): void {
    this.aboutSlbCharts = this.data?.mainContent[0]?.about;
    console.log('data slb charts', this.data);

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getData();
  }
  getData(){
    this.dashboardServices.fetchCitySlbChartData(this.cityId, this.data?.name).subscribe((res: any)=>{
    console.log('city respo', res);
    this.slbGaugeCharts = res?.data;

    },
    (error)=>{
      console.log(error);

    })
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
