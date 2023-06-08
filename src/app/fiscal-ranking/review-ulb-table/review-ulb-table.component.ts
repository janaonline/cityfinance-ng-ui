import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_TYPE } from 'src/app/models/user/userType';
import { State2223Service } from 'src/app/newPagesFc/xvfc2223-state/state-services/state2223.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FiscalRankingService, FormWiseData, MapData, removeFalsy, Table } from '../fiscal-ranking.service';

const tables: Table[] = [
  {
    id: "UlbActivities",
    endpoint: 'fiscal-ranking/overview/UlbActivities',
    response: null,
  },
  {
    id: 'PMUActivities',
    endpoint: 'fiscal-ranking/overview/PMUActivities',
    response: null,
  },
  {
    id: 'populationWise',
    endpoint: 'fiscal-ranking/overview/populationWise',
    response: null,
  },
]

@Component({
  selector: 'app-review-ulb-table',
  templateUrl: './review-ulb-table.component.html',
  styleUrls: ['./review-ulb-table.component.scss']
})
export class ReviewUlbTableComponent implements OnInit {
  formId = "63d8eabeee320e56e357b34e";
  data;
  columnNames
  // state = '5dcf9d7216a06aed41c748e2';
  stateList = [];
  Filter = [];
  populationTypesList = [];
  ulbTypesList = [];
  userData;
  title = '';
  isDownloadStart: boolean = false;
  mapData: MapData;

