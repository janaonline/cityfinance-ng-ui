import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-filter-data",
  templateUrl: "./filter-data.component.html",
  styleUrls: ["./filter-data.component.scss"],
})
export class FilterDataComponent implements OnInit, OnChanges {
  constructor() {}
  btnSelected = false;
  aboutIndicators;
  ngOnInit(): void {
    this.data = this.data["mainContent"][0];
    this.aboutIndicators = this.data["static"].indicators;
    console.log(this.data, "data in app-filter");
  }

  expand = false;
  @Input()
  data = {
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
  };
  lastSelectedId;
  changeActiveBtn(i) {
    let id = `btn-${i}`;
    if (this.lastSelectedId) {
      document.getElementById(this.lastSelectedId).classList.remove("selected");
      document.getElementById(this.lastSelectedId).classList.add("deSelected");
    }
    document.getElementById(id).classList.remove("deSelected");
    document.getElementById(id).classList.add("selected");
    this.lastSelectedId = id;
  }

  actionFromChart(value) {
    console.log(value, "in filter");
    if (value.name === "expand" || value.name === "collapse")
      this.expand = !this.expand;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.data.firstChange)
      this.data = changes.data.currentValue["mainContent"][0];
  }
}
