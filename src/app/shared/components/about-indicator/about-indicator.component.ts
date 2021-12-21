import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-about-indicator",
  templateUrl: "./about-indicator.component.html",
  styleUrls: ["./about-indicator.component.scss"],
})
export class AboutIndicatorComponent implements OnInit {
  constructor() {}
  panelOpenState = false;
  data = {
    headText:
      "Capital expenditure: Rs 1500 Cr | Capital Exp to Total Exp %: 15%",
    indicatorData: [
      { text: "fghjk6578", title: "que1", panelOpenState: false },
      { text: "fghjk6578", title: "que2", panelOpenState: false },
      { text: "fghjk6578", title: "que3", panelOpenState: false },
      { text: "fghjk6578", title: "que4", panelOpenState: false },
    ],
  };
  ngOnInit(): void {}
}
