import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slb-charts',
  templateUrl: './slb-charts.component.html',
  styleUrls: ['./slb-charts.component.scss']
})
export class SlbChartsComponent implements OnInit {

  constructor() { }
  isCompare = false;
  slbGaugeCharts = [
    {
      id: '',
      data: ''
    },
    {
      id: '',
      data: ''
    },
    {
      id: '',
      data: ''
    },
    {
      id: '',
      data: ''
    },
    {
      id: '',
      data: ''
    },
    {
      id: '',
      data: ''
    },
  ]
  ngOnInit(): void {
  }

}
