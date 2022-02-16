import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-slb-charts',
  templateUrl: './slb-charts.component.html',
  styleUrls: ['./slb-charts.component.scss']
})
export class SlbChartsComponent implements OnInit, OnChanges {

  constructor(
    public dashboardServices : DashboardService
  ) { }

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
  @Input() cityId: any;
  aboutSlbCharts =''
  ngOnInit(): void {
    this.aboutSlbCharts = this.data?.mainContent[0]?.about;
    console.log('data slb charts', this.data);


  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getData();
  }
  getData(){
    this.dashboardServices.fetchCitySlbChartData(this.cityId, this.data?.name).subscribe((res)=>{
    console.log('city respo', res);

    },
    (error)=>{
      console.log(error);

    })
  }

}
