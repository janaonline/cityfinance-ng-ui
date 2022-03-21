import {
  Component,
  OnInit,
  Input,
  HostListener,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import * as fileSaver from "file-saver";
import {OwnRevenueService} from '../../../pages/own-revenue-dashboard/own-revenue.service'
import Chart from "chart.js";
import {GlobalLoaderService} from 'src/app/shared/services/loaders/global-loader.service'
@Component({
  selector: "app-front-panel",
  templateUrl: "./front-panel.component.html",
  styleUrls: ["./front-panel.component.scss"],
})
export class FrontPanelComponent implements OnInit, OnChanges {
  @Input()
  data = {
    showMap: true,
    stateId:"",
    date:"",
    year:"",
    name: "",
    desc: "This urban local body has been classified as a municipal corporation in the 4M+ population category",
    finance: "",
    link: "",
    linkName: "",
    footer: ``,
    disclaimer:"",
    dataIndicators: [
      // {
      //   value: "0 Million",
      //   title: "population",
      // },
      // { value: "0 Sq km", title: "area" },
      // { value: "0/ Sq km", title: "populationDensity" },
      // {
      //   value: "0",
      //   title: "wards",
      // },
    ],
  };
  @Input()
  cardData = [revenue, expenditure, assets, liabilities, tax_revenue, grants];
  @Input()
  cardStyle = cardStyle;
  @Input()
  mapConfig = {
    showStateList: false,
    showDistrictList: false,
    stateMapContainerHeight: "23rem",
    nationalZoomOnMobile: 3.9, // will fit map in container
    nationalZoomOnWeb: 3.9, // will fit map in container
    stateZoomOnMobile: 4, // will fit map in container
    stateZoomOnWeb: 4, // will fit map in container
    stateBlockHeight: "23.5rem", // will fit map in container
  };
  @Output()
  changeInStateOrCity = new EventEmitter();
  @Output()
  yearValue  = new EventEmitter()
  dataAvailLoading = false
  financialYear
  availValue
  dataAvailable
  notFoundNames = []
  showButton: boolean = true;
  constructor(
    public ownRevenueService: OwnRevenueService,
    public _loaderService: GlobalLoaderService
  ) {
    this.yearValue.emit('2019-20');
  }

  ngOnInit(): void {
    this.getAvailableData()
    
  }

  ngOnChanges(changes: SimpleChanges): void {}

  changeInMapFilter(event) {
    this.getAvailableData()
    this.changeInStateOrCity.emit(event);
  }
yearVal = '2019-20'
ulbId 
  downloadCSV(from) {
   
      this.ownRevenueService.displayDataAvailable(this.data.name).subscribe(
        (res: any) => {
          let blob: any = new Blob([res], {
            type: "text/json; charset=utf-8",
          });
          const url = window.URL.createObjectURL(blob);

          fileSaver.saveAs(blob, "dataAvaliable.xlsx");
        },
        (error) => {}
      );
    
  }
  getAvailableData() {
    this._loaderService.showLoader()
    this.dataAvailLoading  = true
   
  let obj = {
    financialYear: this.yearVal,
    stateId: this.data.stateId
  }
    this.ownRevenueService.displayDataAvailable(obj).subscribe(
      (res) => {
        this._loaderService.stopLoader()
        this.dataAvailLoading  = false
        // this._loaderService.stopLoader()
        res["data"].percent = parseFloat(res["data"].percent.toFixed(2));
        this.financialYear = res;
      this.availValue =  res["data"]?.percent
          this.halfDoughnutChart();
       
       
        this.notFoundNames = res["data"]?.names;
        console.log("ordResponse", res);
      },
      (err) => {
        this._loaderService.stopLoader()
        this.dataAvailLoading  = false
        console.log("error", err);
      }
    );
  }

  myChart: any
  halfDoughnutChart() {
    if(this.myChart){
      this.myChart.destroy();
    }
    
    this.dataAvailable = this.availValue;
  
      const canvas = <HTMLCanvasElement>document.getElementById("myChart1");
      const ctx = canvas.getContext("2d");
       this.myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: [
            'Data available',
            'Data not available'
          ],
          datasets: [
            {
              label: "Availability",
              borderWidth: 0,
              data: [this.dataAvailable, 100 - this.dataAvailable],
              backgroundColor: ["rgba(51, 96, 219, 1)", "rgba(218, 226, 253, 1)"],
            },
          ],
        },
        options: {
          
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI,
          legend: {
            display: false,
          },
          cutoutPercentage: 75,
        },
      });
    
  }

}



const revenue = {
  type: 6,
  title: "revenue",
  subTitle: "revenue",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  img: "",
  para: "",
  actionButtons: [
    {
      name: "btn1",
      function: "",
    },
    {
      name: "btn2",
      function: "",
    },
  ],
  number: 230,
  amount: "567 Cr",
  projectId: 123,
  text: "",
  id: 1,
};
const expenditure = {
  type: 2,
  title: "expenditure",
  subTitle: "expenditure",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  img: "",
  para: "",
  actionButtons: [
    {
      name: "btn1",
      function: "",
    },
    {
      name: "btn2",
      function: "",
    },
  ],
  number: 230,
  amount: "567 Cr",
  projectId: 123,
  text: "",
  id: 1,
};
const assets = {
  type: 2,
  title: "assets",
  subTitle: "assets",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  img: "",
  para: "",
  actionButtons: [
    {
      name: "btn1",
      function: "",
    },
    {
      name: "btn2",
      function: "",
    },
  ],
  number: 230,
  amount: "567 Cr",
  projectId: 123,
  text: "",
  id: 1,
};
const tax_revenue = {
  type: 2,
  title: "tax_revenue",
  subTitle: "tax_revenue",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  img: "",
  para: "",
  actionButtons: [
    {
      name: "btn1",
      function: "",
    },
    {
      name: "btn2",
      function: "",
    },
  ],
  number: 230,
  amount: "567 Cr",
  projectId: 123,
  text: "",
  id: 1,
};
const liabilities = {
  type: 2,
  title: "liabilities",
  subTitle: "liabilities",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  img: "",
  para: "",
  actionButtons: [
    {
      name: "btn1",
      function: "",
    },
    {
      name: "btn2",
      function: "",
    },
  ],
  number: 230,
  amount: "567 Cr",
  projectId: 123,
  text: "",
  id: 1,
};
const grants = {
  type: 2,
  title: "grant",
  subTitle: "grant",
  svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
  img: "",
  para: "",
  actionButtons: [
    {
      name: "btn1",
      function: "",
    },
    {
      name: "btn2",
      function: "",
    },
  ],
  number: 230,
  amount: "567 Cr",
  projectId: 123,
  text: "",
  id: 1,
};

const cardStyle = {
  width: "auto",
  borderRadius: "0.7500em",
  height: "auto",
  "max-height": "8rem",
};
