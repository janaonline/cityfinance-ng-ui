import { HttpClient } from "@angular/common/http";
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  HostListener,
} from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { BorrowingTabService } from "./borrowing-tab.service";

@Component({
  selector: "app-dashboard-tabs",
  templateUrl: "./dashboard-tabs.component.html",
  styleUrls: ["./dashboard-tabs.component.scss"],
})
export class DashboardTabsComponent implements OnInit, OnChanges {
  constructor(private borrowingTabService: BorrowingTabService) {}

  tableView = true;
  TableTitles: any;
  HeaderDataOfBorrowTab() {
    this.borrowingTabService.getHeaderName().subscribe((res: any) => {
      console.log("HeaderName", res?.detailsOfInstrument);
      this.TableTitles = res.detailsOfInstrument;
      // console.log("firstTitle", this.firstTitle);
    });
  }
  ColumnDataOfBorrowTab() {
    this.borrowingTabService.getColumnData().subscribe((res: any) => {
      console.log("ColumnData", res?.data);
    });
  }
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.scrollCords > 1082) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
    if (changes.mySelectedYears && changes.mySelectedYears.currentValue) {
      this.mySelectedYears = convertToPastYears(
        changes.mySelectedYears.currentValue
      );
    }
    this.changeTab(this?.data[0]);
    this.HeaderDataOfBorrowTab();
    // this.ColumnDataOfBorrowTab();
    console.log("innertab value", this.innerActiveTab);
  }

  doSomething(event) {
    if (window.pageYOffset > 354) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  ngOnInit(): void {
    console.log("innertab value", this.innerActiveTab);
    console.log("this.percentValue", this.percentValue);
  }
}
// function getHeaderName(): any {
//   throw new Error("Function not implemented.");
// }
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
