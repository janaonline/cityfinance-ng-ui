import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
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
      hasChart: false
    },
    {
      title: "States Covered",
      caption: "18 / 28",
      chartClass: "text-warning bg-warning",
      containerClass: "col-md-3",
      hasChart: true
    },
    {
      title: "No of ULBs",
      caption: "522",
      chartClass: "text-warning bg-warning",
      containerClass: "col-md-3",
      hasChart: true
    },

    {
      title: "Credit Rated ULBs",
      caption: "93",
      chartClass: "text-warning bg-warning",
      containerClass: "col-md-3",
      hasChart: true
    },
    {
      title: "",
      caption: "Municipal Finance Laws",
      chartClass: "text-primary bg-primary",
      containerClass: "col-md-3",
      hasChart: false
    },
    {
      title: "States",
      caption: "28",
      chartClass: "text-primary bg-primary",
      containerClass: "col-md-3",
      hasChart: true
    },
    {
      title: "ULB laws",
      caption: "108",
      chartClass: "text-primary bg-primary",
      containerClass: "col-md-3",
      hasChart: true
    },
    {
      title: "Criteria",
      caption: "71",
      chartClass: "text-primary bg-primary",
      containerClass: "col-md-3",
      hasChart: true
    },
    {
      title: "",
      caption: "Status",
      chartClass: "text-danger bg-danger",
      containerClass: "col-md-3",
      hasChart: false
    },
    {
      title: "Financial Statements",
      caption: "900",
      chartClass: "text-danger bg-danger",
      containerClass: "col-md-3",
      hasChart: true
    },
    {
      title: "Audit Status",
      caption: "100%",
      chartClass: "text-danger bg-danger",
      containerClass: "col-md-3",
      hasChart: true
    },
    {
      title: "Unaudited Status",
      caption: "0%",
      chartClass: "text-danger bg-danger",
      containerClass: "col-md-3",
      hasChart: true
    }
  ];

  constructor() {}

  ngOnInit() {}
}
