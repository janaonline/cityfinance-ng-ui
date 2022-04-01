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
      label: "How to motivate Tax officials?",
      imgUrl: '../../../../../assets/new_dashBord_ftr_hdr/Group 15745/Group 15745.png',
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
    }else if(item.label.includes('motivate Tax officials')){
      this.showIframe = true;
    }

    console.log(item.label)
  }


}



