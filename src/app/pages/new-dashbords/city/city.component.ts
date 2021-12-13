import { Component, OnInit } from "@angular/core";
import { NewDashboardService } from "../new-dashboard.service";
@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.scss"],
})
export class CityComponent implements OnInit {
  constructor(public newDashboardService: NewDashboardService) {}
  frontPanelData = data;
  revenueData = [Revenue, Expense, Asset, Tax, Liability, Debt];
  ngOnInit(): void {
    let id = "5dd24729437ba31f7eb42eac";
    this.newDashboardService.dashboardInformation(true, id, "ulb").subscribe(
      (res: any) => {
        this.frontPanelData.area = res.data.area + " Sq km";
        this.frontPanelData.population =
          Math.round(res.data.population / 1000000) + " M";
        if (this.frontPanelData.population)
          this.frontPanelData.population =
            Math.round(res.data.population / 1000) + " K";
        this.frontPanelData.populationDensity = res.data.density + "/ Sq km";
        this.frontPanelData.ward = res.data.wards;
        this.frontPanelData.name = res.data.name;
        this.frontPanelData.desc = createDesc(
          res.data?.ulbType?.name || "Municipal Corp"
        );
        this.frontPanelData.linkName = `${res.data.state.name} Dashboard`;
        this.frontPanelData.link = `dashboard/state?stateId=${res.data.state._id}`;
      },
      (error) => {
        console.error(error);
      }
    );
    this.newDashboardService.dashboardInformation(false, id, "ulb").subscribe(
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
  population: "12. 1 M",
  area: "4335 Sq km",
  populationDensity: "2857/ Sq km",
  ward: "227",
  finance: "18",
  link: "",
  linkName: "Maharashtra Dashboard",
  footer: `Data shown is from audited/provisional financial statements for FY 20-21
  and data was last updated on 21st August 2021`,
};

const Revenue = {
  type: 2,
  subTitle: "Total Revenue",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
const Expense = {
  type: 2,
  subTitle: "Total Expenditure",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
const Asset = {
  type: 2,
  subTitle: "Total Assets",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
const Tax = {
  type: 2,
  subTitle: "Total Tax Revenue",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
const Liability = {
  type: 2,
  subTitle: "Total Liabilities",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
const Debt = {
  type: 2,
  subTitle: "Total Grant",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
function createDesc(type, population = "4M+") {
  return `This urban local body has been classified as a ${type} in the ${population} population category`;
}
