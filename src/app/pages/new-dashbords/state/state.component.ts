import { Component, OnInit } from "@angular/core";
import { NewDashboardService } from "../new-dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";
import {AuthService} from "../../../auth/auth.service"
import {GlobalLoaderService} from 'src/app/shared/services/loaders/global-loader.service'
@Component({
  selector: "app-state",
  templateUrl: "./state.component.html",
  styleUrls: ["./state.component.scss"],
})
export class StateComponent implements OnInit {
  constructor(
    public newDashboardService: NewDashboardService,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    public _loaderService: GlobalLoaderService,
    private authService: AuthService

  ) {
    this._activatedRoute.queryParams.subscribe((param) => {
      this.stateId = param.stateId;
      for (const key in this.stateUlbData.data) {
        const element = this.stateUlbData.data[key];
        if (element._id == this.stateId) {
          this.stateCode = key;
          break;
        }
      }
      this.mapData.code.state = this.stateCode;
    });
  }
  frontPanelData = data;
  revenueData = [Revenue, Expense, Asset, Tax, Liability, Debt];
  stateId;
  stateCode;

  stateUlbData = JSON.parse(localStorage.getItem("ulbList"));
  mapData = mapConfig;
  dashboardTabData;
  date;
  component_name;
  ngOnInit(): void {
    this._loaderService.showLoader();
    this.component_name = 'State';
    //statedashboard id
    this.newDashboardService
      .getDashboardTabData("619cc1016abe7f5b80e45c6b")
      .subscribe(
        (res) => {
          this._loaderService.stopLoader()
          console.log(res, "dashboardTabData");
          this.dashboardTabData = res["data"];
        },
        (error) => {
          this._loaderService.stopLoader()
          console.log(error);
        }
      );
      this.authService.getLastUpdated().subscribe((res)=>{

        this.date = res['data']
data.year = res['year']
        data.date = this.date

            })
    this.dashBoardData(this.stateId);
  }
yearVal
  setYear(year){
this.yearVal = year
  }

  dashBoardData(stateId) {

    //bringing people info in front panel
    this.newDashboardService
      .dashboardInformation(true, stateId, "state", "2019-20")
      .subscribe(
        (res: any) => {
          this._loaderService.stopLoader()
          this.frontPanelData.dataIndicators.map((item) => {
            switch (item.key) {
              case "population":
                item.value =
                  Math.round(res.data[0].population / 1000000) + " Million";
                if (item.value == "0 Million")
                  item.value = Math.round(res.data[0].population / 1000) + " Thousand";
                break;
              case "density":
                item.value = (res.data[0].density || 0) + "/ Sq km";
                break;
              case "area":
                item.value = ((res.data[0].area/1000).toFixed(0) || 0) + " Sq km";
                break;
              case "Municipal_Corporation":
                item.value = res.data[0].Municipal_Corporation || 0;
                break;
              case "Municipal_Council":
                item.value = res.data[0].Municipal_Council || 0;
                break;
              case "uas":
                item.value = res.data[0].uas || 0;
                break;
              case "Town_Panchayat":
                item.value = res.data[0].Town_Panchayat || 0;
                break;
              case "ulbs":
                item.value = res.data[0].ulbs || 0;
                break;
            }
            return item;
          });
          this.frontPanelData.name = res.data[0]._id.name + " Dashboard";
          this.frontPanelData.stateId = this.stateId
        },
        (error) => {
          this._loaderService.stopLoader()
          console.error(error);
        }
      );
      //bringing cards data on front panel
    this.newDashboardService
      .dashboardInformation(false, stateId, "state", "2019-20")
      .subscribe(
        (res: any) => {

            let obj = { Revenue, Expense, Asset, Tax, Liability, Debt };
            for (const key in obj) {
              const element = obj[key];
              element.number =
               'INR ' + (res.data.length > 0 ? Math.round(res.data.find((value) => value._id == key)?.amount / 10000000): '0') + " Cr";
            }
            this.revenueData = [
              obj.Revenue,
              obj.Expense,
              obj.Asset,
              obj.Tax,
              obj.Liability,
              obj.Debt,
            ];


        },
        (error) => {
          console.error(error);
        }
      );
  }
  setAvail(data){
    console.log('success',data)
  }
  changeInDropDown(event) {
    if (event.fromState) {
      this.stateCode = event.value.ST_CODE;
      this.stateId = this.stateUlbData.data[this.stateCode]._id;
this.mapData.code.state = this.stateCode
      this.dashBoardData(this.stateId);
    } else if (this.stateCode) {
      let cityId = this.stateUlbData.data[this.stateCode].ulbs.find(
        (value) => value.code === event.value.key
      )._id;
      this.router.navigateByUrl(
        `dashboard/city?cityId=${cityId}&stateCode=${this.stateCode}`
      );
    }
  }
}

const data = {
  showMap: true,
  name: "",
  year:"",
  stateId:"",
  date:"",
  desc: "Summary of key state demographics and municipal (urban) indicators",
  link: "",
  linkName: "National Dashboard",
  dataIndicators: [
    {
      value: "0 M",
      title: "Population",
      key: "population",
      super:false
    },
    { value: "0 Sq km", title: "Urban Area", key: "area", super:false },
    { value: "0/ Sq km", title: "Urban Population Density", key: "density", super:false },
    {
      value: "0",
      title: "Municipal Corporations",
      key: "Municipal_Corporation",
      super:false
    },
    {
      value: "0",
      title: "Municipal Council",
      key: "Municipal_Council",
      super:true
    },
    {
      value: "0",
      title: "Urban Agglomorations",
      key: "uas",
      super:false

    },
    {
      value: "0",
      title: "Town Panchayat",
      key: "Town_Panchayat",
      super:true
    },
    {
      value: "0",
      title: "Urban Local Bodies(ULBs)",
      key: "ulbs",
      super:false
    },
  ],
  footer: `Data shown is from audited/provisional financial statements for FY 20-21
  and data was last updated on 21st August 2021`,
  disclaimer: '*To enable standardization of nomenclature across states, we have reclassified all ULBs into one of the three categories - Municipal Corporation, Municipality or Town Panchayat'
};
const Revenue = {
  type: 2,
  subTitle: "Total Revenue",
  svg: `../../../../assets/file.svg`,
  number: "0 Cr",
};
const Expense = {
  type: 2,
  subTitle: "Total Expenditure",
  svg: `../../../../assets/coinCuren.svg`,
  number: "0 Cr",
};
const Asset = {
  type: 2,
  subTitle: "Total Assets",
  svg: `../../../../assets/Group 15967.svg`,
  number: "0 Cr",
};
const Tax = {
  type: 2,
  subTitle: "Total Tax Revenue",
  svg: `../../../../assets/chart.svg`,
  number: "0 Cr",
};
const Liability = {
  type: 2,
  subTitle: "Total Liabilities",
  svg: `../../../../assets/stats.svg`,
  number: "0 Cr",
};
const Debt = {
  type: 2,
  subTitle: "Total Grant",
  svg: `../../../../assets/folder.svg`,
  number: "0 Cr",
};
const mapConfig = {
  code: {
    state: "GJ",
    city: "GJ039",
  },
  showStateList: true,
  showDistrictList: true,
  stateMapContainerHeight: "23rem",
  nationalZoomOnMobile: 3.9, // will fit map in container
  nationalZoomOnWeb: 3.9, // will fit map in container
  stateZoomOnMobile: 4, // will fit map in container
  stateZoomOnWeb: 4, // will fit map in container
  stateBlockHeight: "23.5rem", // will fit map in container
};
