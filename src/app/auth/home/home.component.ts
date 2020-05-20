import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

interface Link {
  text: string;
  link?: string;
  hoverText?: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [
    {
      provide: CarouselConfig,
      useValue: {
        interval: 4000,
        noPause: true,
        showIndicators: true,
      },
    },
  ],
})
export class HomeComponent implements OnInit {
  isProduction = !(
    window.location.hostname.includes("demo") ||
    window.location.hostname.includes("staging") ||
    window.location.hostname.includes("localhost")
  );

  statistics = [
    {
      title: "",
      caption: "ULB Statistics",
      chartClass: "text-warning bg-warning",
      containerClass: "col-md-3",
      hasChart: false,
    },
    {
      title: "States Covered",
      caption: "18 / 28",
      chartClass: "text-warning bg-warning",
      containerClass: "col-md-3",
      hasChart: true,
    },
    {
      title: "No of ULBs",
      caption: "522",
      chartClass: "text-warning bg-warning",
      containerClass: "col-md-3",
      hasChart: true,
    },

    {
      title: "Credit Rated ULBs",
      caption: "93",
      chartClass: "text-warning bg-warning",
      containerClass: "col-md-3",
      hasChart: true,
    },
    {
      title: "",
      caption: "Municipal Finance Laws",
      chartClass: "text-primary bg-primary",
      containerClass: "col-md-3",
      hasChart: false,
    },
    {
      title: "States",
      caption: "28",
      chartClass: "text-primary bg-primary",
      containerClass: "col-md-3",
      hasChart: true,
    },
    {
      title: "ULB laws",
      caption: "108",
      chartClass: "text-primary bg-primary",
      containerClass: "col-md-3",
      hasChart: true,
    },
    {
      title: "Criteria",
      caption: "71",
      chartClass: "text-primary bg-primary",
      containerClass: "col-md-3",
      hasChart: true,
    },
    {
      title: "",
      caption: "Status",
      chartClass: "text-danger bg-danger",
      containerClass: "col-md-3",
      hasChart: false,
    },
    {
      title: "Financial Statements",
      caption: "900",
      chartClass: "text-danger bg-danger",
      containerClass: "col-md-3",
      hasChart: true,
    },
    {
      title: "Audit Status",
      caption: "100%",
      chartClass: "text-danger bg-danger",
      containerClass: "col-md-3",
      hasChart: true,
    },
    {
      title: "Unaudited Status",
      caption: "0%",
      chartClass: "text-danger bg-danger",
      containerClass: "col-md-3",
      hasChart: true,
    },
  ];

  importantLinks: Link[] = [
    {
      text: "Audited/Unaudited Annual Accounts of ULBs",
      link: "/dashboard/report/basic",
    },
    {
      text: "Municipal Bonds and Pooled Debt Obligations",
      link: "/credit-rating/municipal-bond",
    },
    {
      text: "Credit Rating of all ULBs to date",
      link: "/credit-rating/report",
    },
    {
      text: "Database of finance related provisions",
    },
    { text: "Fiscal Ranking of ULBs" },
    { text: "Service Level Benchmarks vs Actuals" },
    { text: "List of urban PPPs" },
    { text: "Annual Accounts of key parastatals" },
    { text: "List of urban projects, including tenders and schemes" },
    { text: "E-learning modules with certification for accounting staff" },
    { text: "Compilation of CAG/DLFA audit reports" },
    { text: "Budget Briefs for top 500 cities in India" },
    { text: "Urban budgets of State Governments" },
    { text: "Index on quality of input data" },
    { text: "Best practice compilation and discussion forums" },
    { text: "Model documents/How To kits for RFPs" },
    { text: "XBRL for input of data directly by ULBs/States" },
  ];

  constructor() {}

  ngOnInit() {}
}
