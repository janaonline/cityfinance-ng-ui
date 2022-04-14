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
  learningCount:any
  searchedValue:any
  learningToggle:boolean=false
  noDataa:boolean=false
  dataReceived:boolean=true
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
    this._resourcesDashboardService.castSearchedData.subscribe(data =>{
      this.learningToggle =data
    }) 
    this._resourcesDashboardService.castCount.subscribe(data =>{
      this.learningCount =data?.key?.dataset
      this.searchedValue = data?.name
       this.learningToggle =data?.toggle ? true : false;
       if(data?.key?.total == 0){
        this.noDataa = true
        this.dataReceived = false;
      }  
    })
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

  downloadValue: boolean = false;
  ngOnInit(): void {
    this.filterComponent = {
      comp: "dataSets",
    };
    // this.getData();
  }

  // ngOnChanges(changes: SimpleChange) {
  //   console.log("changes===//>", changes);
  // }

  openNewTab(data) {
    window.open(data?.fileUrl, "_blank");
    // const pdfUrl = data?.fileUrl;
    // const pdfName = data?.fileName;
    // FileSaver.saveAs(pdfUrl, pdfName);

    // return url;
    // window.open(url, '_blank');
  }
  noData = false;
  getData() {
    
    console.log("getData");

    this.globalLoaderService.showLoader();
    this._resourcesDashboardService
      .getDataSets(this.year, this.type, this.category, this.state, this.ulb)
      .subscribe(
        (res) => {
          this.balData = res["data"];
          if (this.balData.length == 0) {
            this.noData = true;
          } else if (this.balData.length !== 0) {
            this.globalLoaderService.stopLoader();
            this.noData = false;
          }
        },
        (err) => {
          this.globalLoaderService.stopLoader();
          console.log(err.message);
        }
      );
  }
  balData = [];
  allSelected = false;
  unSelect = false;
  selectedUsersList = [];
  state;
  ulb;
  filterData(e) {
    
    console.log("Data sets", e);
    this.year = e?.controls?.year?.value ?? "2020-21";
    this.type = e?.controls?.contentType?.value ?? "Raw Data PDF";
    this.state = e?.controls?.state?.value;
    this.ulb = e?.controls?.ulb?.value;
    // if (e) {
    this.getData();
    // }
  }

  isAllSelected(All: boolean = false) {
    if (All) {
      const numSelected = this.selectedUsersList.length;
      const numRows = this.balData.length;
      return numSelected === numRows;
    } else {
      return !!this.selectedUsersList.length;
    }
  }
  async masterToggle() {
    if (this.isAllSelected(true)) {
      for await (const user of this.balData) {
        user[`isSelected`] = false;
      }
      this.selectedUsersList = [];
    } else {
      this.selectedUsersList = [];
      this.balData.forEach((row) => {
        this.selectedUsersList.push(row);
        row[`isSelected`] = true;
      });
    }
    console.log(this.selectedUsersList);
  }

  checkDownloadButton() {
    // this.globalLoaderService.stopLoader();
    
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
        const pdfUrl = data?.fileUrl;
        const pdfName = data?.fileName;
        FileSaver.saveAs(pdfUrl, pdfName);
      }
    }
  }

  newArray = [];
  checkValue = false;
  toggleRowSelection(event, row) {
    // this.checkDownloadButton();

    
    console.log("selected event", event.source, row.fileName);

    if (row.isSelected) {
      let index = this.selectedUsersList.findIndex((el) => el._id == row._id);
      console.log(index);
      if (index > -1) this.selectedUsersList.splice(index, 1);
      row.isSelected = false;

      // if (this.selectedUsersList.length >= 5) {
      //   this.disabledValue = true;
      // } else if (this.selectedUsersList.length <= 5) {
      //   this.disabledValue = false;
      // }
    } else {
      this.selectedUsersList.push(row);

      this.checkValue = true;
      // if (this.selectedUsersList.length >= 5) {
      //   this.disabledValue = true;
      // } else if (this.selectedUsersList.length <= 5) {
      //   this.disabledValue = false;
      // }
      row.isSelected = true;
    }
    // this.checkDownloadButton();

    // setTimeout(() => {

    // }, 100);

    console.log(this.selectedUsersList);
  }
}
