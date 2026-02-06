import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { from, Observable, of, Subject } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil, tap } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { IState } from "src/app/models/state/state";
import { DownloadUserInfoService } from "src/app/shared/components/user-info-dialog/download-user-info.service";
import { CommonService } from "src/app/shared/services/common.service";
import { GlobalLoaderService } from "src/app/shared/services/loaders/global-loader.service";
import { SnackBarComponent } from "../data-sets/data-sets.component";
import { ResourcesDashboardService } from "../resources-dashboard.service";
const BULK_DOWNLOAD = 'bulkDownload';
const DOWNLOAD_ON_PORTAL = ['Standardised Excel'];
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


  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  @Input() filterInputData: any;
  @Input() downloadValue: boolean;
  @Input() tableLen: number;
  @Output() filterFormData = new EventEmitter<any>();
  @Output() isDownloadable = new EventEmitter<boolean>();
  @Output() isStateBundleRequestedOutput = new EventEmitter<boolean>();

  filterForm: FormGroup;
  statesList: NamedEntity[];
  filteredUlbs: Observable<NamedEntity[]>;
  yearsList: string[];
  staticYearsList = ['2019-20', '2018-19', '2017-18', '2016-17', '2015-16', '2025-26'];
  // contentType = ["Raw Data PDF", "Raw Data Excel", "Standardised Excel", "Budget PDF"];
  // auditType = ["Audited", "Unaudited"];
  isSearching: boolean;
  unsubscribe$ = new Subject<void>();
  pdfStatus = ['Audited', 'Unaudited'];
  auditType: string;
  disableForStateBundle2 = ['Raw Data Excel'];
  disableCards = ['Raw Data Excel', 'Digitized Excel'];
  isStateBundleRequested: boolean = false;
  durationInSeconds: number = 3;
  statesObj: Record<string, IState> = {};
  module: string = "resources" // userInfo popup.
  showStateBundleDiv: boolean = false;
  showSuccessDiv: boolean = false;
  email: string = '';
  contentType = [
    {
      value: 'rawPdf',
      key: 'Raw Data PDF',
      label: 'Data submitted by ULBs',
      description: 'in PDF',
      tooltip: '',
    },
    // {
    //   value: 'rawExcel',
    //   key: 'Raw Data Excel',
    //   label: 'Data submitted by ULBs',
    //   description: 'in Excel',
    //   tooltip: '',
    // },
    {
      value: 'digitizedExcel',
      key: 'Digitized Excel',
      label: 'ULB submitted documents digitized using OCR-AI methods',
      description: 'in Excel',
      tooltip: '',
    },
    {
      value: 'standardizedExcel',
      key: 'Standardised Excel',
      label: 'Data standardized into NMAM format',
      description: 'in Excel',
      tooltip: 'Currently under development.',
    },
    {
      value: 'budget',
      key: 'Budget PDF',
      label: 'Budget data submitted by ULBs',
      description: 'in PDF',
      tooltip: '',
    }
  ];
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _commonServices: CommonService,
    private _resourcesDashboardService: ResourcesDashboardService,
    private globalLoaderService: GlobalLoaderService,
    private _snackBar: MatSnackBar,
    private userInfoService: DownloadUserInfoService,
    private authService: AuthService,
    private dialog: MatDialog,
    private dataEntryService: DataEntryService,
  ) {
    const year = this.route.snapshot.queryParamMap.get('year');
    const ulbName = this.route.snapshot.queryParamMap.get('ulbName');
    const ulbId = this.route.snapshot.queryParamMap.get('ulbId');
    const state = this.route.snapshot.queryParamMap.get('state');
    const contentType = this.route.snapshot.queryParamMap.get('type');
    const auditType = this.route.snapshot.queryParamMap.get('auditType');

    if (year || ulbName || ulbId || state) {
      this.filterForm = this.fb.group({
        state: [state || ''],
        ulb: [{ _id: ulbId || '', name: ulbName || '' }],
        contentType: [contentType],
        year: [year],
        auditType: [auditType],
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
        if (!this.filterForm.get('auditType')?.value)
          this.filterForm.patchValue({ auditType: 'Unaudited' }, { emitEvent: false });

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
      auditType: [''],
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
        next: (res: IState[]) => {
          // Filter out UTs
          const filteredStates = res.filter((state: IState) => !state.isUT);

          // Create sorted array
          this.statesList = filteredStates
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((state) => ({ name: state.name, _id: state._id }));

          // Create object map
          this.statesObj = {};
          filteredStates.forEach((state: IState) => {
            if (!(state._id in this.statesObj)) {
              this.statesObj[state._id] = state;
            }
          });
        },
        error: (error) => {
          console.error('Error in loadStates(): ', error.message);
        },
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
    if (this.getValue('state')) this.showStateBundleDiv = true;
    else {
      this.showStateBundleDiv = false;
      this.isStateBundleRequested = false;
      this.emitStateBundleValue();
    }
    setTimeout(() => {
      this.filterFormData.emit(this.filterForm);
    }, 1);
  }

  public clearFilter(): void {
    this.filterForm.reset({
      state: '',
      ulb: '',
      contentType: 'Raw Data PDF',
      auditType: '',
      year: this.filterInputData?.comp == 'dataSets' ? this.yearsList[1] : '',
      // category: this.category,
    }, { emitEvent: false });

    this.onFilterChange();
  }

  public initiateDownload(): void {
    this.isDownloadable.emit(true);
  }

  getValue(key: string) {
    return this.filterForm.get(`${key}`)?.value;
  }

  createStateBundle() {
    const userInfo = this.getUserInfo();
    if (userInfo && userInfo.email && userInfo.isEmailVerified) {
      this.email = userInfo.email;
    }

    this.isStateBundleRequested = true;
    this.showSuccessDiv = false;
    this.emitStateBundleValue();

    setTimeout(() => {
      document.getElementById("email-me").scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
    });

    if (this.disableForStateBundle2.includes(this.getValue('contentType'))) {
      this.openSnackBar('Please choose valid data format!')
      return;
    }
  }

  getStateName(): string {
    return this.statesObj[this.getValue('state')]?.name;
  }

  getStateCode(): string {
    return this.statesObj[this.getValue('state')]?.code;
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  // User requested to create state bundle - Email files is clicked.
  sendStateBundle() {
    // User info popup.
    const state = this.getStateName() || this.getValue('state');
    const fileName = `bulkDownload_${state}_${this.getValue('year')}_${this.getValue('contentType')}`;

    if (this.tableLen === 0) {
      this.message = 'No data available for the selected filter. Please select different option(s) to proceed with the download';
      this.showSuccessDiv = true;
    } else {
      this.userInfoService.openUserInfoDialog([{ fileName }], this.module)
        .then((isDialogConfirmed) => {
          if (isDialogConfirmed) {
            const userInfo = this.getUserInfo();
            this.email = userInfo.email;
            const userName = userInfo.userName;

            if (!this.email) throw new Error("Email is required!");
            this.globalLoaderService.showLoader();

            // Download on portal.
            if (DOWNLOAD_ON_PORTAL.includes(this.getValue('contentType'))) {
              this._resourcesDashboardService.getLedgerDump(
                this.getStateCode(),
                this.getValue('year'),
                BULK_DOWNLOAD
              ).subscribe({
                next: (blob) => {
                  const fileName = `${state}_${this.getValue('year')}_${this.getValue('contentType')}`;
                  this.dataEntryService.downloadFileFromBlob(blob, fileName);
                  this.handleSuccess('File Downloaded Successfully!');
                },
                error: (error) => this.handleError(error)
              })
            } else {
              // Email files.
              this._resourcesDashboardService.initiateStateBundleZipDownload(
                this.getValue('state'),
                this.getValue('year'),
                this.getValue('ulb')?._id,
                this.getValue('contentType'),
                'audited',
                this.email,
                userName
              ).subscribe({
                next: (res: { message: string }) => {
                  const message = 'A download link will be sent to your email shortly!';
                  this.handleSuccess(res.message || message);
                },
                error: (error) => this.handleError(error)
              })
            }

          }
        });
    }

  }

  private handleError(error) {
    this.showSuccessDiv = false;
    const message = error.error.message || 'Failed to initiate the download process!';
    this.openSnackBar(message);
    this.authService.clearLocalStorageKey('userInfo');
    this.globalLoaderService.stopLoader()
  }

  private handleSuccess(msg: string) {
    this.message = msg;
    this.showSuccessDiv = true;
    this.globalLoaderService.stopLoader();
  }

  // Dismiss state bundle.
  dismissStateBundle() {
    this.isStateBundleRequested = false;
    this.emitStateBundleValue();
    this.showStateBundleDiv = false;
  }

  // Emit state bundle change to parent
  emitStateBundleValue() {
    this.isStateBundleRequestedOutput.emit(this.isStateBundleRequested);
  }

  // Dialog box more than 30 files are loaded.
  openSnackBar(text: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { text }
    });
  }

  // Hide card if key is in disableCards[] - when create state bundle is requested.
  getActiveStatus(key: string) {
    if (this.disableCards.includes(key) && this.isStateBundleRequested) return false;
    return true;
  }

  // Direct download on portal, rather than sending link in email.
  isEmailFiles() {
    return !(DOWNLOAD_ON_PORTAL.includes(this.getValue('contentType')));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}