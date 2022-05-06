import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { BaseComponent } from "src/app/util/BaseComponent/base_component";

@Component({
  selector: "app-new-city-credit-rating",
  templateUrl: "./new-city-credit-rating.component.html",
  styleUrls: ["./new-city-credit-rating.component.scss"],
})
export class NewCityCreditRatingComponent
  extends BaseComponent
  implements OnInit, OnChanges
{
  _id: any;
  detailedList: any;
  ulbName: any;
  yearValue: any = "2019";
  finalList: any = [];
  lastList: any = [];
  stateCode = JSON.parse(localStorage.getItem("ulbList")).data;
  ulbStateMapping = JSON.parse(localStorage.getItem("ulbStateCodeMapping"));

  demoArray = [
    "Auicte/SMERA",
    "Brickwork",
    "CARE",
    "CRISIL",
    "ICRA",
    "India Ratings & Research",
  ];
  constructor(
    private assetService: AssetsService,
    public activatedRoute: ActivatedRoute
  ) {
    super();
    this.activatedRoute.queryParams.subscribe((val) => {
      console.log("val", val);
      const { cityId } = val;
      if (cityId) {
        console.log("stid", this._id);
        this._id = cityId;
        sessionStorage.setItem("row_id", this._id);
      } else {
        this._id = sessionStorage.getItem("row_id");
      }
    });
  }

  selectCreditYear(event: any) {
    this.yearValue = event;
    // this.getDetailedData();
    this.finalList = [];
    this.getFinalData(this.detailedList);
  }

  getDetailedData() {
    const myPromise = new Promise((resolve, error) => {
      this.assetService
        .fetchCreditRatingDetailedReport()
        .subscribe((prices) => resolve(prices), error);
    });
    return myPromise;
  }

  getFinalData(data) {
    if (data) {
      let ulbCodes = JSON.parse(localStorage.getItem("ulbCodeMapping"));
      this.detailedList = data.filter((elem, index: any) => {
        if (elem["ulb code"] == ulbCodes[this._id]) {
          console.log(elem.date);
          if (elem["date"].includes("/"))
            elem["date"] = elem.date.split("/")[2];
          if (elem.date == this.yearValue) {
            this.finalList.push(elem);
          }
          return true;
        }
        return false;
      });
    }
    console.log("this.finalList", this.finalList);
  }

  ulbList: string;
  async ngOnInit(): Promise<void> {
    this.detailedList = await this.getDetailedData();
    console.log("this.detailedLIst", this.detailedList);

    console.log("ulbStateMapping", this.ulbStateMapping);

    // for (let item in this.stateCode) {
    //   if (this.stateCode[item]._id == this._id) {
    //     this.ulbList = this.stateCode[item]?.ulbs;
    //   }
    // }

    // console.log("stateName", this.ulbList);

    if (this.detailedList) {
      this.getFinalData(this.detailedList);
    }

    // this.detailedList.filter((elem, index: any) => {
    //   if (this.ulbList.includes(elem.ulb)) {
    //     elem["date"] = "20" + elem.date.split("/")[2];
    //     if (elem.date == this.yearValue) {
    //       this.finalList.push(elem);
    //     }
    //   }
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log({ changes });
  }
}
