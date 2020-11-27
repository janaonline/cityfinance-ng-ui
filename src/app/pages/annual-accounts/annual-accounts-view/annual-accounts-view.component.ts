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
  constructor(
    private annualAccountsService: AnnualAccountsService,
    private _commonService: CommonService
  ) {}
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

  isApiInProgress = false;

  anyDcoumentUploaded = false;

  ngOnInit() {
    this.getAnnualAccountsList(this.listFetchOption);
    this.fetchStateList();
  }

  getAnnualAccountsList(body) {
    this.isApiInProgress = true;
    const util = new JSONUtility();
    body.filter = util.filterEmptyValue(body.filter);
    this.annualAccountsService.getAnnualAccounts(body).subscribe(
      (response) => {
        this.isApiInProgress = false;
        this.dataSource = response["data"];
        if (response.hasOwnProperty("total")) {
          this.tableDefaultOptions.totalCount = response["total"];
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  hasUserUploadedAnyDocumnet() {
    const documents = { ...this.filteredData.documents };
    return Object.keys(documents).some((FinancialYear) => {
      const pdf = documents[FinancialYear].pdf || [];
      const excel = documents[FinancialYear].excel || [];
      if (pdf.length || excel.length) return true;
      return false;
    });
  }

  fetchStateList() {
    this._commonService.getStateUlbCovered().subscribe((res) => {
      this.stateList = res.data;
    });
  }

  filterData(state, bodyType, ulbName, parastatalName, skip) {
    const body = {
      state: state,
      bodyType: bodyType,
      ulbName: ulbName,
      parastatalName: parastatalName,
    };
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
    this.anyDcoumentUploaded = this.hasUserUploadedAnyDocumnet();
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
