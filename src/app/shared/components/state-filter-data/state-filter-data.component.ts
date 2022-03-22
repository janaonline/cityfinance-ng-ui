import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/util/BaseComponent/base_component";
import { ActivatedRoute } from "@angular/router";
import { StateFilterDataService } from "./state-filter-data.service";
import { FormControl } from "@angular/forms";
import { CommonService } from "../../services/common.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-state-filter-data",
  templateUrl: "./state-filter-data.component.html",
  styleUrls: ["./state-filter-data.component.scss"],
})
export class StateFilterDataComponent extends BaseComponent implements OnInit {
  stateId: any;
  revenueId: any;
  stateCode = JSON.parse(localStorage.getItem("ulbList")).data;
  ulbStateMapping = JSON.parse(localStorage.getItem("ulbStateCodeMapping"));

  nationalFilter = new FormControl();

  filteredOptions: Observable<any[]>;

  @Input() data;

  scatterData = {
    type: "scatter",
    data: {
      datasets: [
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
        {
          label: "National Average",
          data: [
            { x: 0, y: 12 },
            { x: 50, y: 12 },
          ],
          showLine: true,
          fill: false,
          borderColor: "rgba(0, 200, 0, 1)",
        },
        {
          label: "State Average",
          data: [
            { x: 0, y: 8 },
            { x: 50, y: 8 },
          ],
          showLine: true,
          fill: false,
          borderColor: "red",
        },
      ],
    },
  };

  barData = {
    type: "bar",
    data: {
      labels: [
        "Nasik",
        "Mumbai",
        "Pune",
        "Nagpur",
        "Aurangabad",
        "Solapur",
        "Amravati",
        "Navi Mumbai",
        "Nagpur",
        "Thane",
      ],
      datasets: [
        {
          label: "City Ranking",
          data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 11],
          backgroundColor: [
            "#1E44AD",
            "#224CC0",
            "#2553D3",
            "#3360DB",
            "#456EDE",
            "#587DE1",
            "#6A8BE5",
            "#86A2ED",
            "#93AAEA",
            "#A8BCF0",
          ],
          borderColor: ["#1E44AD"],
          borderWidth: 1,
        },
      ],
    },
  };
  bottomBarData = {
    type: "bar",
    data: {
      labels: [
        "Nasik",
        "Mumbai",
        "Pune",
        "Nagpur",
        "Aurangabad",
        "Solapur",
        "Amravati",
        "Navi Mumbai",
        "Nagpur",
        "Thane",
      ],
      datasets: [
        {
          label: "City Ranking",
          data: [13, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          backgroundColor: [
            "#1E44AD",
            "#224CC0",
            "#2553D3",
            "#3360DB",
            "#456EDE",
            "#587DE1",
            "#6A8BE5",
            "#86A2ED",
            "#93AAEA",
            "#A8BCF0",
          ],
          borderColor: ["#1E44AD"],
          borderWidth: 1,
        },
      ],
    },
  };

  BarGraphValue = true;

  headerActions = [
    {
      name: "Download",
      svg: "../../../../assets/CIty_detail_dashboard – 3/2867888_download_icon.svg",
    },
    {
      name: "share/embed",
      svg: "../../../../assets/CIty_detail_dashboard – 3/Layer 51.svg",
    },
  ];

  constructor(
    public activatedRoute: ActivatedRoute,
    public stateFilterDataService: StateFilterDataService,
    private _commonServices: CommonService
  ) {
    super();
    this.activatedRoute.queryParams.subscribe((val) => {
      console.log("val", val);
      const { stateId } = val;
      if (stateId) {
        console.log("stid", this.stateId);
        this.stateId = stateId;
        sessionStorage.setItem("row_id", this.stateId);
      } else {
        this.stateId = sessionStorage.getItem("row_id");
      }
    });
  }

  showBarGraph() {
    this.BarGraphValue = true;
    console.log("this.BarGraphValue", this.BarGraphValue);
  }

  showBottomGraph() {
    this.BarGraphValue = false;
  }

  generateRandomId(name) {
    let number = Math.floor(Math.random() * 100);
    let newId = number + name;
    return newId;
  }

  getScatterData() {
    let inputVal: any = {};
    inputVal.stateIds = this.stateId;
    this.stateFilterDataService
      .getScatterdData(this.stateId, this.revenueId)
      .subscribe((res) => console.log("response data", res));
  }

  getRevenueId() {
    this.stateFilterDataService
      .getRevID()
      .subscribe((res) => console.log("revenue ==>", res));
  }

  ngOnInit(): void {
    this.nationalFilter.valueChanges.subscribe((value) => {
      if (value?.length >= 1) {
        this._commonServices
          .postGlobalSearchData(value, "", "")
          .subscribe((res: any) => {
            console.log(res?.data);
            let emptyArr: any = [];
            this.filteredOptions = emptyArr;
            if (res?.data.length > 0) {
              this.filteredOptions = res?.data;
              //this.noDataFound = false;
            } else {
              let emptyArr: any = [];
              this.filteredOptions = emptyArr;
              // this.noDataFound = true;
              console.log("no data found");
            }
          });
      } else {
        return null;
      }
    });
    console.log(
      "this.statecode",
      this.stateCode[this.stateId],
      this.ulbStateMapping,
      this.stateId
    );

    console.log("this.data===>", this.data);

    this.getScatterData();
    this.getRevenueId();
  }
}
