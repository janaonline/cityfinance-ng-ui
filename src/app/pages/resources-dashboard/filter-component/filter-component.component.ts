import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { forkJoin, Observable, of } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from "rxjs/operators";
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
})
export class FilterComponentComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _commonServices: CommonService,
    private route: ActivatedRoute,
    private _resourcesDashboardService: ResourcesDashboardService
  ) {

    // console.log('year = ', this.route.snapshot.queryParamMap.get('year'));
    // console.log('ulbName = ', this.route.snapshot.queryParamMap.get('ulbName'));
    // console.log('ulbId = ', this.route.snapshot.queryParamMap.get('ulbId'));
    // console.log('state = ', this.route.snapshot.queryParamMap.get('state'));
    // console.log('contentType = ', this.route.snapshot.queryParamMap.get('type'));
  }

  @Input() filterInputData: any;
  @Input() downloadValue: boolean;
  @Output() filterFormData = new EventEmitter<any>();
  @Output() isDownloadable = new EventEmitter<boolean>();

  filterForm: FormGroup;
  statesList: NamedEntity[];
  filteredUlbs: Observable<NamedEntity[]>;
  yearsList: string[];
  staticYearsList = ['2019-20', '2018-19', '2017-18', '2016-17', '2015-16'];
  contentType = ["Raw Data PDF", "Raw Data Excel", "Standardised Excel"];
  isSearching: boolean;

  ngOnInit() {
    forkJoin([
      this.initializeFormGroup(),
      this.getStates(),
      this.getUlbs(),
      this.getYears(),
    ]).subscribe(() => { this.onFilterChange(); });
  }

  private initializeFormGroup(): void {
    this.filterForm = this.fb.group({
      state: [''],
      ulb: [''],
      contentType: [''],
      year: [''],
      // category: this.category,
    });
  }

  private getStates(): void {
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
        complete: () => { },
      });
  }

  private getUlbs() {
    this.filterForm.get('ulb').valueChanges
      .pipe(
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
            this.filterForm.patchValue({ year: this.yearsList[0] || '2023-24' }, { emitEvent: false });
            this.filterForm.patchValue({ contentType: 'Raw Data PDF' }, { emitEvent: false });
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
    this.filterFormData.emit(this.filterForm);
  }

  public clearFilter(): void {
    this.filterForm.reset({
      state: '',
      ulb: '',
      contentType: 'Raw Data PDF',
      year: this.filterInputData?.comp == 'dataSets' ? this.yearsList[0] : '',
      // category: this.category,
    }, { emitEvent: false });

    this.onFilterChange();
  }

  public showData(): void {
    console.log("form = ", this.filterForm.value);
  }

  public initiateDownload(): void {
    this.isDownloadable.emit(true);
  }
}
