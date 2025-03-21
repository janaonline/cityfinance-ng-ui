import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from "rxjs/operators";
import { CommonService } from "src/app/shared/services/common.service";
import { FilterModelBoxComponent } from "../filter-model-box/filter-model-box.component";
import { ResourcesDashboardService } from "../resources-dashboard.service";

interface NamedEntity {
  name: string,
  _id: string,
}

@Component({
  selector: "app-filter-component",
  templateUrl: "./filter-component.component.html",
  styleUrls: ["./filter-component.component.scss"],
})
export class FilterComponentComponent implements OnInit {
  @Output() filterFormData = new EventEmitter<any>();
  @Output() clearEvent = new EventEmitter<any>();


  @Input() filterTabDataSet;
  @Input() downloadValue;
  @Input() data;
  @Input() category;
  @Output()
  init = new EventEmitter();
  @Output() download = new EventEmitter();
  @Input() mobileFilterConfig: any;


  state = new FormControl();


  dropdownSettings = {
    singleSelection: true,
    text: "State",
    enableSearchFilter: true,
    labelKey: "name",
    primaryKey: "_id",
    showCheckbox: false,
    classes: "filter-component",
  };


  selectedValue: String = "2023-24";
  defaultYearInDropdown: String = "";
  selectedType: String = "Raw Data PDF";

  constructor(
    private fb: FormBuilder,
    private _commonServices: CommonService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _resourcesDashboardService: ResourcesDashboardService
  ) {
    // this.filterData("", "");
    this.addYearsTillCurrent();

    const year = this.route.snapshot.queryParamMap.get('year') || this.selectedValue;
    const ulbName = this.route.snapshot.queryParamMap.get('ulbName') || this.route.snapshot.queryParamMap.get('ulb') || '';
    const ulbId = this.route.snapshot.queryParamMap.get('ulbId') || '';
    this.stateId = this.route.snapshot.queryParamMap.get('state') || '';
    const contentType = this.route.snapshot.queryParamMap.get('type') || this.selectedType;
    this.initializationFilterValue();
    this.defaultYearInDropdown = this.selectedValue;
    this.selectedValue = year ? year : "";
    this.getStatesList();
    this.patchFilterValues(this.stateId, ulbId, ulbName, this.selectedValue, contentType);
  }

  @Input() filterInputData: any;

  filterForm1: FormGroup;
  statesList: NamedEntity[];
  filteredUlbs: Observable<NamedEntity[]>;
  yearsList: string[];
  staticYearsList = ['2019-20', '2018-19', '2017-18', '2016-17', '2015-16'];
  contentType = ["Raw Data PDF", "Raw Data Excel", "Standardised Excel"];
  isSearching: boolean;

  ngOnInit() {
    this.initializeFormGroup();
    this.getStates();
    this.getUlbs();
    this.getYears();
  }

  private initializeFormGroup(): void {
    this.filterForm1 = this.fb.group({
      state: [''],
      ulbCtrl: [''],
      ulbId: [''],
      contentType: [''],
      year: [''],
      // category: this.category,
    });
  }

  private getStates(): void {
    // const stateCode = this.route.snapshot.queryParamMap.get('stateCode');
    this._commonServices
      .fetchStateList()
      .subscribe({
        next: (res: any) => {
          this.statesList = res
            .filter((state: any) => !state.isUT)
            .sort((a: any, b: any) => a.name.localeCompare(b.name))
            .map((state: any) => ({ name: state.name, _id: state._id }));
        },
        error: (error) => { console.error('Error in getStates(): ', error.message) },
        complete: () => { console.log("statesList", this.statesList) },
      });
  }

