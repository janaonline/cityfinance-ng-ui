import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-e-learning-module',
  templateUrl: './e-learning-module.component.html',
  styleUrls: ['./e-learning-module.component.scss']
})
export class ELearningModuleComponent implements OnInit {

  constructor() { }
  tableau: any;
  viz: any;
  ngOnInit(): void {
    var placeholderDiv = document.getElementById('vizContainer');
    var obj = document.getElementById('obj');
    
    this.viz = new this.tableau.Viz(placeholderDiv, 'https%3A%2F%2Fprod-apnortheast-a.online.tableau.com%2F',  obj);
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
showIframe = false
showTableau = false
  openScorePer(item){
    this.showIframe = false
this.showTableau = false
    if(item.label.includes('1')){
      this.showTableau = true
    }else if(item.label.includes('2')){
      this.showIframe = true;
    }

    console.log(item.label)
  }


}



