import { Component, OnInit } from "@angular/core";
import { NewDashboardService } from "../new-dashboard.service";

@Component({
  selector: "app-national",
  templateUrl: "./national.component.html",
  styleUrls: ["./national.component.scss"],
})
export class NationalComponent implements OnInit {
  constructor(public newDashboardService: NewDashboardService) {}
  frontPanelData = data;
  revenueData = [Revenue, Expense, Asset, Tax, Liability, Debt];
  ngOnInit(): void {
    let id = "5dd24729437ba31f7eb42eac";
    this.newDashboardService.dashboardInformation(true, id, "ulb").subscribe(
      (res: any) => {},
      (error) => {
        console.error(error);
      }
    );
    this.newDashboardService.dashboardInformation(false, id, "ulb").subscribe(
      (res) => {},
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
