import { Component, OnInit } from "@angular/core";
import { ResourcesDashboardService } from "../../resources-dashboard.service";

@Component({
  selector: "app-e-learning-module",
  templateUrl: "./e-learning-module.component.html",
  styleUrls: ["./e-learning-module.component.scss"],
})
export class ELearningModuleComponent implements OnInit {
  constructor(protected resourcedashboard: ResourcesDashboardService) {}
  tableau: any;
  viz: any;
  ngOnInit(): void {
    var placeholderDiv = document.getElementById("vizContainer");
    var obj = document.getElementById("obj");

    this.viz = new this.tableau.Viz(
      placeholderDiv,
      "https%3A%2F%2Fprod-apnortheast-a.online.tableau.com%2F",
      obj
    );
  }
  cardData = [
    {
      label: "Digitization of Properties Register",
      imgUrl:
        "../../../../../assets/new_dashBord_ftr_hdr/shutterstock_546307051/shutterstock_546307051.png",
      code: "first",
    },
    
    {
      label: "Valuation of Properties",
      imgUrl:
        "../../../../../assets/new_dashBord_ftr_hdr/Group 15744/Group 15744.png",
      code: "third",
    },
    {
      label: "Motivating Revenue Officials",
      imgUrl:
        "../../../../../assets/new_dashBord_ftr_hdr/Group 15745/Group 15745.png",
      code: "second",
    },
  ];
  showIframe = false;
  showTableau = false;
  openScorePer(item) {
    console.log("new item",{item})
    this.resourcedashboard.setShowCardValue(item);

    this.resourcedashboard.showCard.subscribe((res) => {
      console.log("gggg", res);
      // if (res) {
      this.showIframe = false;
      this.showTableau = false;
      // }
    });
    this.showIframe = false;
    this.showTableau = false;
    if (item.code == "first") {
      this.showTableau = true;
    } else if (item.code == "second") {
      this.showIframe = true;
    }

    console.log(item.label);
  }
}
