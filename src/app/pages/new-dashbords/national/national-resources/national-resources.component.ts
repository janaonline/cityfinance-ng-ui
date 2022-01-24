import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-national-resources',
  templateUrl: './national-resources.component.html',
  styleUrls: ['./national-resources.component.scss']
})
export class NationalResourcesComponent implements OnInit {

  constructor() { }

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
  ngOnInit(): void {
  }

}
