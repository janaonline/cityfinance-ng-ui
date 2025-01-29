import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import * as FileSaver from "file-saver";
import { tap } from 'rxjs/operators';
import { BalanceTabledialogComponent } from "src/app/shared/components/balance-table/balance-tabledialog/balance-tabledialog.component";
import { DownloadUserInfoService } from "src/app/shared/components/user-info-dialog/download-user-info.service";
import { DownloadService } from "src/app/shared/services/download.zip.service";
import { GlobalLoaderService } from "src/app/shared/services/loaders/global-loader.service";
import { environment } from "src/environments/environment";
import { ReportService } from "../../../dashboard/report/report.service";
import { ResourcesDashboardService } from "../resources-dashboard.service";
import { UtilityService } from "src/app/shared/services/utility.service";

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
  mobileFilterConfig: any = {
    isState: true,
    isUlb: true,
    isContentType: true,
    isYear: true,
    useFor: "resourcesDashboard"
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


  constructor(
    private _resourcesDashboardService: ResourcesDashboardService,
    public globalLoaderService: GlobalLoaderService,
    public dialog: MatDialog,
    protected reportService: ReportService,
    private _snackBar: MatSnackBar,
    private downloadService: DownloadService,
    private userInfoService: DownloadUserInfoService,
    private utilityService: UtilityService
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
  clearEvent() {
    this.isChecked = false;
  }

  // Function of app-filter-component.
  filterData(e: any) {
    // console.log("filter -----> ", e);
    this.year = e?.value?.year ?? "2020-21";
    this.type = e?.value?.contentType ?? "Raw Data PDF";
    this.state = e?.value?.state;
    this.ulb = e?.value?.ulb;
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
      this._resourcesDashboardService
        .getDataSets(this.year, this.type, this.category, this.state, this.ulb, globalName, this.skip)
        .subscribe(
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
      this.downloadStandardizedData(true)
        .then((isDownloaded) => {
          if (isDownloaded) this.openSnackBar(this.fileDownloadSuccess);
        });
      this.selectedUsersList = [];
      return;
    }

    // View Raw PDF and Raw Excel.
    const yearSplit = Number(item.year.split('-')[0]);
    // 2015-16 to 2018-19.
    if (yearSplit < 2019) {
      if (item['fileUrl']) {
        let target_file_url = environment.STORAGE_BASEURL + item['fileUrl'];

        if (item.type === "pdf") {
          // User info popup.
          this.userInfoService.openUserInfoDialog(`${item['fileName']}_${this.type}`, this.module)
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
    this.globalLoaderService.showLoader();
    this.reportService.getReports(item._id, item.year, item.auditType).subscribe(

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
    this.userInfoService.openUserInfoDialog(`${fileName}_${this.type}`, this.module)
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
        // console.log("this.selectedUsersList ---> ", this.selectedUsersList);
        for (let data of this.selectedUsersList) {
          if (data.hasOwnProperty('section') && data['section'] == "standardised") {
            this._resourcesDashboardService.getStandardizedExcel([data]).subscribe((res) => {

              // User info popup.
              this.userInfoService.openUserInfoDialog(`${data.fileName}_${this.type}`, this.module)
                .then((isDialogConfirmed) => {

                  if (isDialogConfirmed) {
                    const blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    FileSaver.saveAs(blob, data.fileName);

                    resolve(true);
                  }

                });
            }, (error) => { console.error("Unable to downalod standardized file: ", error); resolve(false); });

            data.isSelected = false;
          }
        }
        this.selectedUsersList = [];
      }
    });
  }

  // Download Raw pdf and raw excel.
  download(event: any) {
    if (event) {

      if (
        this.selectedUsersList.length &&
        this.selectedUsersList[0].hasOwnProperty("section") &&
        this.selectedUsersList[0].section == "standardised"
      ) {
        this.downloadStandardizedData(true)
          .then((isDownloaded) => {
            if (isDownloaded) this.openSnackBar(this.fileDownloadSuccess);
          });
        this.isChecked = false;
        return;
      }

      for (let data of this.selectedUsersList) {

        // For docs which have file.url i.e 2015-16 to 2018-19 (Raw excel, Raw pdf)
        if (data['fileUrl']) {
          let target_file_url = environment.STORAGE_BASEURL + data['fileUrl'];

          // Fetch the file from URL.
          this.fetchFile(target_file_url, data.fileName);
          this.selectedUsersList = [];
          data.isSelected = false;
          this.isChecked = false;
        }
        else {
          // console.log("from download: ", this.selectedUsersList);
          let response = { pdf: [], excel: [] };
          let files = [];

          this.reportService.getReports(data._id, data.year, data.auditType).subscribe(
            (res) => {
              // this.globalLoaderService.stopLoader();
              let type = 'notFound';
              if (res && res["success"]) {
                response = res["data"];
              }
              // console.log("response ----------->", response)
              if (data.type === "pdf") files = response?.pdf || [];
              if (data.type === "excel") files = response?.excel || [];

              files.forEach((ele) => {
                let temp = ele.url;
                ele.name = ele.name + '.' + temp.split(".")[1];
                ele.url = environment.STORAGE_BASEURL + ele['url'];

                // // TODO: To be removed: only for testing.
                // if (data.type === "pdf") ele.url = 'https://jana-cityfinance-live.s3.ap-south-1.amazonaws.com/ULB/2024-25/annual_accounts/AP016/BalanceSheet-2023-24_5440cf6a-6ff0-45b0-ba09-013227a5a90a.pdf';
                // if (data.type === "excel") ele.url = "https://jana-cityfinance-live.s3.ap-south-1.amazonaws.com/ULB/2024-25/annual_accounts/AP016/BalanceSheet_2023-24_0715e2c2-8591-4ef0-80ce-e68ea2c9e9cf.xls";

              })

              // console.log("files ---->", files)
              this.createZipAndSave(`${data.fileName}.zip`, files);
            },
            (error) => {
              // this.globalLoaderService.stopLoader();
              console.error("Found error in download(): ", error);
              this.openSnackBar(this.fileDownloadfail);
              this.uncheckSelections();
              return;
            },
          );
        }
      }

      // this.openSnackBar(this.fileDownloadSuccess);
      this.uncheckSelections();
    }
  }

  // Helper: to create zip files
  createZipAndSave(fileName: string, files: any) {
    // User info popup.
    this.userInfoService.openUserInfoDialog(`${fileName}_${this.type}`, this.module)
      .then((isDialogConfirmed) => {
        if (isDialogConfirmed) {

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


          // const zip = new JSZip();

          // files.forEach((file: any) => {
          //   let target_file_url = environment.STORAGE_BASEURL + file['url'];;
          //   let blobResponse: any = this.fetchFile(target_file_url, file.name, true);
          //   zip.file(file.name, blobResponse);
          // });

          // zip.generateAsync({ type: 'blob' }).then((blob: any) => {
          //   FileSaver.saveAs(blob, fileName);
          // });
        }
      });

    return;
  }

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