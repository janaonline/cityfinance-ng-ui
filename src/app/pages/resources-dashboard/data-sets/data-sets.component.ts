import { Component, OnInit, SimpleChange } from "@angular/core";
import { ResourcesDashboardService } from "../resources-dashboard.service";
import { Router, NavigationStart, Event, NavigationEnd } from "@angular/router";
import { GlobalLoaderService } from "src/app/shared/services/loaders/global-loader.service";
import * as FileSaver from "file-saver";
@Component({
  selector: "app-data-sets",
  templateUrl: "./data-sets.component.html",
  styleUrls: ["./data-sets.component.css"],
})
export class DataSetsComponent implements OnInit {
  learningCount: any;
  searchedValue: any = "";
  learningToggle: boolean = false;
  noDataa: boolean = false;
  dataReceived: boolean = true;
  selectedUseCheckBox: any[];
  initialValue: number = 10;

  tempBalData;
  offSet = 0;
  limit = 10;
  startingIndex = 0;
  mobileFilterConfig: any = {
    isState: true,
    isUlb: true,
    isContentType: true,
    isYear: true,
    useFor: "resourcesDashboard"
  };
  constructor(
    private _resourcesDashboardService: ResourcesDashboardService,
    private router: Router,
    public globalLoaderService: GlobalLoaderService
  ) {
    router.events.subscribe((val) => {
      // see also
      console.log(val instanceof NavigationEnd, this.router.url);
      if (this.router.url.includes("income_statement")) {
        this.category = "income";
      } else if (this.router.url.includes("balanceSheet")) {
        this.category = "balance";
      }
    });
    this._resourcesDashboardService.castSearchedData.subscribe((data) => {
      this.learningToggle = data;
    });
    this._resourcesDashboardService.castCount.subscribe((data) => {
      this.learningCount = data?.key?.dataSet;
      this.searchedValue = data?.name;
      this.learningToggle = data?.toggle ? true : false;
      if (data?.key?.total == 0 && this.searchedValue !==  "") {
        this.noDataa = true;
        this.dataReceived = false;
      } else {
        this.noDataa = false;
        this.dataReceived = true;
      }
    });
  }
  category;
  filterComponent;
  tabData = [
    {
      name: "Income Statement",
      filter: ["innerTab1", "innerTab2", "innerTab3"],
      link: "income_statement",
    },
    {
      name: "Balance Sheet",
      filter: ["innerTab4", "innerTab5", "innerTab6"],
      link: "balanceSheet",
    },
  ];
  year;
  type;

  loopControl :number = 0;

  downloadValue: boolean = false;
  ngOnInit(): void {
    this.filterComponent = {
      comp: "dataSets",
    };
    // this.getData();
  }

  ngOnChanges(changes: SimpleChange) {
    console.log("changes===//>", changes);
  }

  openNewTab(data, fullData) {
    if(fullData.hasOwnProperty("section") && fullData.section == "standardised"){
      this.selectedUsersList = []
      this.selectedUsersList.push(fullData);
      this.download(1)
      this.selectedUsersList = []
      return;
    }
    console.log("file data", data);
    window.open(data, "_blank");
    // window.open(data?.fileUrl, "_blank");
    // const pdfUrl = data?.fileUrl;
    // const pdfName = data?.fileName;
    // FileSaver.saveAs(pdfUrl, pdfName);

    // return url;
    // window.open(url, '_blank');
  }
  noData = false;
  checkIsDisabled(selectedList) {
    if (selectedList.length === 5) {
      this.balData.forEach((elem) => {
        if (!selectedList.includes(elem)) {
          elem.isDisabled = true;
        }
      });
    }
    if (selectedList.length === 4) {
      this.balData.forEach((elem) => {
        elem.isDisabled = false;
      });
    }
  }

  loadMore() {
    let limitValue = this.offSet + this.limit;
    console.log({ limitValue });
    if(this.loopControl > limitValue) {
      limitValue
    } else {
      limitValue = this.loopControl
    }
    if (limitValue < 30) {
      for (this.offSet; limitValue > this.offSet; this.offSet++) {
        console.log("this.offSet", this.offSet);
        this.balData.push(this.tempBalData[this.offSet]);
      }
      this.initialValue = this.initialValue + 10;
    }
  }

  // sliceData() {
  //   this.balData = this.balData.slice(0, this.initialValue);
  //   console.log(this.balData);
  //   return this.balData;
  // }