  private getUlbs() {
    this.filterForm1.get('ulbCtrl').valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => this.isSearching = true),
        switchMap(value => {
          if (!value) return of([])

          return this._commonServices
            .postGlobalSearchData(
              { ulb: value, contentType: this.filterForm1.value.contentType },
              'ulb',
              this.filterForm1.value.state
            );
        }),
        catchError((error: any) => {
          this.isSearching = false;
          // TODO: add swal popup.
          console.error("Error fetching ULBs:", error);
          return of([]);
        })
      )
      .subscribe((res: any) => {
        this.isSearching = false;
        this.filteredUlbs = res?.data?.map((ulb: any) => ({ name: ulb.name, _id: ulb._id })) || [];
      });
  }

  public displayUlbName(ulb: NamedEntity): string {
    return ulb ? ulb.name : '';
  }

  private getYears(): void {
    if (this.filterInputData?.comp == 'dataSets') {
      this._resourcesDashboardService.getAnnualAccountsYear()
        .subscribe({
          next: (res: any) => {
            const uniqueYears = new Set([...res.afsYears, ...this.staticYearsList]);
            this.yearsList = Array.from(uniqueYears);
            this.yearsList.sort((a, b) => b.localeCompare(a));
          },
          error: (error) => { console.error('Error in getYears(): ', error.message) },
          complete: () => {
            this.filterForm1.patchValue({ year: this.yearsList[0] || '2023-24' }, { emitEvent: false });
            this.filterForm1.patchValue({ contentType: 'Raw Data PDF' }, { emitEvent: false });
          }
        });
    } else {
      let header = this.filterInputData?.comp == 'report-publications'
        ? "reports_&_publications"
        : 'learning_center';

      this._resourcesDashboardService.getYearsList(header)
        .subscribe({
          next: (res: any) => {
            this.yearsList = res?.data || [];
            this.yearsList.sort((a, b) => b.localeCompare(a));
          },
          error: (error) => { console.error('Error in getYears(): ', error.message) },
          complete: () => { },
        });
    }
  }

  public onFilterChange(): void {
    const ulbId = this.filterForm1.value?.ulbCtrl?._id || '';
    this.filterForm1.patchValue({ ulbId: ulbId }, { emitEvent: false });

    this.filterFormData.emit(this.filterForm1);
  }

  public clearFilter(): void {
    this.filterForm1.reset({
      state: '',
      ulbCtrl: '',
      ulbId: '',
      contentType: 'Raw Data PDF',
      year: this.filterInputData?.comp == 'dataSets' ? this.yearsList[0] : '',
      // category: this.category,
    }, { emitEvent: false });

    this.onFilterChange();
  }

  public showData(): void {
    console.log("form = ", this.filterForm1.value);
  }

  stateList;
  ulbList;
  filterForm: FormGroup;
  globalOptions = [];
  yearList = [
    "2015-16",
    "2016-17",
    "2017-18",
    "2018-19",
    "2019-20",
    "2020-21",
    "2021-22",
  ];
  cType = ["Raw Data PDF", "Raw Data Excel", "Standardised Excel"];

  // "Standardised Excel",
  // "Standardised PDF",
  filteredOptions: Observable<any[]>;
  stateId: string = "";
  getYearsList() {
    this._resourcesDashboardService.getYearsList().subscribe((res: any) => {
      console.log("years===>", res.data);
      this.yearList = res.data;
      this.yearList.unshift('All Years')
      this.defaultYearInDropdown = "All Years";
      this.filterForm.patchValue({
        year: "All Years",
      });

      console.log("this.filterFrom", this.filterForm);
      this.filterFormData.emit(this.filterForm);
    });
  }

  // ngOnInit(): void {
  //   console.log("daaaaa", this.filterInputData);
  //   this.getStatesList();
  //   // this.addYearsTillCurrent();
  // }

  onChange(event) {
    this.selectedValue = event.target.value;
    this.filterData("year", "");
  }
  onChangeType(event) {
    this.selectedType = event.target.value;
    this.filterData("type", "");
  }

  getStatesList() {
    const stateCode = this.route.snapshot.queryParamMap.get('stateCode');
    this._commonServices.fetchStateList().subscribe(
      (res: any) => {
        console.log("res", res);
        this.stateList = this._commonServices.sortDataSource(res, "name");
        if (stateCode || this.stateId) {
          const state = stateCode ? this.stateList?.find(st => st?.code == stateCode) : this.stateList?.find(st => st?._id == this.stateId);
          this.state.patchValue([state]);
          this.onStateChange(state);
        }
        this.loadData();
        console.log("this.state this.state 234", this.state);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadData() {
    this.filterForm?.controls?.ulb?.valueChanges.subscribe((value) => {

      console.log(value, this.filterForm.value);
      if (value?.length >= 1) {
        if ((this.filterForm.value.hasOwnProperty('state') && this.filterForm.value.state != undefined)
          && (this.filterForm.value.hasOwnProperty('ulb') && this.filterForm.value.state != undefined)
        ) {
          this._commonServices
            .postGlobalSearchData({ ...this.filterForm.value, ulb: value }, "ulb", this.filterForm.value.state)
            .subscribe((res: any) => {
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
              const obj = res?.data.find(e => e.ulbName == this.filterForm?.value?.ulb)
              if (obj && (!this.filterForm.value['ulbId'] || this.filterForm.value['ulbId'] != obj._id)) {
                this.filterForm.patchValue({
                  ulb: obj?.name,
                  ulbId: obj?._id
                })
                this.filterData('ulb', obj);
              }

            });
        }

      } else {
        return null;
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes====>", changes);
    // check the object "changes" for new data
    // console.log("chanhged happed", changes.category.currentValue);
    if (
      changes &&
      changes.filterInputData &&
      changes.filterInputData.currentValue
    ) {
      let filterTabValue = changes.filterInputData.currentValue.comp;
      if (
        filterTabValue == "report-publications" ||
        filterTabValue == "bestPractices"
      ) {
        this.getYearsList();
      }
    }
    if (changes && changes.category && changes.category.currentValue) {
      this.filterData("category", "");
    }

    if (changes.data) {
      console.log(this.data);
    }
    if (changes && changes.download && changes.download.currentValue) {
      this.download = changes.download.currentValue;
    }
  }

  initiateDownload() {
    this.download.emit(true);
  }
  filterData(param: string, val: any) {
    if (param === "ulb") {
      const ulbName = val?.name || '';
      const stateId = val?.state?._id || '';

      this.filterForm.patchValue({
        state: stateId,
        ulbId: val?._id || '',
        ulb: ulbName,
      });
    } else if (param === "state") {
      let emptyArr: any = [];
      this.filteredOptions = emptyArr;
      this.filterForm.patchValue({
        ulbId: '',
      });
    }

    // Emit the updated form values for further processing
    this.filterFormData.emit(this.filterForm);
  }


  clearAll() {
    let emptyArr: any = [];
    this.filteredOptions = emptyArr;
    this.filterForm.reset();
    this.state.reset();

    this.patchFilterValues("", "", "", this.defaultYearInDropdown, "Raw Data PDF")
    this.filterFormData.emit(this.filterForm);
    this.clearEvent.emit();
    this.loadData();
  }

  defaultFilterStage: boolean = false;
  tempDataHolder: any;
  filterModel() {
    const dialogRef = this.dialog.open(FilterModelBoxComponent, {
      width: "100%",
      height: "100%",
      data: {
        mobileFilterConfig: this.mobileFilterConfig,
        yearList: this.yearList,
        preSelectedValue: { ...this.tempDataHolder },
        defaultStage: this.defaultFilterStage,
        fileType: this.cType,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      if (result && result.filterForm) {
        this.defaultFilterStage = result?.defaultStage;
        this.tempDataHolder = result?.filterForm?.value;
        this.filterFormData.emit(result?.filterForm);
      }
    });
  }

  onStateChange(state) {
    this.filterForm.patchValue({ state: state._id })
    this.filterData('state', '')
  }


  /*initializationFilterValue method initialise the filter form */
  initializationFilterValue() {
    this.filterForm = this.fb.group({
      state: [""],
      ulb: [""],
      ulbId: [""],
      contentType: [""],
      sortBy: [""],
      year: [""],
      category: this.category,
    });
  }

  /*patchFilterValues method patch all values based on filter applied */
  patchFilterValues(stateId, ulbId, ulbName, year, contentType) {
    this.filterForm.patchValue({
      year,
      ulb: ulbName,
      ulbId,
      contentType,
      state: stateId
    });
  }

  /*this method add calander year dynamic in yearList array, format- "2021-22" */
  addYearsTillCurrent() {
    // Get the current year.
    let currentYear = new Date().getFullYear();

    // API to get latest year - ULB with latest year afss data.
    // this._resourcesDashboardService.getAnnualAccountsYear()
    //   .subscribe((res: any) => {
    //     currentYear = parseInt(res.latestAfsYear.substring(0, 5)) + 1;

    //     // get the previous year which is presented in the year list
    //     let lastYear = parseInt(this.yearList[this.yearList.length - 1]);

    //     // Generate and add years until the current year
    //     while (lastYear <= currentYear) {
    //       const formattedYear = `${lastYear - 1}-${String(lastYear).slice(2)}`;

    //       // Check if the year is not already in the array
    //       if (!this.yearList.includes(formattedYear)) {
    //         // Add the year to the array
    //         this.yearList.push(formattedYear);
    //       }

    //       // Move to the next year
    //       lastYear++;
    //     }

    //     // Reverse the array if needed
    //     this.yearList.reverse();

    //     // Set the latest year.
    //     this.selectedValue = this.yearList[0];

    //   });

  }
}
