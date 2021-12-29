import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolkits',
  templateUrl: './toolkits.component.html',
  styleUrls: ['./toolkits.component.scss']
})
export class ToolkitsComponent implements OnInit {

  constructor() { }
  isCardShow = true;
  cardData = [
    {
      label: "Digital Property Tax Toolkit",
      imgUrl: '../../../../assets/new_dashBord_ftr_hdr/shutterstock_546307051/shutterstock_546307051.png',
      link: ''
     },
     {
      label: "Municipal Borrowing Readiness Toolkit",
      imgUrl: '../../../../assets/new_dashBord_ftr_hdr/Group 15745/Group 15745.png',
      link: ''
     },
     {
      label: "Case study on Use of SHG for Property Tax Collection in…",
      imgUrl: '../../../../assets/new_dashBord_ftr_hdr/Group 15744/Group 15744.png',
      link: ''
     },
  ]

  subTabData = [
    {
       name: "Introduction",
       filter: ["innerTab1", "innerTab2", "innerTab3"],
       link: 'introduction'
      },
    {
       name: "Score Your Performance",
       link: 'score-performance' ,
    },
    {
      name: "Enumeration",
      filter: ["innerTab7", "innerTab8", "innerTab9"],
      link: 'enumeration'
     },
    {
       name: "Valuation",
       filter: ["innerTab10", "innerTab11", "innerTab12"],
       link: 'valuation'
    },
    {
      name: "Assessment",
      filter: ["innerTab10", "innerTab11", "innerTab12"],
      link: 'assessment'
    },
    {
      name: "Billing and Collection",
      filter: ["innerTab10", "innerTab11", "innerTab12"],
      link: 'billingCollection'
    },
    {
      name: "Reporting",
      filter: ["innerTab10", "innerTab11", "innerTab12"],
      link: 'reporting'
    },

  ];
  ngOnInit(): void {
  }
  openScorePer(card) {
    this.isCardShow = false;
  }
}
