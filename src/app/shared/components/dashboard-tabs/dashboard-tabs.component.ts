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
  constructor() { }

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
                    name: "About this indicator",
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
  cityName = '';
  stateServiceLabel: boolean = false;

  activeHeader = "";
  activeFilter = [];
  innerActiveTab: any = "";
  sticky = false;
  tabDesc = ''
  // stateMap = json.parse(localStorage.getItem(stateIdsMap))
  stateMap = JSON.parse(localStorage.getItem("stateIdsMap"));
  @Input() isUA:String = 'No';
  @Input() noDataFound:boolean = false;
  changeTab(event, fromInner = false) {
    console.log('changeTab', event, fromInner)
    let value = event?.target?.value ? JSON.parse(event.target.value) : event;
    console.log("value ==>", value);
    this.cityName = value?.ulbName
    if (fromInner) this.innerActiveTab = value;
    else {
      this.activeHeader = value.name;
      this.activeFilter = value.subHeaders;
      this.innerActiveTab = value.subHeaders[0];
    }
  }

  onChangeTab({ tabName, subTabName }) { // changing tab and subtab -- dirty fix due to no routing setup
    document.getElementById(tabName).click();
    setTimeout(() => { document.getElementById(subTabName).click(); }, 1000);
  }

  getStickyValue() {
    if (this.stateId) {
      if (this.scrollCords > 1100) {
        this.sticky = true;
      } else {
        this.sticky = false;
      }
    }
    if (this.cityId) {
      if (this.scrollCords > 870) {
        this.sticky = true;
      } else {
        this.sticky = false;
      }
    }
  }

  getStateName() {
    console.log('getStateName', this.stateId)
    this.stateName = this.stateMap[this.stateId];
    return this.stateName;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("DashBoardTabs OnChanges", changes, 'DashBoardType', this.DashBoardType)
    if (changes.stateId) {
      this.stateId = changes?.stateId?.currentValue;
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
    //  console.log('tab data....', this.data)
    let mouTabObj: any = this.data.filter(o => o.name == "Infrastructure Projects");
    this.tabDesc = mouTabObj[0]?.description
    //   console.log('this.tabDesc', this.tabDesc);

    // console.log("stickyValue==>", this.sticky);
  }

  ngOnInit(): void {
    console.log("innertab value", this.innerActiveTab);
    console.log("this.percentValue", this.percentValue);
    console.log("DashBoardType", this.DashBoardType)
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


// var startProductBarPos=-1;
// window.onscroll=function(){
//   var bar = document.getElementById('nav');
//   if(startProductBarPos<0)startProductBarPos=findPosY(bar);

//   if(pageYOffset>startProductBarPos){
//     bar.style.position='fixed';
//     bar.style.top='0';
//     bar.style.left='0';
//     bar.style.backgroundColor='#fff';
//   }else{
//     bar.style.position='relative';
//   }

// };

// function findPosY(obj) {
//   var curtop = 0;
//   if (typeof (obj.offsetParent) != 'undefined' && obj.offsetParent) {
//     while (obj.offsetParent) {
//       curtop += obj.offsetTop;
//       obj = obj.offsetParent;
//     }
//     curtop += obj.offsetTop;
//   }
//   else if (obj.y)
//     curtop += obj.y;
//   return curtop;
// }
