import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { from, Observable, of, Subject } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil, tap } from "rxjs/operators";
import { CommonService } from "src/app/shared/services/common.service";
import { ResourcesDashboardService } from "../resources-dashboard.service";

interface NamedEntity {
  name: string,
  _id: string,
}

@Component({
  selector: "app-filter-component",
  templateUrl: "./filter-component.component.html",
  styleUrls: ["./filter-component.component.scss"],
  encapsulation: ViewEncapsulation.Emulated
})
export class FilterComponentComponent implements OnInit, OnDestroy {

  @Input() filterInputData: any;
  @Input() downloadValue: boolean;
  @Output() filterFormData = new EventEmitter<any>();
  @Output() isDownloadable = new EventEmitter<boolean>();

  filterForm: FormGroup;
  statesList: NamedEntity[];
  filteredUlbs: Observable<NamedEntity[]>;
  yearsList: string[];
  staticYearsList = ['2019-20', '2018-19', '2017-18', '2016-17', '2015-16','2025-26'];
  contentType = ["Raw Data PDF", "Raw Data Excel", "Standardised Excel", "Budget PDF"];
  isSearching: boolean;
  unsubscribe$ = new Subject<void>();
  pdfStatus = ['Audited', 'Unaudited'];
  // auditType: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _commonServices: CommonService,
    private _resourcesDashboardService: ResourcesDashboardService
  ) {
    const year = this.route.snapshot.queryParamMap.get('year');
    const ulbName = this.route.snapshot.queryParamMap.get('ulbName');
    const ulbId = this.route.snapshot.queryParamMap.get('ulbId');
    const state = this.route.snapshot.queryParamMap.get('state');
    const contentType = this.route.snapshot.queryParamMap.get('type');
    const pdfStatus = this.route.snapshot.queryParamMap.get('pdf');

    if (year || ulbName || ulbId || state) {
      this.filterForm = this.fb.group({
        state: [state || ''],
        ulb: [{ _id: ulbId || '', name: ulbName || '' }],
        contentType: [contentType],
        year: [year],
        pdfStatus: [pdfStatus], // Added pdfStatus to the form
        // category: this.category,
      });
      // this.onFilterChange();
    } else this.initializeFormGroup();

  }

  ngOnInit() {
    // this.initializeFormGroup();
    const years$ = from(this.loadYears());

    years$.subscribe({
      next: (yearsResult) => {
        this.yearsList = yearsResult;
        this.loadStates();
        this.loadUlbs();
      },
      error: (error) => { console.error('Error in ngOnInit(): ', error.message) },
      complete: () => {
        // If year and contentType is received from query params then don't update.
        if (!this.filterForm.get('year')?.value)
          this.filterForm.patchValue({ year: this.yearsList[1] }, { emitEvent: false });
        if (!this.filterForm.get('contentType')?.value)
          this.filterForm.patchValue({ contentType: 'Raw Data PDF' }, { emitEvent: false });

        this.onFilterChange();
      }
    });
  }

  private initializeFormGroup(): void {
    this.filterForm = this.fb.group({
      state: [''],
      ulb: [''],
      contentType: [''],
      year: [''],
      pdfStatus: [''], 
      // category: this.category,
    });
  }
  // make year dynamic based on contentType work in progress
// private triggerUploadForBudgetPDF(): void {
//  this.filterForm.get('contentType')?.valueChanges
//   .pipe(
//     takeUntil(this.unsubscribe$),
//     distinctUntilChanged()
//   )
//   .subscribe((type: string) => {
//     this.auditType = type; // 👈 directly set auditType to selected contentType
// console.log('Selected contentType:', this.auditType);
//     // Now call API with dynamic auditType
//     this._resourcesDashboardService.getAnnualAccountsYear(this.auditType)
//       .pipe(takeUntil(this.unsubscribe$))
//       .subscribe({
//         next: (res: any) => {
//           const years = Array.from(new Set([...res.afsYears, ...this.staticYearsList])).sort((a, b) => b.localeCompare(a));
//           this.yearsList = years;
//           console.log('Years List:', this.yearsList[0]);
//           this.filterForm.patchValue({ year: this.yearsList[0] }, { emitEvent: false });
//         },
//         error: (err) => console.error('Error fetching years:', err.message),
//       });
//   });


// }
  private loadStates(): void {
    this._commonServices
      .fetchStateList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          this.statesList = res
            .filter((state: any) => !state.isUT)
            .sort((a: any, b: any) => a.name.localeCompare(b.name))
            .map((state: any) => ({ name: state.name, _id: state._id }));
        },
        error: (error) => { console.error('Error in loadStates(): ', error.message) },
      });
  }

  private loadUlbs(): void {
    this.filterForm.get('ulb').valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => this.isSearching = true),
        switchMap(value => {
          if (!value) return of([])

          return this._commonServices
            .postGlobalSearchData(
              { ulb: value, contentType: this.filterForm.value.contentType },
              'ulb',
              this.filterForm.value.state
            );
        }),
        catchError((error: any) => {
          this.isSearching = false;
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

  private loadYears(): Promise<any> {
    const header =
      this.filterInputData?.comp === 'report-publications'
        ? 'reports_&_publications'
        : 'learning_center';

    return new Promise((resolve, reject) => {
      const getYearsFn =
        this.filterInputData?.comp === 'dataSets'
          ? this._resourcesDashboardService.getAnnualAccountsYear()
          : this._resourcesDashboardService.getYearsList(header);

      getYearsFn
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res: any) => {
            let years =
              this.filterInputData?.comp === 'dataSets'
                ? Array.from(new Set([...res.afsYears, ...this.staticYearsList]))
                : (res?.data || []);

            years = years.sort((a: string, b: string) => b.localeCompare(a));
            this.yearsList = this.filterInputData?.comp === 'dataSets' ? years : [''].concat(years);
            resolve(this.yearsList);
          },
          error: (error) => { reject('Failed to load years: ' + error.message); },
        });
    });
  }

  public onFilterChange(): void {
    // console.log('filterForm = ', this.filterForm.value)
    this.filterFormData.emit(this.filterForm);
  }

  public clearFilter(): void {
    this.filterForm.reset({
      state: '',
      ulb: '',
      contentType: 'Raw Data PDF',
      // year: this.filterInputData?.comp == 'dataSets' ? this.yearsList[0] : '',
      pdfStatus: '', 
      year: this.filterInputData?.comp == 'dataSets' ? this.yearsList[1] : '',
      // category: this.category,
    }, { emitEvent: false });

    this.onFilterChange();
  }

  public initiateDownload(): void {
    this.isDownloadable.emit(true);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
