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
  data = {
    tabs: ["tab1", "tab2", "tab3", "tab4", "tab5", "tab6"],
    filter: ["innerTab1", "innerTab2", "innerTab3"],
  };

  activeTab = "";
  innerActiveTab = "";

  changeTab(event, fromInner = null) {
    if (fromInner) this.innerActiveTab = event.target.value;
    else {
      this.activeTab = event.target.value;
    }
  }
  ngOnInit(): void {}
}
