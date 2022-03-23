import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/util/BaseComponent/base_component";
import { ActivatedRoute } from "@angular/router";
import { StateFilterDataService } from "./state-filter-data.service";
import { FormControl } from "@angular/forms";
import { CommonService } from "../../services/common.service";
import { Observable } from "rxjs";
import {GlobalLoaderService} from 'src/app/shared/services/loaders/global-loader.service'
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
          label: "Municipality",
          data: [
           
          ],
          showLine: false,
          fill: true,
          borderColor: "#1EBFC6",
          backgroundColor: "#1EBFC6",
        },
        {
          label: "Municipal Corporation",
          data: [
          
          ],
          showLine: false,
          fill: true,
          borderColor: "#3E5DB1",
          backgroundColor: "#3E5DB1",
        },
        {
          label: "Town Panchayat",
          data: [
           
          ],
          showLine: false,
          fill: true,
          borderColor: "#F5B742",
          backgroundColor: "#F5B742",
        },
        {
          label: "National Average",
          data: [
            { x: 0, y: 0 },
            { x: 10000, y: 0 },
          ],
          showLine: true,
          fill: false,
          borderColor: "rgba(0, 200, 0, 1)",
        },
        {
          label: "State Average",
          data: [
            { x: 0, y: 8 },
            { x: 10000, y: 0 },
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
    private _commonServices: CommonService,
    public _loaderService: GlobalLoaderService
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
    this._loaderService.showLoader()
    let dummyPayload = {
      "state":"5dcf9d7216a06aed41c748e2",
      "financialYear":"2016-17",
      "headOfAccount":"Revenue",
      "filterName":"revenue"
    }
    let inputVal: any = {};
    inputVal.stateIds = this.stateId;
    this.stateFilterDataService
      .getScatterdData(dummyPayload)
      .subscribe((res) =>{
        this._loaderService.stopLoader()
        console.log("response data", res)
    let mCorporation = res['mCorporation'];
    let tp_data = res['townPanchayat'];
    let m_data = res['municipality']
    let natData = res['natAvg'][0]['average']
    let stateData = res['stateAvg'][0]['average']


    this.scatterData.data.datasets.forEach(el=>{
      let obj = {x:0,y:0}
      if(el.label == 'Town Panchayat'){
        obj = {x:0,y:0}
        tp_data.forEach((el2,index)=>{
obj.x = el2.population
obj.y = el2.totalRevenue
el.data.push(obj)
obj = {x:0,y:0}
        })
       
    
      }else  if(el.label == 'Municipal Corporation'){
        mCorporation.forEach((el2,index)=>{
         
          obj.x = el2.population
          obj.y = el2.totalRevenue
          el.data.push(obj)
          obj = {x:0,y:0}
                  })
      }else  if(el.label == 'Municipality'){
        m_data.forEach((el2,index)=>{
          obj = {x:0,y:0}
          obj.x = el2.population
          obj.y = el2.totalRevenue
          el.data.push(obj)
          obj = {x:0,y:0}
                  })
    
      } else if(el.label == 'National Average'){
el['data'][1]['y'] = natData

      }else if(el.label == 'State Average'){
        el['data'][1]['y'] = stateData
      }
    })
    console.log(this.scatterData)
    this.generateRandomId('scatterChartId123')
    this.scatterData = {...this.scatterData}; 
   
      }, (err)=>{
        this._loaderService.stopLoader()
        console.log(err.message)
      } );
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
