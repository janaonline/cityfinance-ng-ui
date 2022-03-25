import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  HostListener,
} from "@angular/core";

@Component({
  selector: "app-dashboard-tabs",
  templateUrl: "./dashboard-tabs.component.html",
  styleUrls: ["./dashboard-tabs.component.scss"],
})
export class DashboardTabsComponent implements OnInit, OnChanges {
  constructor() {}

  currentStateId;
  tableView = true;
  TableTitles: any;
  stateName: any;

  @Input()
  yearListForDropDown;
  @Input()
  mySelectedYears;
  @Input()
  cityId;
  @Input()
  DashBoardType;

  @Input()
  scrollCords;
  @Input()
  percentValue;

  @Input()
  stateId;

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
  sticky = false;
  // stateMap = json.parse(localStorage.getItem(stateIdsMap))
  stateMap = JSON.parse(localStorage.getItem("stateIdsMap"));
  changeTab(event, fromInner = false) {
    let value = event?.target?.value ? JSON.parse(event.target.value) : event;
    console.log("value ==>", value);

    if (fromInner) this.innerActiveTab = value;
    else {
      this.activeHeader = value.name;
      this.activeFilter = value.subHeaders;
      this.innerActiveTab = value.subHeaders[0];
    }
  }

  getStickyValue() {
    if (this.scrollCords > 1150) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  getStateName() {
    // debugger;
    this.stateName = this.stateMap[this.stateId];
    return this.stateName;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.stateId) {
      this.getStateName();
    }
    if (changes.mySelectedYears && changes.mySelectedYears.currentValue) {
      this.mySelectedYears = convertToPastYears(
        changes?.mySelectedYears?.currentValue
      );
    }
    if (changes.data) {
      this.changeTab(this?.data[0]);
    }
    if (changes.scrollCords) {
      this.getStickyValue();
    }

    console.log("stickyValue==>", this.sticky);
  }

  ngOnInit(): void {
    console.log("innertab value", this.innerActiveTab);
    console.log("this.percentValue", this.percentValue);
  }
}
function convertToPastYears(year) {
  let newYears = [year],
    numYear = 2,
    newValue = year;
  while (numYear--) {
    newValue = newValue
      .split("-")
      .map((value) =>
        !isNaN(Number(value)) ? (value = Number(value) - 1) : value
      )
      .join("-");
    newYears.push(newValue);
  }
  return newYears;
}
