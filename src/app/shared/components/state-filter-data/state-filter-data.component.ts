import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
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
  lastSelectedId: number = 0;
  ActiveButton: any;
  filterName: any;
  tabName: any;
  headOfAccount: any;
  chartId = `stateSCharts-${Math.random()}`;
  financialYear;

  isPerCapita = false;

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
      name: "Share/Embed",
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

  getScatterData() {
    let inputVal: any = {};
    inputVal.stateIds = this.stateId;
    this.stateFilterDataService
      .getScatterdData(this.stateId, this.revenueId)
      .subscribe((res) => console.log("response data", res));
  }

  getSelectedFinancialYear(event) {
    console.log("financial year", event.target.value);
    this.financialYear = event.target.value;
  }

  changeActiveBtn(i) {
    console.log(this.data.btnLabels[i], "activeBTN");
    this.ActiveButton = this.data.btnLabels[i];
    this.lastSelectedId = i;

    // let id = `btn-${i}`;
    // if (this.lastSelectedId) {
    //   document
    //     .getElementById(this.lastSelectedId)
    //     ?.classList.remove("selected");
    //   document.getElementById(this.lastSelectedId)?.classList.add("deSelected");
    // }
    // document.getElementById(id)?.classList?.add("selected");
    // document.getElementById(id)?.classList?.remove("deSelected");

    this.isPerCapita = this.data.btnLabels[i]
      .toLocaleLowerCase()
      .split(" ")
      .join("")
      .includes("percapita");
    let newName = this.data.btnLabels[i]?.toLocaleLowerCase();

    if (newName.includes("mix"))
      this.filterName = this.data.btnLabels[i]?.toLocaleLowerCase();
    else if (newName.includes("revenue") && !newName.includes("own"))
      this.filterName = "revenue";
    else if (newName.includes("own") && newName.includes("revenue"))
      this.filterName = newName;
    else this.filterName = this.data.btnLabels[i]?.toLocaleLowerCase();
  }

  getRevenueId() {
    this.stateFilterDataService
      .getRevID()
      .subscribe((res) => console.log("revenue ==>", res));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.tabName = this.data.name.toLocaleLowerCase();
      this.data = {
        ...this.data["mainContent"][0],
        filterName: this.data.name,
      };
      // this.changeActiveBtn(0);
      // this.aboutIndicators = this.data["static"].indicators;
      setTimeout(() => {
        if (this.data.btnLabels.length) this.changeActiveBtn(0);
        // this.getChartData({});
      }, 0);
      this.setHeadOfAccount();
    }

    console.log(
      "payloadData===>",
      this.filterName,
      this.headOfAccount,
      this.isPerCapita
    );

    // console.log("this.barChart", this.barChart);
  }

  setHeadOfAccount() {
    let name = this.data["filterName"].toLocaleLowerCase().split(" ");
    this.headOfAccount = name.includes("revenue")
      ? "Revenue"
      : name.includes("expenditure")
      ? "Expense"
      : "Tax";
  }

  ngOnInit(): void {
    this.changeActiveBtn(0);
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

    console.log("this.tabName", this.data);

    this.getScatterData();
    this.getRevenueId();
  }
}
