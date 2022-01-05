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

  scatterData = {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Line one",
          data: [
            { x: 0, y: 12 },
            { x: 50, y: 12 },
          ],
          showLine: true,
          fill: false,
          borderColor: "rgba(0, 200, 0, 1)",
        },
        {
          label: "Line Two",
          data: [
            { x: 0, y: 8 },
            { x: 50, y: 8 },
          ],
          showLine: true,
          fill: false,
          borderColor: "red",
        },
        {
          label: "Muncipality",
          data: [
            { x: 12, y: 12 },
            { x: 12, y: 4 },
            { x: 4, y: 6 },
            { x: 6, y: 9 },
            {
              x: 50,
              y: 20,
            },
            {
              x: 10,
              y: 10,
            },
          ],
          showLine: false,
          fill: true,
          borderColor: "#1EBFC6",
          backgroundColor: "#1EBFC6",
        },
        {
          label: "Muncipal Corporation",
          data: [
            { x: 9, y: 12 },
            { x: 8, y: 4 },
            { x: 24, y: 6 },
            { x: 8, y: 9 },
            {
              x: 30,
              y: 20,
            },
            {
              x: 15,
              y: 10,
            },
          ],
          showLine: false,
          fill: true,
          borderColor: "#3E5DB1",
          backgroundColor: "#3E5DB1",
        },
        {
          label: "Town Panchayat",
          data: [
            { x: 21, y: 12 },
            { x: 10, y: 4 },
            { x: 18, y: 6 },
            { x: 16, y: 9 },
            {
              x: 30,
              y: 20,
            },
            {
              x: 15,
              y: 10,
            },
          ],
          showLine: false,
          fill: true,
          borderColor: "#F5B742",
          backgroundColor: "#F5B742",
        },
      ],
    },
  };
  btnSelected = false;
  aboutIndicators;
  ngOnInit(): void {
    console.log("data in app-filter", this.data);
    this.data = this.data["mainContent"][0];
    this.aboutIndicators = this.data["static"].indicators;
  }

  expand = false;
  @Input()
  data = {
    about: "",
    btnLabels: [],
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
