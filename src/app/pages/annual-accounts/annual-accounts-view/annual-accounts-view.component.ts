import { Component, OnInit } from '@angular/core';
import { IStateULBCovered } from 'src/app/shared/models/stateUlbConvered';
import { CommonService } from 'src/app/shared/services/common.service';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { AnnualAccountsService } from '../annual-accounts.service';

@Component({
  selector: "app-annual-accounts-view",
  templateUrl: "./annual-accounts-view.component.html",
  styleUrls: ["./annual-accounts-view.component.scss"],
})
export class AnnualAccountsViewComponent implements OnInit {
  dataSource;
  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };
  listFetchOption = {
    filter: null,
    // sort: null,
    // role: null,
    skip: 0,
    limit: this.tableDefaultOptions.itemPerPage,
  };
  canOpen = false;
  filteredData: any;

  stateList: IStateULBCovered[] = [];

  constructor(
    private annualAccountsService: AnnualAccountsService,
    private _commonService: CommonService
  ) {}

  ngOnInit() {
    this.getAnnualAccountsList(this.listFetchOption);
    this.fetchStateList();
  }

  getAnnualAccountsList(body) {
    const util = new JSONUtility();
    body.filter = util.filterEmptyValue(body.filter);
    this.annualAccountsService.getAnnualAccounts(body).subscribe(
      (response) => {
        this.dataSource = response["data"];
        if (response.hasOwnProperty("total")) {
          this.tableDefaultOptions.totalCount = response["total"];
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchStateList() {
    this._commonService.getStateUlbCovered().subscribe((res) => {
      this.stateList = res.data;
    });
  }

  filterData(state, bodyType, skip) {
    const body = { state: state, bodyType: bodyType };
    this.listFetchOption.filter = body;
    this.listFetchOption.skip =
      skip || skip === 0 ? skip : this.listFetchOption.skip;
    this.getAnnualAccountsList(this.listFetchOption);
  }

  setPage(pageNoClick: number) {
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip =
      (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    this.getAnnualAccountsList(this.listFetchOption);
  }

  openModal(id) {
    this.filteredData = null;
    this.canOpen = true;
    const data = this.dataSource.find((item) => item._id == id);
    this.filteredData = data;
  }
  onClosingModal(event?) {
    if (event.keyCode == 27 || event.type == "click") {
      this.filteredData = null;
      this.canOpen = false;
    }
  }

  downloadList() {
    const filterOptions = { ...this.listFetchOption, download: true };
    const url = this.annualAccountsService.getAnnualAccountsApi(filterOptions);
    return window.open(url);
  }
}
