import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import * as FileSaver from "file-saver";
import { forkJoin } from "rxjs";
import { take, tap } from 'rxjs/operators';
import { IState } from "src/app/models/state/state";
import { BalanceTabledialogComponent } from "src/app/shared/components/balance-table/balance-tabledialog/balance-tabledialog.component";
import { DownloadUserInfoService } from "src/app/shared/components/user-info-dialog/download-user-info.service";
import { CommonService } from "src/app/shared/services/common.service";
import { DownloadService } from "src/app/shared/services/download.zip.service";
import { GlobalLoaderService } from "src/app/shared/services/loaders/global-loader.service";
import { UtilityService } from "src/app/shared/services/utility.service";
import { environment } from "src/environments/environment";
import { ReportService } from "../../../dashboard/report/report.service";
import { ResourcesDashboardService } from "../resources-dashboard.service";
import { Observable } from "rxjs-compat";

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

  balData = [];
  allSelected = false;
  unSelect = false;
  selectedUsersList = [];
  state: string;
  ulb: string;
  ulbId: string;
  mobileFilterConfig: any = {
    isState: true,
    isUlb: true,
    isContentType: true,
    isYear: true,
    useFor: "resourcesDashboard",
  };
  storageBaseUrl: string = environment?.STORAGE_BASEURL;
  allReports: any;
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
  checkValue = false;
  downloadValue: boolean = false;
  auditType: string; // Default value for auditType
  skip: number = 0;
  loadMoreData: boolean = false;
  totalDocs: number = 0;
  durationInSeconds: number = 3;
  isBlinking: boolean = false;
  category: string = "balance";
  isChecked: boolean = false;
  fileDownloadSuccess: string = "All set! Your file(s) have been successfully downloaded.";
  fileDownloadfail: string = "Oops! Failed to download file(s).";
  module: string = "resources" // userInfo popup.
  // showStateBundleDiv: boolean = false;
  isStateBundleRequested: boolean = false;
  // disableForStateBundle = ["Raw Data Excel", "Standardised Excel"];
  DIGITIZED_EXCEL_TYPE: string = "Digitized Excel";

  statesList: Record<string, IState> = {};

  constructor(
    private _resourcesDashboardService: ResourcesDashboardService,
    public globalLoaderService: GlobalLoaderService,
    public dialog: MatDialog,
    protected reportService: ReportService,
    private _snackBar: MatSnackBar,
    private downloadService: DownloadService,
    private userInfoService: DownloadUserInfoService,
    private utilityService: UtilityService,
    private _commonServices: CommonService,
  ) {
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
    this.loadStates();
  }

  // ngOnChanges(changes: SimpleChange) {
  //   // console.log("changes===//>", changes);
  // }

  // Arrow to take at the top.
  getToTop() {
    let element = document.getElementById("top");
    element.scrollIntoView();
  }

  // Arrow will blink.
  startBlinking() {
    this.isBlinking = true;

    // Remove the 'blinker' class after 5 seconds
    setTimeout(() => {
      this.isBlinking = false;
    }, 1000 * this.durationInSeconds);
  }

  // This method will be triggered when clearEvent is emitted from the child
  // clearEvent() {
  //   this.isChecked = false;
  // }

  // Function of app-filter-component.
  filterData(e: any) {

    this.year = e?.value?.year;
    this.type = e?.value?.contentType;
    this.state = e?.value?.state;
    this.ulb = e?.value?.ulb?.name || '';
    this.ulbId = e?.value?.ulb?._id || '';

    // if (this.state) this.showStateBundleDiv = true;
    // else {
    //   this.showStateBundleDiv = false;
    //   this.isStateBundleRequested = false;
    // }
    this.auditType = e?.value?.auditType; // Default to 'unAudited' if not provided
    this.balData = [];
    this.selectedUsersList = [];
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
    if (this.totalDocs >= 30) {
      this.openSnackBar("Looking for something? Try using filter(s)!");
      this.startBlinking();
    }

    // Load fies.
    try {
      const subscription = this.getUlbListSubscription(globalName);
      subscription.subscribe(
        (res: any) => {
          const dataLength = res.data.length;
          // Common actions
          this.totalDocs += dataLength;
          this.balData = this.balData.concat(res.data);
          this.globalLoaderService.stopLoader();

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
        },
      );
    } catch (err) {
      this.globalLoaderService.stopLoader();
    }
  }

  // Decide which API to call based on 'type'.
  // If type is 'Digitized Excel' -> call getDigitizedExcelList()
  private getUlbListSubscription(globalName = ''): Observable<any> {
    return this.type === this.DIGITIZED_EXCEL_TYPE
      ? this._resourcesDashboardService.getDigitizedExcelList(
          this.year,
          this.type,
          this.state,
          this.ulbId,
          this.skip,
      )
      : this._resourcesDashboardService.getDataSets(
          this.year,
          this.type,
          this.category,
          this.state,
          this.ulb,
          this.ulbId,
          globalName,
          this.skip,
          this.auditType,
        );
  }

  // Decide which API to call based on 'type'.
  // If type is 'Digitized Excel' -> call getDigitizedExcelReports()
  private getUlbDataSetSubscription(item): Observable<any> {
    return this.type === this.DIGITIZED_EXCEL_TYPE
      ? this.reportService.getDigitizedExcelReports(item._id, item.year, item.auditType, item.fileType)
      : this.reportService.getReports(item._id, item.year, item.auditType);
  }

  // Display the files.
  getReport(item: any) {
    // Download Standardized excel.
    if (item.hasOwnProperty("section") && item.section == "standardised") {
      this.selectedUsersList = []
      this.selectedUsersList.push(item);
      this.downloadStandardizedData(true)
        .then((isDownloaded) => {
          if (isDownloaded) this.openSnackBar(this.fileDownloadSuccess);
        });
      // this.selectedUsersList = [];
      return;
    }

    // View Raw PDF and Raw Excel.
    const yearSplit = Number(item.year.split('-')[0]);
    // 2015-16 to 2018-19.
    if (yearSplit < 2019 || item.section === "budgetPdf") {
      if (item['fileUrl']) {
        let target_file_url = environment.STORAGE_BASEURL + item['fileUrl'];

        if (item.type === "pdf") {
          // User info popup.
          this.userInfoService.openUserInfoDialog([{ fileName: `${item['fileName']}_${this.type}` }], this.module)
            .then((isDialogConfirmed) => {
              if (isDialogConfirmed) window.open(target_file_url, '_blank');
            });
        }

        // User info popup for excel is handled in fetchFile()
        if (item.type == 'excel')
          this.fetchFile(target_file_url, item.fileName);

      } else console.error("File URL is missing or invalid.");

      return;
    }

    // 2019-20 onwards.
    // If type is Digitized Excel get data from AFS Digitization Project.
    this.globalLoaderService.showLoader();
    const subscription = this.getUlbDataSetSubscription(item);
    subscription.subscribe(
      (res) => {
        this.globalLoaderService.stopLoader();
        let type = 'notFound';
        if (res["success"]) {
          this.allReports = res["data"];
          type = res["data"][item.type].length ? item.type : 'notFound';
        }

        this.openDialog2(res["data"], type, { fileName: item.fileName, type: this.type, module: this.module });
      },
      (error) => {
        this.globalLoaderService.stopLoader();
        console.error("Failed to getReport():", error);
      }
    );
  }

  // Dialog box which has all 6 files in popup.
  openDialog2(data: any, fileType: string, ulbDetails: any) {
    const dialogRef = this.dialog.open(BalanceTabledialogComponent, {
      data: { reportList: data, fileType, ulbDetails },
      width: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  // Dialog box more than 30 files are loaded.
  openSnackBar(text: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { text }
    });
  }

  // Helper: Fetch file from URL -> Create blob -> download file.
  fetchFile(target_file_url: string, fileName: string) {
    // User info popup
    this.userInfoService.openUserInfoDialog([{ fileName: `${fileName}_${this.type}` }], this.module)
      .then((isDialogConfirmed) => {
        if (isDialogConfirmed) {
          this.utilityService.fetchAndSaveFile(target_file_url, fileName);
        }
      });
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

  // Function to uncheck all the items.
  uncheckSelections() {
    if (this.balData.length) {
      this.balData.forEach((ele: any) => {
        ele.isSelected = false;
        ele.isDisabled = false;
      });
    }
    this.selectedUsersList = [];
    this.isChecked = false;
  }

  // Function to mantain list of only 5 ULBs - Download file.
  checkIsDisabled(selectedList: any[]) {
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
      this.uncheckSelections();

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
  downloadStandardizedData(event: any): Promise<boolean> {
    return new Promise((resolve) => {
      if (event) {
        const userInfoFiles = this.selectedUsersList.map((e) => { return { 'fileName': `${e.fileName}_${this.type}` } });

        // User info popup.
        this.userInfoService.openUserInfoDialog(userInfoFiles, this.module)
          .then((isDialogConfirmed) => {
            if (isDialogConfirmed) {

              for (let data of this.selectedUsersList) {
                if (data.hasOwnProperty('section') && data['section'] == "standardised") {
                  this._resourcesDashboardService.getStandardizedExcel([data]).subscribe(
                    (res) => {
                      const blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                      FileSaver.saveAs(blob, data.fileName);

                      resolve(true);
                    },
                    (error) => { console.error("Unable to downalod standardized file: ", error); resolve(false); });

                  data.isSelected = false;
                }
              }
              this.uncheckSelections();
            }
          });
      }
    });
  }

  download(event: any) {

    if (event) {
      let section = null;
      if (this.selectedUsersList.length && this.selectedUsersList[0].hasOwnProperty("section")) {
        section = this.selectedUsersList[0].section;
      }

      // Standardized files.
      if (section === 'standardised') {
        this.downloadStandardizedData(true)
          .then((isDownloaded) => {
            if (isDownloaded) this.openSnackBar(this.fileDownloadSuccess);
          });
        this.isChecked = false;
        return;
      }

      // For docs which have file.url i.e 2015-16 to 2018-19 (Raw excel, Raw pdf) + Budget PDF.
      if (['2015-16', '2016-17', '2017-18', '2018-19'].includes(this.year) || section === 'budgetPdf') {
        const userInfoFiles = this.selectedUsersList.map((e) => { return { 'fileName': `${e.fileName}_${this.type}` } });

        // User info popup.
        this.userInfoService.openUserInfoDialog(userInfoFiles, this.module)
          .then((isDialogConfirmed) => {
            if (isDialogConfirmed) {

              for (let data of this.selectedUsersList) {
                if (data['fileUrl']) {
                  let target_file_url = environment.STORAGE_BASEURL + data['fileUrl'];

                  // Fetch the file from URL.
                  this.utilityService.fetchAndSaveFile(target_file_url, data.fileName);
                  data.isSelected = false;
                  this.isChecked = false;
                }
              }

              this.uncheckSelections();
            }
          });
      }

      // 2019-20 onwards.
      else {
        const fetchData = (data: any) => this.reportService.getReports(data._id, data.year, data.auditType);
        const userInfoFiles = this.selectedUsersList.map((e) => { return { 'fileName': `${e.fileName}.zip_${this.type}` } });

        // User info popup.
        this.userInfoService.openUserInfoDialog(userInfoFiles, this.module)
          .then((isDialogConfirmed) => {
            if (isDialogConfirmed) {

              forkJoin(this.selectedUsersList.map(row => fetchData(row)))
                .subscribe(result => {
                  result.forEach((res, i) => {
                    const currentData: any = this.selectedUsersList[i];
                    const files = res['data'][currentData['type']].map((e: any) => { return { name: e.name, url: environment.STORAGE_BASEURL + e.url } });

                    this.createZipAndSave(userInfoFiles[i].fileName + '.zip', files);
                  });

                  this.uncheckSelections();
                });
            }
          });
      }
    }
  }

  // Helper: to create zip files
  createZipAndSave(fileName: string, files: any) {
    const download$ = this.downloadService.downloadMultiple(files).pipe(tap({
      next: (data) => {
        // console.log('download$ next: ', data);
      },
      complete: () => {
        this.openSnackBar(this.fileDownloadSuccess);
        // console.log('download$ complete: ');
      },
      error: (error) => {
        console.error('download$ error: ', error);
        this.openSnackBar(this.fileDownloadfail);
        this.uncheckSelections();
        return;
      }
    }));

    const zip$ = this.downloadService.zipMultiple(download$);

    zip$
      .pipe().subscribe({
        next: (data) => {
          // console.log('zip$ next: ', data);

          if (data.zipFile) {
            const downloadAncher = document.createElement("a");
            downloadAncher.style.display = "none";
            downloadAncher.href = URL.createObjectURL(data.zipFile);
            downloadAncher.download = fileName;
            downloadAncher.click();
          }
        },
        complete: () => {
          // this.uncheckSelections();
        },
        error: (error) => {
          console.error('zip$ error: ', error);
          this.openSnackBar(this.fileDownloadfail);
          this.uncheckSelections();
          return;
        }
      });

    return;
  }

  isStateBundleRequestedOutput($event: boolean) {
    this.isStateBundleRequested = $event;
  }

  // Load States.
  private loadStates(): void {
    this._commonServices
      .fetchStateList()
      .pipe(take(1))
      .subscribe({
        next: (res: IState[]) => {
          res.map((state: IState) => {
            if (!(state._id in this.statesList)) {
              this.statesList[state._id] = state;
            }
          });
        },
        error: (error) => { console.error('Error in loadStates(): ', error.message) },
      });
  }

  // User is interested to create state bundle - Email is not yet clicked - Has option to dismiss.
  // createStateBundle() {
  //   // Simulate api call - remove setTimout - add api
  //   this.globalLoaderService.showLoader();
  //   setTimeout(() => {
  //     this.isStateBundleRequested = true;
  //     this.globalLoaderService.stopLoader();
  //   }, 1500);
  //   if (this.disableForStateBundle.includes(this.type)) {
  //     this.openSnackBar('Please choose valid data format!')
  //     return;
  //   }
  // }

  // User requested to create state bundle - Email files is clicked.
  // sendStateBundle() {
  //   const email = '';

  //   // User info popup.
  //   const state = this.statesList[this.state]?.name || this.state;
  //   this.userInfoService.openUserInfoDialog([{ fileName: `bulkDownload_${state}_${this.type}` }], this.module)
  //     .then((isDialogConfirmed) => {
  //       if (isDialogConfirmed) {
  //         this.globalLoaderService.showLoader();

  //         this._resourcesDashboardService.initiateStateBundleZipDownload(
  //           this.state,
  //           this.year,
  //           this.ulbId,
  //           this.type,
  //           'audited',
  //           email,
  //         ).subscribe({
  //           next: (res) => {
  //             console.log("response: ", res);
  //             this.openSnackBar('A download link will be sent to your email shortly!');
  //             this.globalLoaderService.stopLoader()
  //           },
  //           error: (error) => {
  //             this.openSnackBar('Failed to initiate the download process!');
  //             console.error("Error: ", error);
  //             this.globalLoaderService.stopLoader()
  //           }
  //         })

  //         // setTimeout(() => {
  //         //   console.log("Email the link!");
  //         //   this.openSnackBar('A download link will be sent to your email shortly!');
  //         //   this.globalLoaderService.stopLoader()
  //         // }, 2000);
  //       }
  //     });
  // }

  // // Dismiss state bundle.
  // dismissStateBundle() {
  //   this.isStateBundleRequested = false;
  //   this.showStateBundleDiv = false;
  // }

  // TODO: Remove below code if not used.
  noData = false;
  disabledValue = false;

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
  selector: 'snack-bar-component',
  template: `
    <span>{{data.text}}</span>`,
  styles: [`
    ::ng-deep .mat-snack-bar-container {
        background-color: #fff0e3;
        color: #e87a1c;
        border: 1px solid #8080804d;
        border-radius: 6px;
        font-family: "Archivo";
    }`],
})
export class SnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }  // Inject 'data'
}