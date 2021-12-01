import { Component, OnInit, Input, HostListener } from "@angular/core";

@Component({
  selector: "app-front-panel",
  templateUrl: "./front-panel.component.html",
  styleUrls: ["./front-panel.component.scss"],
})
export class FrontPanelComponent implements OnInit {
  @Input()
  data = {
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
  innerWidth;
  textInnerWidth;

  cardStyle = cardStyle;
  cardData = [revenue, expenditure, assets, liabilities, tax_revenue, grants];

  constructor() {
    this.cardResize();
  }

  ngOnInit(): void {}

  cardResize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 580 && this.innerWidth > 400) {
      this.innerWidth = window.innerWidth / 2.2;
      this.innerWidth = `${this.innerWidth}px`;
    } else if (this.innerWidth < 400) {
      this.innerWidth = window.innerWidth / 2.3;
      this.innerWidth = `${this.innerWidth}px`;
    }
  }

  textResize() {
    this.textInnerWidth = window.innerWidth;
    if (this.textInnerWidth < 580 && this.textInnerWidth > 400) {
      this.textInnerWidth = window.innerWidth / 2.2;
      this.textInnerWidth = `${this.textInnerWidth}px`;
    } else if (this.textInnerWidth < 400) {
      this.textInnerWidth = window.innerWidth / 2.3;
      this.textInnerWidth = `${this.textInnerWidth}px`;
    }
  }
}

const revenue = {
  type: 2,
  title: "revenue",
  subTitle: "revenue",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  img: "",
  para: "",
  actionButtons: [
    {
      name: "btn1",
      function: "",
    },
    {
      name: "btn2",
      function: "",
    },
  ],
  number: 230,
  amount: "567 Cr",
  projectId: 123,
  text: "",
  id: 1,
};
const expenditure = {
  type: 2,
  title: "expenditure",
  subTitle: "expenditure",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  img: "",
  para: "",
  actionButtons: [
    {
      name: "btn1",
      function: "",
    },
    {
      name: "btn2",
      function: "",
    },
  ],
  number: 230,
  amount: "567 Cr",
  projectId: 123,
  text: "",
  id: 1,
};
const assets = {
  type: 2,
  title: "assets",
  subTitle: "assets",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  img: "",
  para: "",
  actionButtons: [
    {
      name: "btn1",
      function: "",
    },
    {
      name: "btn2",
      function: "",
    },
  ],
  number: 230,
  amount: "567 Cr",
  projectId: 123,
  text: "",
  id: 1,
};
const tax_revenue = {
  type: 2,
  title: "tax_revenue",
  subTitle: "tax_revenue",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  img: "",
  para: "",
  actionButtons: [
    {
      name: "btn1",
      function: "",
    },
    {
      name: "btn2",
      function: "",
    },
  ],
  number: 230,
  amount: "567 Cr",
  projectId: 123,
  text: "",
  id: 1,
};
const liabilities = {
  type: 2,
  title: "liabilities",
  subTitle: "liabilities",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  img: "",
  para: "",
  actionButtons: [
    {
      name: "btn1",
      function: "",
    },
    {
      name: "btn2",
      function: "",
    },
  ],
  number: 230,
  amount: "567 Cr",
  projectId: 123,
  text: "",
  id: 1,
};
const grants = {
  type: 2,
  title: "grant",
  subTitle: "grant",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  img: "",
  para: "",
  actionButtons: [
    {
      name: "btn1",
      function: "",
    },
    {
      name: "btn2",
      function: "",
    },
  ],
  number: 230,
  amount: "567 Cr",
  projectId: 123,
  text: "",
  id: 1,
};

const cardStyle = {
  width: "auto",
  borderRadius: "0.7500em",
  height: "auto",
};
