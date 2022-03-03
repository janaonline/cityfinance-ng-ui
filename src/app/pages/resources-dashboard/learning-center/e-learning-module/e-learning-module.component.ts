import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-e-learning-module',
  templateUrl: './e-learning-module.component.html',
  styleUrls: ['./e-learning-module.component.scss']
})
export class ELearningModuleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  cardData = [
    {
      label: "E-Learning Module : 1",
      
      imgUrl: '../../../../../assets/new_dashBord_ftr_hdr/shutterstock_546307051/shutterstock_546307051.png',
      code: ''
     },
     {
      label: "E-Learning Module : 2",
      imgUrl: '../../../../../assets/new_dashBord_ftr_hdr/Group 15745/Group 15745.png',
      code: ''
     },
     {
      label: "E-Learning Module : 3",
      imgUrl: '../../../../../assets/new_dashBord_ftr_hdr/Group 15744/Group 15744.png',
      code: ''
     },
  ]

  openScorePer(item){
    console.log(item.label)
  }


}