  perPage: '10' | '25' | '50' | '100' | 'all' = '10';
  filterForm: FormGroup;
  isLoader: boolean = false;
  max = Math.max;
  csvType = 'csvFROverall';
  notFoundMessage: String = 'No Data Found ...'
  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };


  listFetchOption = {
    filter: null,
    sort: null,
    csv: false,
    skip: 0,
    limit: this.tableDefaultOptions.itemPerPage,
  };

  constructor(
    private commonService: NewCommonService,
    private _fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private fiscalRankingService: FiscalRankingService,
    private _commonService: CommonService) {
  }
  ngOnInit(): void {
    this.filterForm = this._fb.group({
      ulbName: [""],
      stateName: [""],
      censusCode: [""],
      populationType: [""],
      ulbCode: [""],
      status: [""],
      filled1: [""],
    });
    this.fetchStateList();
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.loadData();
    this.loadMapData();
  }

  get design_year() {
    const yearItems = JSON.parse(localStorage.getItem('Years'))
    return yearItems['2022-23'];
  }


  get isInfiniteScroll() {
    return this.perPage == 'all';
  }

  get showableColumns() {
    const hiddenStateNames = ['stateName', 'filled_audited', 'filled_provisional'];
    return this.objectWithoutProperties(this.columnNames, hiddenStateNames);
  }

  loadMapData(params = {}) {
    console.log('loadMapdta', params)
    if (this.userData?.role == USER_TYPE.STATE) {
      params['state'] = this.userData?.state
    }


    this.fiscalRankingService.getStateWiseForm(params).subscribe(res => {
      console.log('map', res);
      this.mapData = res?.data;
    })
  }

  loadData(pageNumber?: number) {
    if (pageNumber) {
      this.tableDefaultOptions.currentPage = pageNumber;
      this.listFetchOption.skip = (pageNumber - 1) * this.tableDefaultOptions.itemPerPage;
    }
    Object.values(this.filterForm.getRawValue()).map((e: any) => e && e.trim())
    let filteredObj: any = {};
    for (const key in this.filterForm.getRawValue()) {
      if (this.filterForm.getRawValue()[key]) {
        filteredObj[key] = this.filterForm.getRawValue()[key].trim();
      }
    }
    let payload = {
      formId: this.formId,
      // state: this.state,
      design_year: this.design_year,
      ...filteredObj,
      ...this.listFetchOption
    };

    this.isLoader = true;
    this.commonService.getFrUlbs(payload).subscribe(res => {
      this.isLoader = false;
      this.data = (this.isInfiniteScroll ? [...this.data, ...res["data"]] : res["data"]);
      this.columnNames = res["columnNames"];
      this.title = res["title"];
      this.tableDefaultOptions.totalCount = res["total"];
      console.log(this.data)
      if (this.isInfiniteScroll && this.listFetchOption.skip == 0) {
        setTimeout(() => {
          const table = document.querySelector('.table-responsive') as HTMLElement;
          if (table) {
            table.style.height = `${table.clientHeight - 20}px`;
          }
        }, 100)
      }
    }, err => {
      this.isLoader = false;
      console.log(err.message);
    });
  }


  fetchStateList() {
    this._commonService.getStateUlbCovered().subscribe((res) => {
      this.stateList = res.data;
    });
  }



  objectWithoutProperties(obj, keys) {
    const target = {};
    for (let i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }

  getToken() {
    return JSON.parse(localStorage.getItem("id_token"));
  }

  keepOriginalOrder = (a, b) => a.key;

  onPerPageChange() {
    this.data = [];
    this.tableDefaultOptions.itemPerPage = this.isInfiniteScroll ? 10 : +this.perPage;
    this.listFetchOption.limit = this.tableDefaultOptions.itemPerPage;
    this.listFetchOption.skip = 0;
    this.loadData(1);
  }

  download() {
    Object.values(this.filterForm.getRawValue()).map((e: any) => e.trim())
    let filteredObj: any = {};
    for (const key in this.filterForm.getRawValue()) {
      if (this.filterForm.getRawValue()[key]) {
        filteredObj[key] = this.filterForm.getRawValue()[key].trim();
      }
    }
    console.log('downloading');
    const payload = {
      formId: this.formId,
      // state: this.state,
      design_year: this.design_year,
      ...filteredObj,
      ...this.listFetchOption
    };
    // this.isLoader = true;
    this.isDownloadStart = true;
    this._commonService.downloadCsvApi(this.csvType, payload).subscribe((res) => {
      // this.isLoader = false;
      setTimeout(() => {
        this.isDownloadStart = false;
        this._commonService.createCsv(res, this.csvType === 'csvFROverall' ? 'ULB_Ranking_Overall_Data' : 'ULB_Ranking_Financial_Data')
      }, 1000);
    }, (err) => { this.isDownloadStart = false; })
    // const endPoint = "review";
    // this._commonService.openWindowToDownloadCsv(payload, endPoint);
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll(event) {
    const threshold = 50;
    if (
      this.isInfiniteScroll &&
      !this.isLoader &&
      event.target.offsetHeight + event.target.scrollTop >= (event.target.scrollHeight - threshold) &&
      (this.listFetchOption.skip + this.tableDefaultOptions.itemPerPage < this.tableDefaultOptions.totalCount)
    ) {
      this.loadData(this.tableDefaultOptions.currentPage + 1);
    }
  }


  resetFilter() {
    this.filterForm.reset();
    this.data = [];
    this.loadData(1);
  }

  populationCategories = [{ _id: '1', name: '4M+' }, { _id: '2', name: '1M to 4M' }, { _id: '3', name: '100K to 1M' }, { _id: '4', name: '<100K' }];


  navigateTo(path, id, action) {
    this.router.navigate([path, id]);
  }
  sortedItem: any = {};
  sortTableData(item, sortBy) {
    item.sort = sortBy;
    this.sortedItem = { ...item };
    this.modifiedColumns.map(el => el.sort && el.key !== item.key ? delete el.sort : el);
    this.listFetchOption.sort = `${item.key}_${sortBy}`
    this.loadData()
  }
  getSortIcon(item) {
    return ["ULB Name", "State Name", "ULB Data Submitted (%)", "PMU Verification Progress",].includes(item.value);
  }

  onCardClick({ id, ...rest}) {
    console.log('id,rest', id, rest);
    this.dialog.open(DashboardComponent, {
      id: 'DashboardComponentModal',
      autoFocus: false,
      panelClass: 'table-dialog-container',
      data: {
        table: { ...tables?.find(table => table.id == id) },
        queryParams: removeFalsy(rest) || {}
      }
    });
  }

  onStateChange({ state, category }) {
    this.loadMapData({ state, category });
  }

  get modifiedColumns() {
    let columnsData = [];
    this.columnNamesList.forEach(element => {
      for (let key in this.columnNames) {
        if (this.columnNames[key] === element) {
          columnsData.push({
            key: key,
            value: this.columnNames[key]
          })
        }
      }
    });
    columnsData.map(e => e.key === this.sortedItem?.key ? e.sort = this.sortedItem.sort : e);
    return columnsData;
  }
  statusFilterList = [
    { _id: '1', name: 'Not Started' },
    { _id: "2", name: "In Progress" },
    { _id: "8", name: "Verification Not Started" },
    { _id: "9", name: "Verification In Progress" },
    { _id: "10", name: "Returned by PMU" },
    { _id: "11", name: "Submission Acknowledged by PMU" }
  ];
  columnNamesList = ["S No.", "ULB Name", "Census Code", "State Name", "Population Category", "ULB Data Submitted (%)", "PMU Verification Progress", "Status", "Action"];
}

