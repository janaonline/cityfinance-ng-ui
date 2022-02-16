import { Component, Input, OnInit } from '@angular/core';

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
      data: '',
      about: 'Coverage of water supply connections'
    },
    {
      id: '',
      data: '',
      about: 'Per capita supply of water'
    },
    {
      id: '',
      data: '',
      about: 'Extent of metering of water connections'
    },
    {
      id: '',
      data: '',
      about: 'Coverage of water supply connections'
    },
    {
      id: '',
      data: '',
      about: 'Coverage of water supply connections'
    },
    {
      id: '',
      data: '',
      about: 'Coverage of water supply connections'
    },
    {
      id: '',
      data: '',
      about: 'Coverage of water supply connections'
    },
    {
      id: '',
      data: '',
      about: 'Coverage of water supply connections'
    },

  ]
  @Input() data: any;
  aboutSlbCharts =''
  ngOnInit(): void {
    this.aboutSlbCharts = this.data?.mainContent[0]?.about;
    console.log('data slb charts', this.data);

  }

}
