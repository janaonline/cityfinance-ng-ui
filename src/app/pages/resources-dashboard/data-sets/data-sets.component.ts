import { Component, OnInit, SimpleChange } from "@angular/core";
import { ResourcesDashboardService } from "../resources-dashboard.service";
import { Router, NavigationStart, Event, NavigationEnd } from "@angular/router";
import { GlobalLoaderService } from "src/app/shared/services/loaders/global-loader.service";
import { ReportService } from "../../../dashboard/report/report.service";
import * as FileSaver from "file-saver";
import { environment } from "src/environments/environment";
import { BalanceTabledialogComponent } from "src/app/shared/components/balance-table/balance-tabledialog/balance-tabledialog.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

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

  // tempBalData;
  // offSet: number = 0;
  // limit: number = 10;
  // startingIndex = 0;
  mobileFilterConfig: any = {
    isState: true,
    isUlb: true,
    isContentType: true,
    isYear: true,
    useFor: "resourcesDashboard"
  };
  // isloadMore = false;
  storageBaseUrl: string = environment?.STORAGE_BASEURL;
  allReports: any;
  // category;
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
  year: string;
  type: string;

  // loopControl: number = 0;
  checkValue = false;
  downloadValue: boolean = false;

  // Navinder's variables.
  skip: number = 0;
  loadMoreData: boolean = false;
  totalDocs: number = 0;
  durationInSeconds: number = 3;
  isBlinking: boolean = false;
  category: string = "balance";
  isChecked: boolean = false;

  constructor(
    private _resourcesDashboardService: ResourcesDashboardService,
    private router: Router,
    public globalLoaderService: GlobalLoaderService,
    public dialog: MatDialog,
    protected reportService: ReportService,
    private _snackBar: MatSnackBar
  ) {
    // router.events.subscribe((val) => {
    //   // see also
    //   // // console.log(val instanceof NavigationEnd, this.router.url);
    //   // if (this.router.url.includes("income_statement")) {
    //   //   this.category = "income";
    //   // } else if (this.router.url.includes("balanceSheet")) {
    //     this.category = "balance";
    //   // }
    // });
    this._resourcesDashboardService.castSearchedData.subscribe((data) => {
      this.learningToggle = data;
    });
    this._resourcesDashboardService.castCount.subscribe((data) => {
      this.learningCount = data?.key?.dataSet;
      this.searchedValue = data?.name;
      this.learningToggle = data?.toggle ? true : false;
      if (data?.key?.total == 0 && this.searchedValue !== "") {
        this.noDataa = true;
        this.dataReceived = false;
      } else {
        this.noDataa = false;
        this.dataReceived = true;
      }
    });
  }

  ngOnInit(): void {
    this.filterComponent = {
      comp: "dataSets",
    };
    // this.getData();
  }

  // ngOnChanges(changes: SimpleChange) {
  //   // console.log("changes===//>", changes);
  // }

  // Arrow to take at the top.
  getToTop() {
    let element = document.getElementById("top");
    element.scrollIntoView();
  }

  // Arrow will blink for 5 sec.
  startBlinking() {
    this.isBlinking = true;

    // Remove the 'blinker' class after 5 seconds
    setTimeout(() => {
      this.isBlinking = false;
    }, 5000);
  }

  // This method will be triggered when clearEvent is emitted from the child
  clearEvent() {
    this.isChecked = false;
  }

  // Function of app-filter-component.
  filterData(e) {
    // console.log("filter -----> ", e);
    this.year = e?.value?.year ?? "2020-21";
    this.type = e?.value?.contentType ?? "Raw Data PDF";
    this.state = e?.value?.state;
    this.ulb = e?.value?.ulb;
    this.balData = [];
    this.selectedUsersList = [];
    // this.offSet = 0;
    // this.limit = 10;
    // this.loopControl = 0;
    this.skip = 0;
    this.totalDocs = 0;
    this.getData();
    this.isChecked = false;
  }

  // API call + Load more.
  getData() {
    // console.log("Inside getData()");
    let globalName = "";
    if (this.searchedValue) { globalName = this.searchedValue }

    this.globalLoaderService.showLoader();

    // Add a dialog box: if more than 30 files are loaded.
    if (this.totalDocs >= 30) this.openSnackBar();

    // Load 10 fies.
    try {
      this._resourcesDashboardService
        .getDataSets(this.year, this.type, this.category, this.state, this.ulb, globalName, this.skip)
        .subscribe(
          (res: any) => {
            const dataLength = res.data.length;
            // Common actions
            this.totalDocs += dataLength;
            this.balData = this.balData.concat(res.data);
            this.globalLoaderService.stopLoader();
            console.log("this.skip -----------> ", this.skip)
            console.log("this.totalDocs -----------> ", this.totalDocs)

            // Conditional logic
            if (dataLength === 10) {
              this.loadMoreData = true;
              this.skip += 10;
            } else {
              this.loadMoreData = false;
            }

            return;
          },
          (err) => {
            this.globalLoaderService.stopLoader();
            console.error("Error in fetching data: ", err.message);
          }
        );
    } catch (err) {
      this.globalLoaderService.stopLoader();
    }
  }

  // Display the files.
  getReport(item: any) {
    // Download Standardized excel.
    if (item.hasOwnProperty("section") && item.section == "standardised") {
      this.selectedUsersList = []
      this.selectedUsersList.push(item);
      this.downloadStandardizedData(1)
      this.selectedUsersList = []
      return;
    }

    // View Raw PDF and Raw Excel.
    const yearSplit = Number(item.year.split('-')[0]);
    // 2015-16 to 2018-19.
    if (yearSplit < 2019) {
      if (item && item['fileUrl']) {
        let target_file_url = environment.STORAGE_BASEURL + item['fileUrl'];

        if (item.type === "pdf") window.open(target_file_url, '_blank');
        if (item.type === "excel") this.fetchFile(target_file_url, item.fileName);

      } else console.error("File URL is missing or invalid.");

      return;
    }

    // 2019-20 onwards.
    this.globalLoaderService.showLoader();
    this.reportService.getReports(item._id, item.year, item.auditType).subscribe(
      (res) => {
        this.globalLoaderService.stopLoader();
        let type = 'notFound';
        if (res && res["success"]) {
          this.allReports = res["data"];
          type = res["data"][item.type].length ? item.type : 'notFound';
        }
        this.openDialog2(res["data"], type);
      },
      (error) => {
        this.globalLoaderService.stopLoader();
        console.log(error);
      }
    );
  }

  // Dialog box which has all 6 files in popup.
  openDialog2(data: any, fileType: string) {
    const dialogRef = this.dialog.open(BalanceTabledialogComponent, {
      data: { reportList: data, fileType: fileType },
      width: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  // Dialog box more than 30 files are loaded.
  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  // Helper: Fetch file from URL -> Create blob -> download file.
  fetchFile(target_file_url: string, fileName: string) {
    fetch(target_file_url)
      .then((response) => {
        if (!response.ok) { throw new Error("Response was not ok.") }
        return response.blob();
      })
      .then((blob) => { FileSaver.saveAs(blob, fileName); })
      .catch((error) => console.error("Error in fetching file: ", error));
  }

  // Function to check/ uncheck ulb file from the table.
  toggleRowSelection(event: any, ulbfromRow: any, i: number) {
    // console.log("event --->", event);
    // console.log("row --->", ulbfromRow);
    // console.log("i --->", i);
    if (event.checked) {
      this.selectedUsersList.push(ulbfromRow);
      this.checkValue = true;
      ulbfromRow.isSelected = true;
    } else {
      let index = this.selectedUsersList.indexOf(ulbfromRow);
      this.selectedUsersList.splice(index, 1);
      ulbfromRow.isSelected = false;
    }

    // console.log("list from toggleRowSection()", this.selectedUsersList);
    this.checkIsDisabled(this.selectedUsersList);
  }

  // Function to mantain list of only 5 ULBs - Download file.
  checkIsDisabled(selectedList: any[]) {
    // if (selectedList.length === 5) {
    //   this.balData.forEach((elem) => {
    //     if (!selectedList.includes(elem)) {
    //       elem.isDisabled = true;
    //     }
    //   });
    //   console.log("from if 5", this.balData);
    // }
    // if (selectedList.length === 4) {
    //   this.balData.forEach((elem) => {
    //     elem.isDisabled = false;
    //   });
    //   console.log("from if 4", this.balData);
    // }
    // console.log("from if", this.balData);

    const selectedLength = selectedList.length;

    // Only run logic if selectedList.length is < 5
    if (selectedLength <= 5) {
      this.balData.forEach((elem) => {
        // Disable if length is 5 and elem is not selected
        elem.isDisabled = selectedLength === 5 && !selectedList.includes(elem);
      });
    }
  }

  async masterToggle(event: any) {
    // Reset/ uncheck using master toggle.
    if (!event.checked) {
      this.selectedUsersList = [];
      this.balData.forEach((val) => {
        val.isDisabled = false;
        val.isSelected = false;
      });
      // this.isChecked = false;
      return;
    }
    // If master toggle is clicked add starting unselected ulbs in selectedUsersList[] untill [] len = 5
    else if (event.checked) {
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

  // Download standardized data - API will give excel.
  downloadStandardizedData(event: any) {
    if (event) {
      // console.log("this.selectedUsersList ---> ", this.selectedUsersList);
      for (let data of this.selectedUsersList) {
        if (data.hasOwnProperty('section') && data['section'] == "standardised") {
          // console.log("data --->", data);
          this._resourcesDashboardService.getStandardizedExcel([data]).subscribe((res) => {
            const blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            FileSaver.saveAs(blob, data.fileName);
            console.log('File Download Done');
            return;
          }, (error) => { console.error("Unable to downalod standardized file: ", error) });

          data.isSelected = false;
        }
      }
      this.selectedUsersList = [];
    }
  }

  // Download Raw pdf and raw excel.
  download(event: any) {
    if (event) {
      // console.log("event:.", event)
      // console.log("from download: ", this.selectedUsersList);

      // If selectedUsersList[0] is standardized - call downloadStandardizedData(). selectedUsersList[] has selected ulbs.
      if (
        this.selectedUsersList.length &&
        this.selectedUsersList[0].hasOwnProperty("section") &&
        this.selectedUsersList[0].section == "standardised"
      ) {
        this.downloadStandardizedData(true);
        this.isChecked = false;
        return;
      }

      for (let data of this.selectedUsersList) {

        // For docs which have file.url i.e 2015-16 to 2018-19 (Raw excel, Raw pdf)
        if (data?.fileUrl) {
          let target_file_url = environment.STORAGE_BASEURL + data['fileUrl'];;

          // Fetch the file from URL.
          this.fetchFile(target_file_url, data.fileName);
          this.selectedUsersList = [];
          data.isSelected = false;
          this.isChecked = false;
        }
        else {
          // console.log("inside else")
          // console.log("from download: ", this.selectedUsersList);

        }
      }
    }
  }


  // openNewTab(data, fullData) {
  //   console.log('full data', fullData, this.category);

  //   console.log("file data", data);
  //   this.openDialog(data)
  //   // window.open(data, "_blank");
  //   // window.open(data?.fileUrl, "_blank");
  //   // const pdfUrl = data?.fileUrl;
  //   // const pdfName = data?.fileName;
  //   // FileSaver.saveAs(pdfUrl, pdfName);

  //   // return url;
  //   // window.open(url, '_blank');
  // }
  noData = false;



  // loadMore() {
  //   console.log(this.limit);
  //   if (this.loopControl > this.tempBalData?.length) {
  //     this.isloadMore = false;
  //     return;
  //   } else {
  //     this.limit = this.limit + 10;
  //     this.offSet = this.balData.length;
  //     this.isloadMore = true;
  //     this.loopControl = this.limit;
  //   }
  //   for (this.offSet; this.offSet < this.loopControl; this.offSet++) {
  //     console.log("this.offSet", this.offSet);
  //     this.balData.push(this.tempBalData[this.offSet]);
  //   }
  //   if (this.loopControl == this.tempBalData?.length) {
  //     this.isloadMore = false;
  //   }
  //   this.initialValue = this.initialValue + 10;

  // }

  // sliceData() {
  //   this.balData = this.balData.slice(0, this.initialValue);
  //   console.log(this.balData);
  //   return this.balData;
  // }


  // getData() {
  //   console.log("getData");
  //   let globalName = "";
  //   if (this.searchedValue) { globalName = this.searchedValue }

  //   this.globalLoaderService.showLoader();

  //   try {
  //     this._resourcesDashboardService
  //       .getDataSets(this.year, this.type, this.category, this.state, this.ulb, globalName)
  //       .subscribe(
  //         (res: any) => {
  //           console.log("datasets api res ---> ", this.balData, res);
  //           // this.balData = res["data"];
  //           if (res.data.length == 0) {
  //             this.noData = true;
  //             this.balData = []
  //             this.isloadMore = false;
  //             this.globalLoaderService.stopLoader();
  //           } else if (res.data.length !== 0) {
  //             this.tempBalData = res.data;
  //             console.log("tempBalData", this.tempBalData)
  //             if (this.tempBalData.length < 10) {
  //               this.isloadMore = false;
  //             }
  //             let limitVal = this.offSet + this.limit;
  //             if (this.tempBalData.length > limitVal) {
  //               this.loopControl = limitVal;
  //               this.isloadMore = true;
  //             } else {
  //               this.loopControl = this.tempBalData.length
  //             }
  //             console.log("loopControl==>", this.loopControl)
  //             this.balData = []
  //             for (let i = 0; i < this.loopControl; i++) {
  //               const element = this.tempBalData[i];
  //               // console.log("element==>", element)
  //               this.balData.push(element);
  //             }
  //             console.log("finalBalData", this.balData)

  //             this.balData = this.balData.map((elem) => {
  //               let target = { isDisabled: false, isSelected: false };
  //               return Object.assign(target, elem);
  //             });

  //             this.globalLoaderService.stopLoader();
  //             this.noData = false;
  //           }
  //         },
  //         (err) => {
  //           this.globalLoaderService.stopLoader();
  //           console.log(err.message);
  //         }
  //       );
  //   } catch (err) {
  //     this.globalLoaderService.stopLoader();
  //   }
  // }
  balData = [];
  allSelected = false;
  unSelect = false;
  selectedUsersList = [];
  state;
  ulb;



  // isAllSelected(All: boolean = false) {
  //   // if (All) {
  //   //   const numSelected = this.selectedUsersList.length;
  //   //   const numRows = this.balData.length;
  //   //   return numSelected === numRows;
  //   // } else {
  //   //   return !!this.selectedUsersList.length;
  //   // }
  // }


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
  // download(event) {

  //   if (event) {
  //     console.log(this.selectedUsersList);
  //     for (let data of this.selectedUsersList) {
  //       if (data.hasOwnProperty('section') && data['section'] == "standardised") {
  //         console.log("data --->", data);
  //         this._resourcesDashboardService.getStandardizedExcel([data]).subscribe((res) => {
  //           const blob = new Blob([res], {
  //             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //           });
  //           FileSaver.saveAs(blob, data.fileName);
  //           console.log('File Download Done')
  //           return
  //         }, (err) => {
  //           console.log(err)
  //         })
  //       } else {
  //         let pdfUrl = data?.fileUrl;
  //         let pdfName = data?.fileName;
  //         if (data?.fileUrl?.length > 0) {
  //           for (let file of data?.fileUrl) {
  //             pdfUrl = this.storageBaseUrl + file;
  //             FileSaver.saveAs(pdfUrl, pdfName);
  //           }
  //         } else {
  //           FileSaver.saveAs(pdfUrl, pdfName);
  //         }


  //       }

  //     }
  //   }
  // }




  // openDialog(data): void {
  //   data = data.filter(entity => entity);
  //   const dialogRef = this.dialog.open(FileOpenComponent, {
  //     width: "60vw",
  //     maxHeight: "95vh",
  //     height: "fit-content",
  //     data: {
  //       fileUrl: data,
  //       category: this.category
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     // this.animal = result;
  //   });
  // }

  checkDownloadButton() {
    if (!this.checkValue) {
      this.downloadValue = false;
    } else {
      this.downloadValue = true;
    }
  }

  id(id: any, selectedYear: string) {
    throw new Error("Method not implemented.");
  }
}

// Snackbar Component.
@Component({
  selector: 'snack-bar-component-example-snack',
  template: `
    <span class="snack-bar">Looking for something? Try using filters!</span>`,
  styles: [`
    ::ng-deep .mat-snack-bar-container {
        background-color: #fff0e3;
        color: #e87a1c;
        border: 1px solid #8080804d;
        border-radius: 6px;
        font-family: "Archivo";
    }`],
})
export class SnackBarComponent { }


// // // dialog box --------for file open
// import { Inject } from '@angular/core';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// @Component({
//   selector: 'file-open-dialog',
//   templateUrl: "./file-open.component.html",
//   styleUrls: ["./data-sets.component.css"],
// })
// export class FileOpenComponent implements OnInit {
//   constructor(
//     public dialogRef: MatDialogRef<FileOpenComponent>,
//     @Inject(MAT_DIALOG_DATA) public dialogFiledata,
//   ) { }
//   fileArr = [];
//   ngOnInit(): void {
//     // this.getData();
//     console.log('dialogFiledata', this.dialogFiledata);
//     this.fileArr = [];
//     for (let i = 0; i < this.dialogFiledata?.fileUrl?.length; i++) {
//       if (this.dialogFiledata?.category == 'income') {
//         let name = ''
//         if (i == 0) {
//           name = 'Income Expenditure'
//         } else if (i == 1) {
//           name = 'Income Expenditure Schedule'
//         }
//         let obj = {
//           url: this.dialogFiledata?.fileUrl[i],
//           fileName: name
//         }
//         this.fileArr[i] = obj;
//       }
//       if (this.dialogFiledata?.category == 'balance') {
//         let name = ''
//         if (i == 0) {
//           name = 'Balance Sheet'
//         } else if (i == 1) {
//           name = 'Balance Sheet Schedule'
//         }
//         let obj = {
//           url: this.dialogFiledata?.fileUrl[i],
//           fileName: name
//         }
//         this.fileArr[i] = obj;
//       }
//     }
//     console.log('this.fileArr', this.fileArr);

//   }
//   onNoClick(): void {
//     console.log('dialogFiledata', this.dialogFiledata);
//     this.dialogRef.close();
//   }
// }
