import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: "app-dashboard-tabs",
  templateUrl: "./dashboard-tabs.component.html",
  styleUrls: ["./dashboard-tabs.component.scss"],
})
export class DashboardTabsComponent implements OnInit, OnChanges {
  constructor() {}

  @Input()
  cityId;
  @Input()
  DashBoardType;

  @Input()
  data = [
    {
      name: "Financial Indicators",
      subHeaders: [
        {
          mainContent: [
            {
              static: {
                indicators: [
                  {
                    desc: [
                      {
                        links: [
                          {
                            label: "",
                            url: "",
                          },
                        ],
                        text: "Expenditure mix refers to the combination of establishment, administrative, interest & finance expenses, etc., all of which constitute the total expenditure of the ULB",
                      },
                    ],
                    name: "About This indicator",
                  },
                  {
                    desc: [
                      {
                        links: [
                          {
                            label: "",
                            url: "",
                          },
                        ],
                        text: "Establishment expense",
                      },
                      {
                        links: [
                          {
                            label: "",
                            url: "",
                          },
                        ],
                        text: "Administrative Expense",
                      },
                      {
                        links: [
                          {
                            label: "",
                            url: "",
                          },
                        ],
                        text: "Operational & Maint. Expense",
                      },
                      {
                        links: [
                          {
                            label: "",
                            url: "",
                          },
                        ],
                        text: "Interest & Finance Expense",
                      },
                      {
                        links: [
                          {
                            label: "",
                            url: "",
                          },
                        ],
                        text: "Revenue Grants",
                      },
                      {
                        links: [
                          {
                            label: "",
                            url: "",
                          },
                        ],
                        text: "Other Expenses",
                      },
                    ],
                    name: "Calculation",
                  },
                  {
                    desc: [
                      {
                        links: [
                          {
                            label: "",
                            url: "",
                          },
                        ],
                        text: "",
                      },
                    ],
                    name: "How is performance assessed?",
                  },
                  {
                    desc: [
                      {
                        links: [
                          {
                            label: "",
                            url: "",
                          },
                        ],
                        text: "",
                      },
                    ],
                    name: "Analysis",
                  },
                  {
                    desc: [
                      {
                        links: [
                          {
                            label: "",
                            url: "",
                          },
                        ],
                        text: "",
                      },
                    ],
                    name: "Next Steps",
                  },
                ],
              },
              btnLabels: [],
              about:
                "Expenditure mix refers to the combination of establishment, administrative, interest & finance expenses, etc., all of which constitute the total expenditure of the ULB",
              aggregateInfo:
                "Total revenue: 2000 Cr CAGR trend of 8% for last 3 years",
            },
          ],
          name: "Revenue Expenditure Mix",
        },
      ],
    },
  ];

  activeHeader = "";
  activeFilter = [];
  innerActiveTab: any = "";

  changeTab(event, fromInner = false) {
    let value = event?.target?.value ? JSON.parse(event.target.value) : event;
    console.log("value ==>", value);

    if (fromInner) this.innerActiveTab = value;
    else {
      this.activeHeader = value.name;
      this.activeFilter = value.subHeaders;
      this.innerActiveTab = value.subHeaders[0];
    }
    console.log("innertab value", this.innerActiveTab);
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.changeTab(this.data[0]);
  }
}