  getToTop() {
    let element = document.getElementById("top");

    element.scrollIntoView();
  }
  getData() {
    console.log("getData");
    let globalName= "";
    if(this.searchedValue){
      globalName = this.searchedValue
    }

    this.globalLoaderService.showLoader();
    try {
      this._resourcesDashboardService
        .getDataSets(this.year, this.type, this.category, this.state, this.ulb, globalName)
        .subscribe(
          (res: any) => {
            console.log("148",this.balData, res);
            // this.balData = res["data"];
            if (res.data.length == 0) {
              this.noData = true;
              this.balData = []
              this.globalLoaderService.stopLoader();
            } else if (res.data.length !== 0) {


              this.tempBalData = res.data;
              console.log("tempBalData", this.tempBalData)
              let limitVal = this.offSet + this.limit;
              
              if(this.tempBalData.length > limitVal) {
                this.loopControl = limitVal
              } else {
                this.loopControl = this.tempBalData.length
              }

              console.log("loopControl==>",this.loopControl)
              this.balData = []
              for (let i = 0; i < this.loopControl; i++) {
                const element = this.tempBalData[i];
                console.log("element==>",element)

                this.balData.push(element);
              }
              console.log("finalBalData", this.balData)

              this.balData = this.balData.map((elem) => {
                let target = { isDisabled: false, isSelected: false };
                return Object.assign(target, elem);
              });

              this.globalLoaderService.stopLoader();
              this.noData = false;
            }
          },
          (err) => {
            this.globalLoaderService.stopLoader();
            console.log(err.message);
          }
        );
    } catch (err) {
      this.globalLoaderService.stopLoader();
    }
  }
  balData = [];
  allSelected = false;
  unSelect = false;
  selectedUsersList = [];
  state;
  ulb;
  filterData(e) {
    console.log("Data sets", e);
    this.year = e?.value?.year ?? "2020-21";
    this.type = e?.value?.contentType ?? "Raw Data PDF";
    this.state = e?.value?.state;
    this.ulb = e?.value?.ulb;
    // if (e) {
    this.getData();
    // }
  }

  // isAllSelected(All: boolean = false) {
  //   // if (All) {
  //   //   const numSelected = this.selectedUsersList.length;
  //   //   const numRows = this.balData.length;
  //   //   return numSelected === numRows;
  //   // } else {
  //   //   return !!this.selectedUsersList.length;
  //   // }
  // }
  async masterToggle(event) {
    if (!event.checked) {
      this.selectedUsersList = [];
      this.balData.forEach((val) => {
        val.isDisabled = false;
        val.isSelected = false;
      });
      return;
    }

    if (event.checked) {
      let i = 0;
      while (this.selectedUsersList.length < 5) {
        if (this.balData[i].isSelected) {
          i++;
          continue;
        }
        this.balData[i].isSelected = true;
        this.selectedUsersList.push(this.balData[i++]);
      }
    }
    this.checkIsDisabled(this.selectedUsersList);
  }

  checkDownloadButton() {
    if (!this.checkValue) {
      this.downloadValue = false;
    } else {
      this.downloadValue = true;
    }
  }

  // downloadFile() {

  //   this.reviewUlbService.downloadData().subscribe(

  //   (result) => {

  //   let blob: any = new Blob([result], {

  //   type: "text/json; charset=utf-8",

  //   });

  //   const url = window.URL.createObjectURL(blob);

  //   fileSaver.saveAs(blob, "Review Grant Application.xlsx");

  //   },

  //   (err) => {

  //   console.log(err.message)

  //   }

  //   )

  //   }

  disabledValue = false;
  download(event) {
    if (event) {
      console.log(this.selectedUsersList);
      for (let data of this.selectedUsersList) {
        if(data.hasOwnProperty('section') && data['section']=="standardised"){
this._resourcesDashboardService.getStandardizedExcel([data]).subscribe((res)=> {
  const blob = new Blob([res], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  FileSaver.saveAs(blob, data.fileName );
console.log('File Download Done')
return
}, (err)=> {
  console.log(err)
})
        }else{
          const pdfUrl = data?.fileUrl;
          const pdfName = data?.fileName;
          FileSaver.saveAs(pdfUrl, pdfName);
        }
        
      }
    }
  }

  newArray = [];
  checkValue = false;
  toggleRowSelection(event, row, i) {
    // if(row.hasOwnProperty("section") && row['section']=="standardised"){

    // }else{
      if (event.checked) {
        this.selectedUsersList.push(row);
        this.checkValue = true;
        row.isSelected = true;
      } else {
        let index = this.selectedUsersList.indexOf(row);
        this.selectedUsersList.splice(index, 1);
  
        row.isSelected = false;
      }
  
      console.log("hhhhh", this.selectedUsersList);
  
      this.checkIsDisabled(this.selectedUsersList);
    
 
  }
}
