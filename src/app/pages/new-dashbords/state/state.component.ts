import { Component, OnInit } from "@angular/core";
import { NewDashboardService } from "../new-dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-state",
  templateUrl: "./state.component.html",
  styleUrls: ["./state.component.scss"],
})
export class StateComponent implements OnInit {
  constructor(
    public newDashboardService: NewDashboardService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.queryParams.subscribe((param) => {
      this.stateId = param.stateId || "";
    });
  }
  frontPanelData = data;
  revenueData = [Revenue, Expense, Asset, Tax, Liability, Debt];
  stateId;
  ngOnInit(): void {
    this.newDashboardService
      .dashboardInformation(true, this.stateId, "state")
      .subscribe(
        (res: any) => {
          this.frontPanelData.dataIndicators.map((item) => {
            switch (item.key) {
              case "population":
                item.value =
                  Math.round(res.data[0].population / 1000000) + " M";
                if (item.value == "0 M")
                  item.value = Math.round(res.data[0].population / 1000) + " K";
                break;
              case "density":
                item.value = (res.data[0].density || 0) + "/ Sq km";
                break;
              case "area":
                item.value = (res.data[0].area || 0) + " Sq km";
                break;
              case "Municipal_Corporation":
                item.value = res.data[0].Municipal_Corporation || 0;
                break;
              case "Municipal_Council":
                item.value = res.data[0].Municipal_Council || 0;
                break;
              case "uas":
                item.value = res.data[0].uas || 0;
                break;
              case "Town_Panchayat":
                item.value = res.data[0].Town_Panchayat || 0;
                break;
              case "ulbs":
                item.value = res.data[0].ulbs || 0;
                break;
            }
            return item;
          });
          this.frontPanelData.name = res.data[0]._id.name + " Dashboard";
        },
        (error) => {
          console.error(error);
        }
      );
    this.newDashboardService
      .dashboardInformation(false, this.stateId, "state")
      .subscribe(
        (res: any) => {
          let obj = { Revenue, Expense, Asset, Tax, Liability, Debt };
          for (const key in obj) {
            const element = obj[key];
            element.number =
              Math.round(
                res.data.find((value) => value._id == key).amount / 10000000
              ) + " Cr";
          }
          this.revenueData = [
            obj.Revenue,
            obj.Expense,
            obj.Asset,
            obj.Tax,
            obj.Liability,
            obj.Debt,
          ];
        },
        (error) => {
          console.error(error);
        }
      );
  }
}

const data = {
  showMap: true,
  name: "Municipal Corporation of Greater Mumbai",
  desc: "This urban local body has been classified as a municipal corporation in the 4M+ population category",
  link: "dashboard/national",
  linkName: "National Dashboard",
  dataIndicators: [
    {
      value: "12. 1 M",
      title: "Population",
      key: "population",
    },
    { value: "4335 Sq km", title: "Urban Area", key: "rea" },
    { value: "2857/ Sq km", title: "Urban Population Density", key: "density" },
    {
      value: "227",
      title: "Municipal Corporations",
      key: "Municipal_Corporation",
    },
    {
      value: "227",
      title: "Municipal Council",
      key: "Municipal_Council",
    },
    {
      value: "227",
      title: "Urban Agglomorations",
      key: "uas",
    },
    {
      value: "227",
      title: "Town Panchayat",
      key: "Town_Panchayat",
    },
    {
      value: "227",
      title: "ULBs",
      key: "ulbs",
    },
  ],
  footer: `Data shown is from audited/provisional financial statements for FY 20-21
  and data was last updated on 21st August 2021`,
};
const Revenue = {
  type: 2,
  subTitle: "Total Revenue",
  svg: `../../../../assets/file.svg`,
  number: "567 Cr",
};
const Expense = {
  type: 2,
  subTitle: "Total Expenditure",
  svg: `../../../../assets/coinCuren.svg`,
  number: "567 Cr",
};
const Asset = {
  type: 2,
  subTitle: "Total Assets",
  svg: `../../../../assets/Group 15967.svg`,
  number: "567 Cr",
};
const Tax = {
  type: 2,
  subTitle: "Total Tax Revenue",
  svg: `../../../../assets/chart.svg`,
  number: "567 Cr",
};
const Liability = {
  type: 2,
  subTitle: "Total Liabilities",
  svg: `../../../../assets/stats.svg`,
  number: "567 Cr",
};
const Debt = {
  type: 2,
  subTitle: "Total Grant",
  svg: `../../../../assets/folder.svg`,
  number: "567 Cr",
};
