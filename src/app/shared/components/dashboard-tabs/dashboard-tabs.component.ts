import { Component, OnInit, Input } from "@angular/core";
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: "app-dashboard-tabs",
  templateUrl: "./dashboard-tabs.component.html",
  styleUrls: ["./dashboard-tabs.component.scss"],
})
export class DashboardTabsComponent implements OnInit {
  constructor() {}

  @Input()
  data = [
    { name: "tab1", filter: ["innerTab1", "innerTab2", "innerTab3"] },
    { name: "tab2", filter: ["Balance sheet", "innerTab5", "innerTab6"] },
    { name: "tab3", filter: ["innerTab7", "innerTab8", "innerTab9"] },
    { name: "tab4", filter: ["innerTab10", "innerTab11", "innerTab12"] },
  ];

  activeFilter = [];
  innerActiveTab = "";

  changeTab(event, fromInner = false) {
    let value = JSON.parse(event.target.value);
    console.log("value.filter", value.filter);
    if (fromInner) this.innerActiveTab = value;
    else {
      this.activeFilter = value.filter;
      this.innerActiveTab = value.filter[0];
    }
  }
  ngOnInit(): void {}
}
