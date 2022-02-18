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
       name: "Blog",
       filter: ["innerTab4", "innerTab5", "innerTab6"],
       link: 'blog' ,
    },
    {
      name: "Best Practices",
      filter: ["innerTab7", "innerTab8", "innerTab9"],
      link: 'bestPractices'
     },
    {
      name: "E-Learning Modules",
      filter: ["innerTab10", "innerTab11", "innerTab12"],
      link: 'eLearning'
    },
    {
      name: "Municipal Laws",
      filter: ["innerTab10", "innerTab11", "innerTab12"],
      link: 'eLearning'
    },
   
  ];



  ngOnInit(): void {
  }


}
