import { Component, OnInit } from "@angular/core";
import { NewDashboardService } from "../new-dashboard.service";

@Component({
  selector: "app-national",
  templateUrl: "./national.component.html",
  styleUrls: ["./national.component.scss"],
})
export class NationalComponent implements OnInit {
  constructor(
    public newDashboardService: NewDashboardService
    ) {
      this.loadData();
    }
  frontPanelData = data;
  revenueData = [Revenue, Expense, Asset, Tax, Liability, Debt];
  tabAboutData;


  ngOnInit(): void {
  }

loadData(){
  this.newDashboardService
  .getDashboardTabData("619cc10e6abe7f5b80e45c6d")
  .subscribe(
    (res) => {
      console.log(res, "dashboardTabData");
      let tab = res["data"];
      this.sortTabData(tab);
    },
    (error) => {
      console.log(error);
    }
  );

let id = "5dd24729437ba31f7eb42eac";
this.newDashboardService.dashboardInformation(true, id, "ulb", "").subscribe(
  (res: any) => {},
  (error) => {
    console.error(error);
  }
);
this.newDashboardService.dashboardInformation(false, id, "ulb","").subscribe(
  (res) => {},
  (error) => {
    console.error(error);
  }
);
}
sortTabData(res){
  console.log(res)
  this.tabAboutData = res.sort(function (x, y) {
    return x.position - y.position;
});
}
}

const data = {
  showMap: false,
  name: "National Financial Dashboard",
  desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor",
  dataIndicators: [
    {
      value: "12. 1 M",
      title: "ULBs With Financial Data",
      key: "population",
    },
    {
      value: "227",
      title: "Financial Statements (2015-16 to 17-18)",
      key: "Municipal_Corporation",
    },
    {
      value: "227",
      title: "ULBs Credit Rating Reports",
      key: "Municipal_Council",
    },
    {
      value: "227",
      title: "ULBs With Investment Grade Rating",
      key: "uas",
    },
    {
      value: "227",
      title: "ULBs With Rating A & Above",
      key: "Town_Panchayat",
    },
    {
      value: "227",
      title: "Municipal Bond Issuances Of Rs. 5,459 Cr With Details",
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
