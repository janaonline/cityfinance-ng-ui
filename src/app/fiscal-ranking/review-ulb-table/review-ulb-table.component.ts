import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { State2223Service } from 'src/app/newPagesFc/xvfc2223-state/state-services/state2223.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';

@Component({
  selector: 'app-review-ulb-table',
  templateUrl: './review-ulb-table.component.html',
  styleUrls: ['./review-ulb-table.component.scss']
})
export class ReviewUlbTableComponent implements OnInit {
  formId = "63d8eabeee320e56e357b34e";
  data;
  columnNames
  stateId = '5dcf9d7216a06aed41c748e2';
  stateList = [];
  userData;
  title = '';

  perPage: '10' | '25' | '50' | '100' | 'all' = '10';
  filterForm: FormGroup;
  isLoader: boolean = false;
  max = Math.max;



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
    private _commonService: CommonService) {
  }
  ngOnInit(): void {
    this.filterForm = this._fb.group({
      ulbName: [""],
      stateName: [""],
      ulbCode: [""],
      ulbType: [""],
      populationType: [""],
      ua_name_s: [""],
      status_s: [""],
      filled_1: [""],
      filled_2: [""],
    });
    this.fetchStateList();
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.loadData();
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

  loadData(pageNumber?: number) {
    if (pageNumber) {
      this.tableDefaultOptions.currentPage = pageNumber;
      this.listFetchOption.skip = (pageNumber - 1) * this.tableDefaultOptions.itemPerPage;
    }
    const payload = {
      formId: this.formId,
      stateId: this.stateId,
      design_year: this.design_year,
      ...this.filterForm.getRawValue(),
      ...this.listFetchOption
    };
    console.log(payload)
    this.isLoader = true;
    this.commonService.getFrUlbs(payload).subscribe(res => {
      this.isLoader = false;
      this.data = (this.isInfiniteScroll ? [...this.data, ...res["data"]] : res["data"]);
      this.columnNames = res["columnNames"];
      this.title = res["title"];
      this.tableDefaultOptions.totalCount = res["total"];
      console.log(this.data)
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



  keepOriginalOrder = (a, b) => a.key;

  onPerPageChange() {
    this.data = [];
    this.tableDefaultOptions.itemPerPage = this.isInfiniteScroll ? 10 : +this.perPage;
    this.loadData(1);
  }

  download() {

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
}

