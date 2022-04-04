import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ResourcesDashboardService } from "../resources-dashboard.service";

@Component({
  selector: "app-resources-tabs",
  templateUrl: "./resources-tabs.component.html",
  styleUrls: ["./resources-tabs.component.scss"],
})
export class ResourcesTabsComponent implements OnInit {
  constructor(protected resourcedashboard: ResourcesDashboardService) {}

  @Input()
  data = [];

  subscribeValue() {
    this.resourcedashboard.getShowCardValue(),
      this.resourcedashboard.setShowCardValue(true);
  }

  ngOnInit(): void {
    console.log("=======jjj>", this.data);
  }
}
