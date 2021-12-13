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
  ngOnInit(): void {
    let id = "5dd24729437ba31f7eb42eac";
    this.newDashboardService.dashboardInformation(true, id, "ulb").subscribe(
      (res: any) => {
        this.frontPanelData.area = res.data.area;
        this.frontPanelData.population = res.data.population;
        this.frontPanelData.populationDensity = res.data.density;
        this.frontPanelData.ward = res.data.wards;
      },
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
  showMap: false,
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

const revenue = {
  type: 2,
  title: "revenue",
  subTitle: "revenue",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
const expenditure = {
  type: 2,
  title: "expenditure",
  subTitle: "expenditure",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
const assets = {
  type: 2,
  title: "assets",
  subTitle: "assets",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
const tax_revenue = {
  type: 2,
  title: "tax_revenue",
  subTitle: "tax_revenue",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
const liabilities = {
  type: 2,
  title: "liabilities",
  subTitle: "liabilities",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
const grants = {
  type: 2,
  title: "grant",
  subTitle: "grant",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  number: "567 Cr",
};
