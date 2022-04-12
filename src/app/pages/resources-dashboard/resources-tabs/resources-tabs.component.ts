import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ResourcesServicesService } from "../resDashboard-services/resources-services.service";
import { ResourcesDashboardService } from "../resources-dashboard.service";

@Component({
  selector: "app-resources-tabs",
  templateUrl: "./resources-tabs.component.html",
  styleUrls: ["./resources-tabs.component.scss"],
})
export class ResourcesTabsComponent implements OnInit {
  constructor(
    protected resourcedashboard: ResourcesDashboardService,
    public router : Router,
    private resources_services: ResourcesServicesService,) {}

  @Input()
  data = [];

  subscribeValue(item) {
    console.log('subscribe item,..', item);

    this.resourcedashboard.getShowCardValue(),
    this.resourcedashboard.setShowCardValue(true);
    if(item?.name == "Toolkits"){
      this.resources_services.tooltikCardShow.next(true);
    }

   // this.router.navigateByUrl('resources-dashboard/learning-center/toolkits')

  }

  ngOnInit(): void {
    console.log("=======jjj>", this.data);
  }
}
