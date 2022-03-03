import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learning-center',
  templateUrl: './learning-center.component.html',
  styleUrls: ['./learning-center.component.scss']
})
export class LearningCenterComponent implements OnInit {

  constructor() { }

  tabData = [
    {
       name: "Toolkits",
       filter: ["innerTab1", "innerTab2", "innerTab3"],
       link: 'toolkits'
      },
    {
       name: "FAQs",
       link: 'faqs' ,
    },
    {
      name: "Best Practices",
      filter: ["innerTab7", "innerTab8", "innerTab9"],
      link: 'bestPractices'
     },
    {
      name: "E-Learning Modules",
     
      link: 'eLearning'
    },
    {
      name: "Municipal Laws",
      filter: ["innerTab10", "innerTab11", "innerTab12"],
      link: 'municipal-laws' //"earlier its link was set to'eLearning' but Abhay is changing"
    },
   
  ];



  ngOnInit(): void {
  }


}
