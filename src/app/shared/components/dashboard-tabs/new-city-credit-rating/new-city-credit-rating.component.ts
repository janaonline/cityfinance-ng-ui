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
  id: any;
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
        console.log("stid", this.id);
        // this.id = this.cityId;
        this.id = cityId;
        sessionStorage.setItem("row_id", this.id);
      } else {
        this.id = sessionStorage.getItem("row_id");
      }
    });
  }

  selectCreditYear(event: any) {
    this.yearValue = event;
  }

  getDetailedData() {
    const myPromise = new Promise((resolve, error) => {
      this.assetService
        .fetchCreditRatingDetailedReport()
        .subscribe((prices) => resolve(prices), error);
    });
    return myPromise;
  }

  async ngOnInit(): Promise<void> {
    this.detailedList = await this.getDetailedData();

    this.stateCode[this.ulbStateMapping[this.id]].ulbs.filter((elem: any) => {
      if (elem._id == this.id) {
        this.ulbName = elem.name;
      }
    });

    this.detailedList.filter((elem, index: any) => {
      if (elem.ulb == "Tiruppur Municipal Corporation") {
        elem["date"] = "20" + elem.date.split("/")[2];
        this.finalList.push(elem);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}
}
