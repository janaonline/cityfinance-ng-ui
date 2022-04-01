import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-learning-center",
  templateUrl: "./learning-center.component.html",
  styleUrls: ["./learning-center.component.scss"],
})
export class LearningCenterComponent implements OnInit {
  constructor(private router: Router) {}

  tabData = [
    {
      name: "Toolkits",
      filter: ["innerTab1", "innerTab2", "innerTab3"],
      link: "toolkits",
    },

    {
      name: "Best Practices",
      filter: ["innerTab7", "innerTab8", "innerTab9"],
      link: "bestPractices",
    },
    {
      name: "E-Learning Modules",

      link: "eLearning",
    },
    {
      name: "Municipal Laws",
      filter: ["innerTab10", "innerTab11", "innerTab12"],
      link: "municipal-laws", //"earlier its link was set to'eLearning' but Abhay is changing"
    },
    {
      name: "Glossary",
      link: "faqs",
    },
  ];

  currentUrl;
  getSubTabs(data) {
    // debugger;
    data.map((elem) => {
      if (this.currentUrl.includes(elem.link)) {
        // return this.currentUrl;
        this.router.navigate(this.currentUrl);
      }
    });
  }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
  }
}
