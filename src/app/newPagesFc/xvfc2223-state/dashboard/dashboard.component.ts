import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  viewMode = 'tab1';
  cardData : any = {
    title: 'card1',
    cardData: [{
      icon:'../../../../assets/dashboard-state/16-location.svg',
      link:'',
      value:'4600',
      lable:'Total ULBs',
      color:''
    },
    {
      icon:'../../../../assets/dashboard-state/XMLID_1248_.svg',
      link:'',
      value:'500',
      lable:'Non Million Cities',
      color:''
    },
    {
      icon:'../../../../assets/dashboard-state/sustainable.svg',
      link:'',
      value:'60',
      lable:'Million Plus UAs',
      color:''
    },
    {
      icon:'../../../../assets/dashboard-state/16-location.svg',
      link:'',
      value:'600',
      lable:'ULBs in Million-Plus UAs',
      color:''
    }]
  }
  formData : any = [
    {
      formHeader:'ULB Forms',
      formData :[{
         formName: 'Annual Account Upload',
         color:'#232334',
         submittedValue:10,
         approvedValue: 90,
         icon:'',
         link:''
      },
      {
        formName: 'PFMS Linkage',
        color:'#232323',
        submittedValue:20,
        approvedValue: 80,
        icon:'',
        link:''
      }]
    },
    {
      formHeader:'State Forms',
      formData :[{
        formName: 'SFC Notification',
        color:'#232334',
        submittedValue:100,
        approvedValue: 100
     },
     {
       formName: 'Property Tax',
       color:'#232323',
       submittedValue:100,
       approvedValue: 100
     }]
    }
  ] 
  constructor() { }

  ngOnInit(): void {
  }

}
