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
  yearValue: any = "2021";
  yearOptions = ['2021', '2020', '2019', '2018', '2017'];
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
      let tempData;
      for (const element of data) {
        element["financialYear"] = element.date.split("/")[2];
        element["ulbCode"] = element['ulb code'];        
      }
      tempData = JSON.parse(JSON.stringify(data));
     
      console.log('tempData', tempData)
      let ulbCodes = JSON.parse(localStorage.getItem("ulbCodeMapping"));
      this.finalList = tempData.filter(
        (elem, index: any) =>
          elem["ulbCode"] == ulbCodes[this._id] &&
          this.demoArray.includes(elem.agency) &&
          (elem.financialYear == this.yearValue)
       
      );
      console.log('finalList', this.finalList)
    }

    console.log("this.finalList", this.finalList);
  }

  ulbList: string;
  async ngOnInit(): Promise<void> {
    this.detailedList = await this.getDetailedData();
    let ulbCodes = JSON.parse(localStorage.getItem("ulbCodeMapping"));
    if(this.detailedList?.length > 0) {
      const preSelectedYear = this.detailedList
        .filter(item => item?.link?.endsWith('.pdf') && this.demoArray.includes(item.agency) && item["ulb code"] == ulbCodes[this._id])
        .sort((a, b) => +a?.date.split("/")?.[2] < +b?.date.split("/")?.[2] ? 1 : -1)?.[0]?.date.split("/")?.[2];
      if(preSelectedYear) {
        this.selectCreditYear(preSelectedYear);
      }
    }
    console.log("this.detailedLIst", this.detailedList);

    console.log("ulbStateMapping", this.ulbStateMapping);


    if (this.detailedList) {
      this.getFinalData(this.detailedList);
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log({ changes });
  }
}
