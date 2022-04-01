import { Component, HostListener, OnInit } from "@angular/core";
import { NewDashboardService } from "../new-dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CityService } from "./city.service";
import { AuthService } from "../../../auth/auth.service";

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.scss"],
})
export class CityComponent implements OnInit {
  constructor(
    public newDashboardService: NewDashboardService,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private cityService: CityService,
    private authService: AuthService
  ) {
    this._activatedRoute.queryParams.subscribe((param) => {
      this.cityId = param.cityId;
      this.stateCode = param.stateCode || this.ulbStateCodeMapping[this.cityId];
      this.mapData.code.city = this.ulbCodeMapping[this.cityId];
      this.mapData.code.state = this.ulbStateCodeMapping[this.cityId];
    });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ulbStateCodeMapping = JSON.parse(localStorage.getItem("ulbStateCodeMapping"));
  ulbCodeMapping = JSON.parse(localStorage.getItem("ulbCodeMapping"));
  cityId;
  stateCode;
  frontPanelData = data;
  revenueData = [Revenue, Expense,Tax, Liability,  Asset , Debt];
  mapData = mapConfig;
  stateUlbData = JSON.parse(localStorage.getItem("ulbList"));
  dashboardTabData;
  currentYear;
  yearListForDropDown;

  cords: any;

  @HostListener("window:scroll", ["$event"])
  doSomething(event) {
    this.cords = window.pageYOffset;
  }
  ngOnInit(): void {
    this.dashboardDataCall();
    this.dashboardCalls(this.cityId);
  }
  dashboardDataCall() {
    this.newDashboardService
      .getDashboardTabData("619cc08a6abe7f5b80e45c67")
      .subscribe(
        (res) => {
          console.log(res, "dashboardTabData");
          this.dashboardTabData = res["data"];
        },
        (error) => {
          console.log(error);
        }
      );
    this.authService.getLastUpdated().subscribe((res) => {
      Object.assign(this.frontPanelData, {
        year: res["year"],
        date: res["data"],
      });
    });
  }

  dashboardCalls(cityId) {
    this.newDashboardService.getLatestDataYear(cityId).subscribe(
      (res) => {
        this.currentYear = res["data"].financialYear;
        let tempData: any = this.frontPanelData.footer.split(" ");
        tempData = tempData.map((value) => {
          if (value == "finacialYear")
            value = "FY " + res["data"].financialYear;
          if (value == "date")
            value = new Date(res["data"].modifiedAt).toLocaleDateString();
          return value;
        });
        tempData = tempData.join(" ");
        this.frontPanelData.footer = tempData;
      },
      (error) => {
        console.log(error);
      }
    );
    this.newDashboardService.getYearList(this.cityId).subscribe(
      (res) => {
        this.yearListForDropDown = res["data"];
      },
      (error) => {
        console.log(error);
      }
    );
    this.newDashboardService
      .dashboardInformation(true, cityId, "ulb", "")
      .subscribe(
        (res: any) => {
          this.frontPanelData.dataIndicators.map((item) => {
            switch (item.key) {
              case "population":
                item.value =
                  Math.round(res.data.population / 1000000) + " Million";
                if (item.value == "0 Million")
                  item.value =
                    Math.round(res.data.population / 1000) + " Thousand";
                break;
              case "density":
                item.value = res.data.density + "/ Sq km";
                break;
              case "ward":
                item.value = res.data.wards;
                break;
              case "area":
                item.value = res.data.area + " Sq km";
                break;
              case "amrut":
                item.value = res.data.amrut;
                break;
              case "isUa":
                item.value = res.data.isUA;
                if (res.data.isUA == "Yes") {
                  item.value += ` (${res.data.UA.name.split(" ")[0]})`;
                }
                break;
              case "dataAvailable":
                item.value = res.data.dataAvailable;
                break;
            }
            return item;
          });
          this.frontPanelData.name = res.data.name;
          this.frontPanelData.desc = createDesc(
            res.data?.ulbType?.name || "Municipal Corp",
            getPopulationType(res.data.population)
          );
          this.frontPanelData.linkName = `${res.data.state.name} Dashboard`;
          this.frontPanelData.link = `dashboard/state?stateId=${res.data.state._id}`;
        },
        (error) => {
          console.error(error);
        }
      );
    this.newDashboardService
      .dashboardInformation(false, cityId, "ulb", " ")
      .subscribe(
        (res: any) => {
          let obj = { Revenue, Expense, Tax, Liability , Asset, Debt };
          for (const key in obj) {
            const element = obj[key];
            if (key == "Debt") {
              element.number =
                "INR " +
                Math.round(
                  res.data.find((value) => value._id == "Revenue")?.totalGrant /
                    10000000
                ) +
                "Cr";
            } else
              element.number =
                "INR " +
                (res.data.length > 0
                  ? Math.round(
                      res.data.find((value) => value._id == key)?.amount /
                        10000000
                    )
                  : "0") +
                " Cr";
          }
          this.revenueData = [
            obj.Revenue,
            obj.Expense,
            obj.Tax,
            obj.Liability,
            obj.Asset,
           obj.Debt,
          ];
        },
        (error) => {
          console.error(error);
        }
      );
  }

  changeInDropDown(event) {
    if (!event.fromState) {
      this.cityId = this.stateUlbData.data[this.stateCode].ulbs.find(
        (value) => value.code === event.value.key
      )._id;
      this.dashboardDataCall();
      this.dashboardCalls(this.cityId);
    }
    console.log("this.cityId", this.cityId);
  }
}

const data = {
  showMap: true,
  name: "Municipal Corporation of Greater Mumbai",
  desc: "This urban local body has been classified as a municipal corporation in the 4M+ population category",
  link: "",
  linkName: "Maharashtra Dashboard",
  dataIndicators: [
    {
      value: "12. 1 M",
      title: "Population",
      key: "population",
    },
    { value: "4335 Sq km", title: "Area", key: "area" },
    { value: "2857/ Sq km", title: "Population Density", key: "density" },
    {
      value: "227",
      title: "Wards",
      key: "ward",
    },
    {
      value: "227",
      title: "Years of financial stat",
      key: "dataAvailable",
    },
    // {
    //   value: "227",
    //   title: "AMRUT City",
    //   key: "amrut",
    // },
    {
      value: "227",
      title: "Part of UA",
      key: "isUa",
    },
  ],
  footer: `Data shown is from audited/provisional financial statements for finacialYear and data was last updated on date`,
};

const Revenue = {
  type: 2,
  subTitle: "Total Revenue",
  svg: `../../../../assets/file.svg`,
  number: "567 Cr",
};
const Expense = {
  type: 2,
  subTitle: "Total Expenditure",
  svg: `../../../../assets/coinCuren.svg`,
  number: "567 Cr",
};
const Asset = {
  type: 2,
  subTitle: "Total Assets",
  svg: `../../../../assets/Group 15967.svg`,
  number: "567 Cr",
};
const Tax = {
  type: 2,
  subTitle: "Total Tax Revenue",
  svg: `../../../../assets/chart.svg`,
  number: "567 Cr",
};
const Liability = {
  type: 2,
  subTitle: "Total Grant",
  svg: `../../../../assets/stats.svg`,
  number: "567 Cr",
};
const Debt = {
  type: 2,
  subTitle: "Total Debt",
  svg: `../../../../assets/folder.svg`,
  number: "567 Cr",
};
function createDesc(type, population = "4M+") {
  return `This urban local body has been classified as a ${type} in the ${population} population category`;
}

function getPopulationType(population) {
  if (population < 100000) {
    return "<100 Thousand";
  } else if (100000 < population && population < 500000) {
    return "100 Thousand - 500 Thousand";
  } else if (500000 < population && population < 1000000) {
    return "500 Thousand - 1 Million";
  } else if (1000000 < population && population < 4000000) {
    return "1 Million - 4 Million";
  } else {
    return "4 Million+";
  }
}

const mapConfig = {
  code: {
    state: "GJ",
    city: "GJ039",
  },
  showStateList: false,
  showDistrictList: true,
  stateMapContainerHeight: "23rem",
  nationalZoomOnMobile: 3.9, // will fit map in container
  nationalZoomOnWeb: 3.9, // will fit map in container
  stateZoomOnMobile: 4, // will fit map in container
  stateZoomOnWeb: 4, // will fit map in container
  stateBlockHeight: "23.5rem", // will fit map in container
};
