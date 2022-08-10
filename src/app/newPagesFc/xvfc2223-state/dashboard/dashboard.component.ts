import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cardData : any = {
    title: 'card1',
    cardData: [{
      icon:'',
      link:'',
      value:'4600',
      lable:'Total ULBs',
      color:''
    },
    {
      icon:'',
      link:'',
      value:'500',
      lable:'Non Million Cities',
      color:''
    },
    {
      icon:'',
      link:'',
      value:'60',
      lable:'Million Plus UAs',
      color:''
    },
    {
      icon:'',
      link:'',
      value:'600',
      lable:'ULBs in Million-Plus UAs',
      color:''
    }]
  }
  constructor() { }

  ngOnInit(): void {
  }

}
