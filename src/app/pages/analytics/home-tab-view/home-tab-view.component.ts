import 'chartjs-plugin-labels';

import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin, Observable, Subject } from 'rxjs';
import { debounceTime, delay, map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { AnalyticsTabs, IAnalyticsTabs } from 'src/app/shared/components/home-header/tabs';

import { IDialogConfiguration } from '../../../../app/shared/components/dialog/models/dialogConfiguration';
import { IStateWithULBS } from '../../../../app/shared/components/re-useable-heat-map/models/stateWithULBS';
import { IStateULBCovered, IStateULBCoveredResponse } from '../../../../app/shared/models/stateUlbConvered';
import { IULBWithPopulationResponse, ULBWithMapData } from '../../../../app/shared/models/ulbsForMapResponse';
import { CommonService } from '../../../../app/shared/services/common.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { ModalTableHeader, modalTableHeaders, tableHeaders } from '../../../shared/components/home-header/tableHeaders';
import { DashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { TableDownloader } from '../../../shared/util/tableDownload/genericTableDownload';
import { TableDowloadOptions } from '../../../shared/util/tableDownload/models/options';

// import 'chartjs-plugin-title-click';

@Component({
  selector: "app-home-tab-view",
  templateUrl: "./home-tab-view.component.html",
  styleUrls: ["./home-tab-view.component.scss"],
})
export class HomeTabViewComponent implements OnInit {
  tabIndex: any = 0;
  yearLookup = [
    { id: "2015-16", itemName: "2015-16" },
    { id: "2016-17", itemName: "2016-17" },
    // {id: '2017-18', itemName: '2017-18'}
  ];
  yearsDropdownSettings = {
    text: "Select Years",
    primaryKey: "id",
    badgeShowLimit: 1,
  };

  commonTableHeaders: any[] = tableHeaders[0];
  tabData: any[] = [];
  selectedState: any = {};
  commonTableData = [];
  commonTableDataDisplay = [];
  yearForm: FormGroup;
  ulbFilterControl = new FormControl();
  selectedYears: any = [];
  modalRef: BsModalRef;
  modalTableHeaders: ModalTableHeader[] = modalTableHeaders[0];
  modalTableData: {
    populationCategory: string;
    year: string;
    data: any[];
  };
  loading = false;
  singleULBView = false;
  selectedUlb: string;

  apiCanceller = new Subject();

  stateData: IStateULBCovered[];
  allULBSList: IULBWithPopulationResponse["data"];
  stateAndULBDataMerged: {
    [stateId: string]: IStateWithULBS;
  };

  filteredULBStateAndULBDataMerged: {
    [stateId: string]: IStateWithULBS;
  };

  ulbsOfSelectedState: IULBWithPopulationResponse["data"];
  ulbListForAutoCompletion: IULBWithPopulationResponse["data"];

  defaultDailogConfiuration: IDialogConfiguration = {
    message: "You need to be Login to download the data.",
    buttons: {
      confirm: {
        text: "Proceed to Login",
        callback: () => {
          this.router.navigate(["/", "login"]);
        },
      },
      cancel: { text: "Cancel" },
    },
  };

  isMapProcessingCompleted = true;
  object = Object;

  setMapProcessingState(value: boolean) {
    this.isMapProcessingCompleted = value;
  }

  tabIndexChangeHandler(event): void {
    this.setMapProcessingState(false);
    this.tabIndex = event;
    this.singleULBView = false;
    this.selectedUlb = "";
    this.loading = true;
    this.selectedState = null;
    this.updateULBDropdownList({});

    // if (!this.tabData[event] && this.selectedState.length > 0) {
    // this.selectedState = {};
    // this.fetchData();
    // // } else {
    // this.loading = true;
    // if (Chart.instances) {
    //   Chart.instances = {};
    // }
  }
  onTabChangeAnimationComplete() {
    this.loading = true;
    if (Chart.instances) {
      Chart.instances = {};
    }
    this.selectedState = {};
    this.fetchData();
  }

  constructor(
    protected formBuilder: FormBuilder,
    protected dashboardService: DashboardService,
    public modalService: BsModalService,
    protected _commonService: CommonService,
    protected _snacbar: MatSnackBar,
    private _dialog: MatDialog,
    protected _authService: AuthService,
    protected router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.yearForm = formBuilder.group({
      years: [[this.yearLookup[1]]],
    });
    this.selectedYears = [this.yearLookup[1].id];
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(
      (param: { tab: IAnalyticsTabs["url"] }) => {
        const tabFound = Object.values(AnalyticsTabs).find(
          (tab) => tab.url === this.router.url.split("?")[0]
        );
        if (!tabFound) {
          this.router.navigate(["/home"]);
          return;
        }
        this.tabIndex = tabFound.id;
        this.fetchData();
        this.initiatedDropdownDataFetchingProcess().subscribe((res) => {});
        this.ulbFilterControl.valueChanges
          .pipe(debounceTime(100))
          .subscribe((textToSearch) => {
            this.updateULBDropdownList({
              ulbName: textToSearch,
              stateId: this.selectedState ? this.selectedState._id : null,
            });
          });
      }
    );
  }

  private filterMergedStateDataBy(options: {
    ulbName?: string;
    stateId?: string;
  }) {
    let filteredULBAndState: {
      [stateId: string]: IStateULBCovered & {
        ulbs: ULBWithMapData[];
      };
    };

    if (options.stateId) {
      if (this.stateAndULBDataMerged[options.stateId].ulbs.length) {
        filteredULBAndState = {
          [options.stateId]: { ...this.stateAndULBDataMerged[options.stateId] },
        };
      }
    }

    if (options.ulbName && !options.ulbName.trim()) {
      filteredULBAndState = filteredULBAndState
        ? filteredULBAndState
        : { ...this.stateAndULBDataMerged };
    } else {
      Object.keys(filteredULBAndState || this.stateAndULBDataMerged).forEach(
        (stateId) => {
          const stateFound = { ...this.stateAndULBDataMerged[stateId] };
          const ulbList = this.filteredULBBy(
            { ulbName: options.ulbName },
            stateFound.ulbs
          );
          if (!ulbList.length && !options.stateId) {
            return;
          }
          stateFound.ulbs = ulbList;
          if (!filteredULBAndState) {
            filteredULBAndState = {};
          }
          filteredULBAndState[stateId] = stateFound;
        }
      );
    }
    return this.filterOutEmptyULBStates(filteredULBAndState);
    // return filteredULBAndState;
  }

  private filteredULBBy(
    options: { ulbName?: string },
    ulbList: ULBWithMapData[]
  ) {
    let filteredULBS: ULBWithMapData[] = [];
    if (options.ulbName && options.ulbName.trim()) {
      filteredULBS = filteredULBS.concat(
        ulbList.filter((ulb) =>
          ulb.name.toLowerCase().includes(options.ulbName.toLowerCase())
        )
      );
    } else {
      filteredULBS = ulbList;
    }

    return filteredULBS;
  }

  protected initiatedDropdownDataFetchingProcess() {
    this.allULBSList = null;
    this.stateData = null;
    this.filteredULBStateAndULBDataMerged = null;
    this.stateAndULBDataMerged = null;
    const body = { year: this.selectedYears || [] };
    const subscriptions: any[] = [];
    subscriptions.push(
      this._commonService
        .getStateUlbCovered(body)
        .pipe(map((res) => this.onGettingStateULBCoveredSuccess(res)))
    );

    subscriptions.push(
      this._commonService
        .getULBSWithPopulationAndCoordinates(body)
        .pipe(map((res) => this.onGettingULBWithPopulationSuccess(res)))
    );
    return forkJoin(subscriptions);
  }

  private onGettingStateULBCoveredSuccess(res: IStateULBCoveredResponse) {
    this.stateData = res.data;
    if (this.allULBSList) {
      this.stateAndULBDataMerged = this.CombineStateAndULBData(
        this.stateData,
        this.allULBSList
      );
    }

    if (!this.filteredULBStateAndULBDataMerged && this.stateAndULBDataMerged) {
      this.filteredULBStateAndULBDataMerged = this.filterOutEmptyULBStates(
        this.stateAndULBDataMerged
      );
    }

    return res;
  }

  private onGettingULBWithPopulationSuccess(res: IULBWithPopulationResponse) {
    this.allULBSList = res.data;

    this.ulbsOfSelectedState = res.data;
    this.ulbListForAutoCompletion = res.data;
    if (this.stateData) {
      this.stateAndULBDataMerged = this.CombineStateAndULBData(
        this.stateData,
        res.data
      );
    }

    if (!this.filteredULBStateAndULBDataMerged && this.stateAndULBDataMerged) {
      this.filteredULBStateAndULBDataMerged = this.filterOutEmptyULBStates(
        this.stateAndULBDataMerged
      );
    }
    return res;
  }

  protected filterOutEmptyULBStates(data: {
    [stateId: string]: IStateULBCovered & {
      ulbs: ULBWithMapData[];
    };
  }) {
    if (!data || !Object.keys(data).length) {
      return null;
      return null;
    }

    const newObj = {};
    Object.keys(data).forEach((stateKey) => {
      if (data[stateKey].ulbs && data[stateKey].ulbs.length) {
        newObj[stateKey] = { ...data[stateKey] };
      }
    });
    return newObj;
  }

  private CombineStateAndULBData(
    states: IStateULBCovered[],
    ulbStates: ULBWithMapData[]
  ) {
    const newStateObj: {
      [stateId: string]: IStateULBCovered & { ulbs: ULBWithMapData[] };
    } = {};
    states
      .map((state) => ({
        ...state,
        ulbs: ulbStates.filter((ulb) => ulb.state === state._id),
      }))
      .forEach((merged) => (newStateObj[merged._id] = merged));

    return newStateObj;
  }

  onSelectingULBFromDropdown(ulbId: string, stateId: string) {
    this.ulbFilterControl.setValue("");
    const stateFound = this.stateAndULBDataMerged[stateId];
    this.selectedUlb = ulbId;
    this.selectedState = stateFound;
    this.updateULBDropdownList({ stateId: stateId });
    this.fetchUlBsData([ulbId]);
  }

  updateULBDropdownList(options: { ulbName?: string; stateId?: string }) {
    this.filteredULBStateAndULBDataMerged = this.filterMergedStateDataBy(
      options
    );
  }

  onDropdownSelect(event: any) {
    // this.selectedYears = [...this.selectedYears, event.id];
    this.selectedYears.push(event.id);
    //  this.filterDisplayDataTableYearWise();
  }

  private resetDropdownListToNationalLevel() {
    this.filteredULBStateAndULBDataMerged = this.filterOutEmptyULBStates(
      this.stateAndULBDataMerged
    );
  }

  handleError = (e) => {
    this.commonTableData = [];
    this.commonTableDataDisplay = [];
    this.loading = false;
  };

  resetPopupValues() {
    this.selectedYears = [];
    this.yearForm.controls["years"].setValue([]);
    // this.filterDisplayDataTableYearWise();
  }

  onDropdownDeSelect(event: any) {
    this.selectedYears.splice(
      this.selectedYears.findIndex((year) => event.id == year),
      1
    );
    // this.selectedYears = [...this.selectedYears];
    this.filterDisplayDataTableYearWise();
  }

  onDropdownClose(event: any) {
    this.tabData = [];
    this.selectedYears = [...this.selectedYears];
    if (this.selectedYears.length > 1) {
      this._dialog.open(DialogComponent, {
        width: "fit-content",
        maxWidth: "40vw",
        data: {
          message:
            "Only ULBs with data for all of the selected years will be displayed.",
        },
      });
    }
    this.commonTableDataDisplay = [];
    this.commonTableData = [];
    this.commonTableHeaders = tableHeaders[this.tabIndex].map((row) => {
      delete row["status"];
      return row;
    });
    this.loading = true;
    this.initiatedDropdownDataFetchingProcess().subscribe((res) => {
      if (this.selectedState) {
        this.updateULBDropdownList({ stateId: this.selectedState._id });

        this.fetchData();
      }
    });
  }

  fetchUlBsData(ulbIdsArray: string[]) {
    console.log(`ulbs from map `, ulbIdsArray);
    if (ulbIdsArray.length) {
      this.modalItemClicked(ulbIdsArray[ulbIdsArray.length - 1]);
    } else {
      const selectedState = { ...this.selectedState };
      this.selectedState = null;
      this.filterDataStateWise(selectedState);
    }
  }

  private filterDisplayDataTableYearWise() {
    switch (this.tabIndex) {
      case 1:
      case 2:
        this.renderCharts();
        break;
      case 3:
      case 4:
        for (const year of this.commonTableData) {
          if (year.data.length) {
            const newDataRow = this.getTotalRow(year.data);
            const yearHasPopurationTotal = !!year.data.find(
              (obj) => obj.populationCategory === "Total"
            );
            if (!yearHasPopurationTotal) {
              year.data.push(newDataRow);
            }
          }
        }
        break;
    }
  }

  fetchSingleUlbDataSuccess = (response) => {
    this.loading = false;
    const newYears = [];
    const data = response["data"];
    if (data) {
      for (const year of data) {
        try {
          const dataIndex = year.data.findIndex(
            (data) => data.ulbs && data.ulbs.length
          );
          //  if (
          //   year.data[dataIndex]["ulbs"] &&
          //   year.data[dataIndex]["ulbs"].length
          // )
          if (dataIndex > -1) {
            const newYear = {
              year: year.year,
              data: year.data[dataIndex]["ulbs"],
            };
            newYears.push(newYear);
          } else {
            const newYear = { year: year.year, data: [] };
            newYears.push(newYear);
          }
        } catch (e) {
          const newYear = { year: year.year, data: [] };
          newYears.push(newYear);
        }
      }

      this.commonTableDataDisplay = newYears;
      this.commonTableHeaders = modalTableHeaders[this.tabIndex];
      this.commonTableHeaders[0].click = false;
      if (this.modalRef) {
        this.modalRef.hide();
      }
    }
    if (this.tabIndex == 1 || this.tabIndex == 2) {
      this.renderCharts();
    }
  };

  private fetchTableDataSuccess = (response: any) => {
    this.commonTableDataDisplay = [];
    this.commonTableData = [];
    this.commonTableHeaders = tableHeaders[this.tabIndex].map((row) => {
      delete row["status"];
      return row;
    });
    if (response["success"]) {
      if (this.singleULBView) {
        this.modalItemClicked(this.selectedUlb);
      } else {
        if (response["data"]) {
          this.commonTableData = response["data"];
          this.commonTableDataDisplay = response["data"];
          if (this.commonTableDataDisplay.length) {
            this.filterDisplayDataTableYearWise();
          }
        }
      }
      this.tabData[this.tabIndex] = response;
      this.loading = false;
    }
  };

  private callAPi(callback, args) {
    callback(args);
  }

  private fetchData() {
    this.loading = true;
    this.commonTableDataDisplay = [];
    this.commonTableData = [];
    this.commonTableHeaders = tableHeaders[this.tabIndex].map((row) => {
      delete row["status"];
      return row;
    });

    switch (this.tabIndex) {
      case 0:
        this.dashboardService
          .fetchDependencyOwnRevenueData(
            JSON.stringify(this.selectedYears),
            this.selectedState._id,
            this.selectedUlb
          )
          .pipe(takeUntil(this.apiCanceller))
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;
      case 1:
        this.dashboardService
          .fetchSourceOfRevenue(
            JSON.stringify(this.selectedYears),
            this.selectedState._id
          )
          .pipe(takeUntil(this.apiCanceller))
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;
      /*   case 2:
        this.dashboardService
          .fetchFinancialRevenueExpenditure(
            JSON.stringify(this.selectedYears),
            this.selectedState._id
          )
          .pipe(takeUntil(this.apiCanceller))
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;*/
      case 2:
        this.dashboardService
          .fetchRevenueExpenditure(
            JSON.stringify(this.selectedYears),
            this.selectedState._id
          )
          .pipe(takeUntil(this.apiCanceller))
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;

      case 3:
        this.dashboardService
          .fetchCashAndBankBalance(
            JSON.stringify(this.selectedYears),
            this.selectedState._id
          )
          .pipe(takeUntil(this.apiCanceller))
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;
      case 4:
        this.dashboardService
          .fetchOutStandingDebt(
            JSON.stringify(this.selectedYears),
            this.selectedState._id
          )
          .pipe(takeUntil(this.apiCanceller))
          .subscribe(this.fetchTableDataSuccess, this.handleError);
        break;
    }
  }

  fetchCoverage() {}

  onDropDownSelectAll(event) {
    this.yearForm.controls["years"].setValue(event);
    this.selectedYears = event.map((e) => e.id);
    //  this.filterDisplayDataTableYearWise();
  }

  private renderCharts() {
    if (Chart.instances) {
      Chart.instances = {};
    }
    let dataArr = this.commonTableData;
    if (this.singleULBView) {
      dataArr = this.commonTableDataDisplay;
    }

    function prependDataColorDiv(parentNode: HTMLElement, props: any) {
      const div = document.createElement("div");
      div.style.backgroundColor = props._options.backgroundColor;
      div.style.borderColor = props._options.borderColor;
      div.style.borderWidth = props._options.borderWidth;

      div.style.width = "25px";
      // div.style.borderRadius = '50%';
      div.style.height = "25px";
      div.style.marginRight = "5px";
      div.style.display = "inline-block";
      parentNode["prepend"](div);
    }

    for (const yearRow of dataArr) {
      const elementIdPrefix = "canvas--" + yearRow.year;
      const yearWiseCharts = [];
      let legendGenerated = false;
      /* if (this.tabIndex == 4) {
         const label = yearRow.data.map(row => row['populationCategory']);
         const dataNoOfUlb = yearRow.data.map(row => row['numOfUlb']);
         const dataBankBalance = yearRow.data.map(
           row => row['cashAndBankBalance']
         );
         const elementId1 = `${elementIdPrefix}--${0}`;
         const elementBankBalance = `${elementIdPrefix}--${1}`;
         setTimeout(() => {
           this.renderPieChart({
             type: 'pie',
             data: dataNoOfUlb,
             labels: label,
             elementId: elementId1,
             chartTitle: 'No of ulb'
           });
           this.renderPieChart({
             type: 'pie',
             data: dataBankBalance,
             labels: label,
             elementId: elementBankBalance,
             chartTitle: 'Bank balance'
           });
         }, 1);
       } else {


       }*/
      for (let index = 0; index < yearRow.data.length; index++) {
        const row = yearRow.data[index];
        const elementId = `${elementIdPrefix}--${index}`;
        // let labels: any[] = Object.keys(row).filter(key => (typeof row[key] == 'number') || !isNaN(Number(row[key])));
        let labels: any[] = Object.keys(row).filter((key) => {
          if (typeof row[key] == "number" || !isNaN(Number(row[key]))) {
            return true;
          }
          // if (typeof row[key] === 'string') {
          //   if (!isNaN(row[key]).includes('%')) {
          //     return true;
          //   }
          // }
          return false;
        });
        labels = labels
          .filter(
            (label) =>
              ![
                "numOfUlb",
                "total",
                "audited",
                "auditNA",
                "unaudited",
                "population",
                "rangeNum",
                "totalUlb",
                "taxRevenue",
                "rentalIncome",
                "feesAndUserCharges",
              ].includes(label)
          )
          .map((label) => {
            const titleObj: { data?: number; name?: string } = {};
            try {
              titleObj.name = this.commonTableHeaders.find(
                (header) => header.id == label
              ).title;
              if (typeof row[label] === "string") {
                try {
                  titleObj.data = Number(row[label].replace("%", "")) || 0;
                } catch (e) {}
              } else {
                titleObj.data = row[label];
              }
            } catch (e) {
              console.error(e, row, label);
              return {
                name: "Label not available",
                data: Number(row[label].replace("%", "")) || 0,
              };
            }
            return titleObj;
          });
        const data = labels.map((l) => l.data);
        const chartLabels = labels.map((l) => l.name);
        const chartTitle = row[this.commonTableHeaders[0].id];
        setTimeout(() => {
          const c = this.renderPieChart({
            type: "pie",
            data,
            labels: chartLabels,
            elementId,
            chartTitle,
            legend: false,
            options: {
              plugins: {
                labels: {
                  position: "border",
                  fontColor: (data) => {
                    if (data.dataset.backgroundColor[data.index]) {
                      const rgb = this.hexToRgb(
                        data.dataset.backgroundColor[data.index]
                      );
                      const threshold = 140;
                      const luminance =
                        0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
                      return luminance > threshold ? "black" : "white";
                    }
                    return "black";
                  },
                  render: (args) => {
                    if (args.value > 4) {
                      return args.value + "%";
                    }
                  },
                },
              },
            },
          });
          yearWiseCharts.push(c);
          if (!legendGenerated) {
            const legendClass = `.legend-${yearRow.year}`;
            document.querySelector(legendClass).innerHTML = c.generateLegend();
            const legendItems = document
              .querySelector(legendClass)
              .getElementsByTagName("li");
            const legendItemContainer = document.querySelector(legendClass);
            if (legendItemContainer) {
              const containerUl = legendItemContainer.getElementsByTagName(
                "ul"
              );
              if (containerUl.length) {
                containerUl[0].style.display = "flex";
                containerUl[0].style.padding = "0";
                containerUl[0].style.alignItems = "flex-start";
                containerUl[0].style.justifyContent = "center";
                containerUl[0].style.flexWrap = "wrap";

                containerUl[0].style.marginTop = "1rem";
              }
            }

            for (let i = 0; i < legendItems.length; i++) {
              yearWiseCharts[0].chart.getDatasetMeta(0).data.forEach((meta) => {
                if (meta._index == i) {
                  legendItems[i].style.display = "flex";
                  // legendItems[i].style.fontSize = '1.1rem';
                  // legendItems[i].style.marginRight = '5px';
                  // legendItems[i].style.flexDirection = 'column';
                  // legendItems[i].style.textAlign = 'center';
                  // legendItems[i].style.justifyContent = 'center';
                  legendItems[i].style.alignItems = "center";
                  legendItems[i].style.padding = ".6rem";
                  prependDataColorDiv(legendItems[i], meta);
                }
              });

              /**
               * Below code adds the hide/show functionality on custom legends
               */
              /*legendItems[i].addEventListener('click', (e) => {
                for (let yearChart of yearWiseCharts) {
                  yearChart.chart.getDatasetMeta(0).data.forEach(meta => {
                    if (meta._index == i) {
                      if (meta.hidden) {
                        legendItems[i].innerHTML = legendItems[i].textContent;
                      } else {
                        legendItems[i].innerHTML = legendItems[i].textContent.strike();
                      }
                      meta.hidden = !meta.hidden;
                      prependDataColorDiv(legendItems[i], meta);
                      yearChart.chart.update();
                    }
                  });
                }
              }, false);*/
            }
            legendGenerated = true;
          }
        }, 10);
      }
    }
  }

  hexToRgb(colorString) {
    const result = colorString
      .substring(colorString.indexOf("(") + 1, colorString.lastIndexOf(")"))
      .split(/,\s*/);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  renderPieChart({
    type = "pie",
    labels,
    data,
    chartTitle,
    elementId,
    legend = true,
    options = {},
  }) {
    return new Chart(elementId, {
      type,
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          display: false,
          text: chartTitle,
        },
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) => {
              const title = data.labels[tooltipItem[0].index];
              if (title.split(" ").length > 3) {
                return [
                  [title.split(" ").slice(0, 3).join(" ")],
                  [
                    title
                      .split(" ")
                      .slice(3, title.split(" ").length)
                      .join(" "),
                  ],
                ];
              }
              return title;
            },
            label: (tooltipItem, data) => {
              const label =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              // if (!this.singleULBView) {
              return label + "%";
              // }
            },
          },
        },
        legend: {
          display: legend,
          position: "bottom",
        },
        responsive: true,
        ...options,
      },
    });
  }

  sortHeader(header) {
    const { id } = header;
    this.commonTableDataDisplay = this.commonTableDataDisplay.map((year) => {
      const totalArray = year.data[year.data.length - 1];
      year.data = year.data
        .slice(0, year.data.length - 1)
        .sort((a, b) => this.sortCallBack(a, b, id));
      year.data = [...year.data, totalArray];
      return year;
    });
    if (header.hasOwnProperty("status") && header.status == true) {
      header.status = false;
    } else {
      header.status = true;
      this.commonTableDataDisplay = this.commonTableDataDisplay.map((year) => {
        const totalArray = year.data[year.data.length - 1];
        year.data = year.data.slice(0, year.data.length - 1).reverse();
        year.data = [...year.data, totalArray];
        return year;
      });
    }
  }

  fixToDecimalPlace(count, n = 2) {
    if (count.toString().includes(".")) {
      return Number(count).toFixed(n);
    } else {
      return count;
    }
  }

  getTotalRow(rows: any[], headers = this.commonTableHeaders) {
    const newDataRow = {};
    for (const obj of headers) {
      const prop = obj.id;
      const col = headers.find((col: ModalTableHeader) => col.id === prop);
      if (col) {
        if (col.total) {
          if (typeof rows[0][prop] == "number") {
            const count = rows.reduce((a, c) => a + c[prop], 0);
            newDataRow[prop] = this.fixToDecimalPlace(count, 2);
          } else {
            if (!isNaN(rows[0][prop])) {
              const count = rows.reduce((a, c) => a + Number(c[prop]), 0);
              newDataRow[prop] = this.fixToDecimalPlace(count, 2);
            }
          }
        }
        if (prop == "populationCategory") {
          newDataRow[prop] = "Total";
        }
      }
    }
    newDataRow["audited"] = rows.reduce((a, c) => a + c["audited"], 0);
    newDataRow["unaudited"] = rows.reduce((a, c) => a + c["unaudited"], 0);
    return newDataRow;
  }

  openModal(UlbModal: TemplateRef<any>, range, year: string) {
    const rowClickedId = "";
    let subscription: Observable<any>;
    this.modalTableHeaders = modalTableHeaders[this.tabIndex];
    this.modalRef = this.modalService.show(UlbModal, {
      class: "modal-uq",
    });

    switch (this.tabIndex) {
      case 0:
        subscription = this.dashboardService.fetchDependencyOwnRevenueData(
          JSON.stringify(year),
          this.selectedState._id,
          rowClickedId,
          range.populationCategory
        );

        break;
      case 1:
        subscription = this.dashboardService.fetchSourceOfRevenue(
          JSON.stringify(year),
          this.selectedState._id,
          rowClickedId,
          range.populationCategory
        );

        break;
      /*    case 2:
        this.dashboardService
          .fetchFinancialRevenueExpenditure(
            JSON.stringify(this.selectedYears),
            this.selectedState._id,
            rowClickedId
          )
          .subscribe(this.fetchSingleUlbDataSuccess, this.handleError);
        break;*/
      case 2:
        subscription = this.dashboardService.fetchRevenueExpenditure(
          JSON.stringify(year),
          this.selectedState._id,
          rowClickedId,
          range.populationCategory
        );

        break;
      case 3:
        subscription = this.dashboardService.fetchCashAndBankBalance(
          JSON.stringify(year),
          this.selectedState._id,
          rowClickedId,
          range.populationCategory
        );

        break;
      case 4:
        subscription = this.dashboardService.fetchOutStandingDebt(
          JSON.stringify(year),
          this.selectedState._id,
          rowClickedId,
          range.populationCategory
        );

        break;
    }

    subscription.pipe(delay(1000)).subscribe((res) => {
      range.ulbs = res["data"];
      const totalRow = this.getTotalRow(range.ulbs, this.modalTableHeaders);
      totalRow["name"] = "Total";
      const ORPcolumn = this.modalTableHeaders.find(
        (col) => col.id === "ownRevenuePercentage"
      );
      if (ORPcolumn) {
        totalRow["ownRevenuePercentage"] =
          Number(
            (Number(totalRow["ownRevenue"]) /
              Number(totalRow["revenueExpenditure"])) *
              100
          ).toFixed(2) + "%";
      }
      this.modalTableData = {
        data: range["ulbs"]
          .sort((a, b) => this.sortCallBack(a, b, "population"))
          .reverse()
          .concat([totalRow]),
        year,
        populationCategory: range["populationCategory"],
      };
      this.modalTableHeaders[0].click = true;
      this.modalTableHeaders = this.modalTableHeaders.map((modal: any) => {
        delete modal["status"];
        return modal;
      });
    }, this.handleError);

    this.modalService.onHide.subscribe((res) => {
      this.modalTableData = null;
    });
    return;
  }

  modalItemClicked(rowClickedId, row: any = {}) {
    const ulbFound = this.allULBSList.find((ulb) => ulb._id === rowClickedId);
    if (!ulbFound) {
      console.error(`ULB clicked not found in dropdown ulb list`);
    } else {
      this.selectedState = this.stateAndULBDataMerged[ulbFound.state];
      this.updateULBDropdownList({
        stateId: ulbFound.state,
      });
    }

    this.selectedUlb = rowClickedId;
    this.loading = true;
    this.tabData = [];
    switch (this.tabIndex) {
      case 0:
        this.dashboardService
          .fetchDependencyOwnRevenueData(
            JSON.stringify(this.selectedYears),
            this.selectedState._id,
            rowClickedId
          )
          .subscribe(this.fetchSingleUlbDataSuccess, this.handleError);
        break;
      case 1:
        this.dashboardService
          .fetchSourceOfRevenue(
            JSON.stringify(this.selectedYears),
            this.selectedState._id,
            rowClickedId
          )
          .subscribe(this.fetchSingleUlbDataSuccess, this.handleError);
        break;
      /*    case 2:
        this.dashboardService
          .fetchFinancialRevenueExpenditure(
            JSON.stringify(this.selectedYears),
            this.selectedState._id,
            rowClickedId
          )
          .subscribe(this.fetchSingleUlbDataSuccess, this.handleError);
        break;*/
      case 2:
        this.dashboardService
          .fetchRevenueExpenditure(
            JSON.stringify(this.selectedYears),
            this.selectedState._id,
            rowClickedId
          )
          .subscribe(this.fetchSingleUlbDataSuccess, this.handleError);
        break;
      case 3:
        this.dashboardService
          .fetchCashAndBankBalance(
            JSON.stringify(this.selectedYears),
            this.selectedState._id,
            rowClickedId
          )
          .subscribe(this.fetchSingleUlbDataSuccess, this.handleError);
        break;
      case 4:
        this.dashboardService
          .fetchOutStandingDebt(
            JSON.stringify(this.selectedYears),
            this.selectedState._id,
            rowClickedId
          )
          .subscribe(this.fetchSingleUlbDataSuccess, this.handleError);
        break;
    }
    this.singleULBView = true;
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  filterDataStateWise(event: any) {
    if (event) {
      if (this.selectedState && this.selectedState._id === event._id) {
        return;
      }
      this.selectedState = event;
    } else {
      this.selectedState = {};
    }
    this.singleULBView = false;
    this.selectedUlb = "";
    this.tabData = [];
    this.apiCanceller.next(true);
    this.fetchData();
    this.updateULBDropdownList({ stateId: this.selectedState._id });
  }

  sortCallBack(a, b, id) {
    let aVal = a[id],
      bVal = b[id];

    if (typeof a[id] === "object") {
      aVal = a[id].value;
      bVal = b[id].value;
    }
    if (typeof aVal !== "number" && aVal.includes("%")) {
      aVal = aVal.replace("%", "");
      bVal = bVal.replace("%", "");
    }
    if (id === "populationCategory") {
      const populationCategoryObj = {
        "< 1 Lakh": 0,
        "1 Lakh to 10 Lakhs": 1,
        "> 10 Lakhs": 2,
      };
      aVal = populationCategoryObj[aVal];
      bVal = populationCategoryObj[bVal];
    }

    if (typeof aVal == "number") {
      return aVal - bVal == 0 ? -1 : aVal - bVal;
    } else if (!isNaN(Number(aVal))) {
      return aVal - bVal == 0 ? -1 : aVal - bVal;
    } else if (aVal >= bVal) {
      return -1;
    } else if (aVal < bVal) {
      return 1;
    } else {
      return 0;
    }
  }

  sortDialogHeader(header) {
    const { id } = header;
    const totalArray = this.modalTableData.data[
      this.modalTableData.data.length - 1
    ];
    this.modalTableData.data = this.modalTableData.data
      .slice(0, this.modalTableData.data.length - 1)
      .sort((a, b) => this.sortCallBack(a, b, id))
      .concat(totalArray);
    if (header.hasOwnProperty("status") && header.status == true) {
      header.status = false;
    } else {
      header.status = true;
      this.modalTableData.data = this.modalTableData.data
        .slice(0, this.modalTableData.data.length - 1)
        .reverse()
        .concat(totalArray);
    }
  }

  downloadTable(elementId = "table") {
    const isUserLoggedIn = this._authService.loggedIn();
    if (!isUserLoggedIn) {
      const dailogboxx = this._dialog.open(DialogComponent, {
        data: this.defaultDailogConfiuration,
      });
      return;
    }

    const tabHeading = [
      "Own Revenues",
      "Revenue Sources",
      "Revenue Expenditure",
      "Cash and Bank Balance",

      "Outstanding Debt",
    ];

    const tableElement = <HTMLTableElement>document.getElementById(elementId);
    let tableHeaderText = "India";
    if (this.selectedState.hasOwnProperty("_id")) {
      tableHeaderText = this.selectedState.name;
    }
    const today = new Date();
    const date = today.toLocaleDateString();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " at " + time;
    const textFor2ndRow = `File downloaded on  ${dateTime} ${
      today.getHours() > 12 ? "PM" : "AM"
    }. `;
    const tabHeadingRow = tabHeading[this.tabIndex];
    const options: TableDowloadOptions = {
      filename: "table",
      extension: "xlsx",
      extraTexts: {
        atTop: {
          rows: [
            {
              columns: [
                {
                  text: tabHeadingRow,
                  bold: "true",
                  text_align: "center",
                  font_size: "14",
                  colSpan:
                    elementId == "table"
                      ? this.modalTableHeaders.length
                      : this.commonTableHeaders.length,
                },
              ],
            },
            {
              columns: [
                {
                  text: tableHeaderText,
                  bold: "true",
                  text_align: "center",
                  font_size: "14",
                  colSpan:
                    elementId == "table"
                      ? this.modalTableHeaders.length
                      : this.commonTableHeaders.length,
                },
              ],
            },
          ],
        },
        atBottom: {
          rows: [
            {
              columns: [
                {
                  text: textFor2ndRow,
                  bold: "false",
                  text_align: "right",
                  font_size: "12",
                  colSpan:
                    elementId == "table"
                      ? this.modalTableHeaders.length
                      : this.commonTableHeaders.length,
                },
              ],
            },
          ],
        },
      },
    };
    if (tableElement) {
      const tableDownloader = TableDownloader.getInstance();
      tableDownloader.downloadTable(tableElement, {
        ...options,
      });
    }
  }

  ngOnDestroy() {
    this.modalService.hide(1);
  }
}
