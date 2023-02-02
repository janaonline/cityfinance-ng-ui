import { Component, OnInit } from '@angular/core';
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
  reviewTableName = 'Review Grant Application';

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
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private stateServices: State2223Service,
    private _commonService: CommonService) {
  }
  ngOnInit(): void {
    this.filterForm = this._fb.group({
      ulb_name_s: [""],
      state_name_s: [""],
      ulb_code_s: [""],
      ulbType_s: [""],
      population_type_s: [""],
      ua_name_s: [""],
      status_s: [""],
      filled_1: [""],
      filled_2: [""],
    });
    this.fetchStateList();
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.loadData();
  }

  get year() {
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

  loadData() {
    this.commonService.getFrUlbs({
      formId: this.formId,
      stateId: this.stateId,
      year: this.year
    }).subscribe(res => {
      this.data = res["data"];
      this.columnNames = res["columnNames"];
      console.log(this.data)
    }, err => {
      console.log(err.message);
    }
    );
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

  }

  download() {

  }

  handleScroll(event) {

  }

  search() {
    const payload = { ...this.filterForm.getRawValue(), ...this.listFetchOption };
    console.log(payload);
  }

  resetFilter() {
    this.filterForm.reset();
    this.search();
  }
}

