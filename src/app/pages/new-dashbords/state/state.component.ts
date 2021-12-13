import { Component, OnInit } from "@angular/core";
import { NewDashboardService } from "../new-dashboard.service";

@Component({
  selector: "app-state",
  templateUrl: "./state.component.html",
  styleUrls: ["./state.component.scss"],
})
export class StateComponent implements OnInit {
  constructor(public newDashboardService: NewDashboardService) {}
  frontPanelData = data;
  revenueData = [Revenue, Expense, Asset, Tax, Liability, Debt];

  ngOnInit(): void {
    let id = "5dcf9d7216a06aed41c748dc";
    this.newDashboardService.dashboardInformation(true, id, "state").subscribe(
      (res: any) => {
        this.frontPanelData.area = res.data[0].area;
        this.frontPanelData.population = res.data[0].population;
        this.frontPanelData.populationDensity = res.data[0].density ?? 0;
        this.frontPanelData.ward = res.data[0].wards;
      },
      (error) => {
        console.error(error);
      }
    );
    this.newDashboardService.dashboardInformation(false, id, "state").subscribe(
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
  title: "revenue",
  subTitle: "revenue",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
const Expense = {
  type: 2,
  title: "expenditure",
  subTitle: "expenditure",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
const Asset = {
  type: 2,
  title: "assets",
  subTitle: "assets",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
const Tax = {
  type: 2,
  title: "tax_revenue",
  subTitle: "tax_revenue",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
const Liability = {
  type: 2,
  title: "liabilities",
  subTitle: "liabilities",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
const Debt = {
  type: 2,
  title: "grant",
  subTitle: "grant",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
