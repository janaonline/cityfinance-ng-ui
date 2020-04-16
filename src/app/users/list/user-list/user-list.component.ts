import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_TYPE } from 'src/app/models/user/userType';
import { IStateULBCovered } from 'src/app/shared/models/stateUlbConvered';
import { CommonService } from 'src/app/shared/services/common.service';
import { ULBSIGNUPSTATUS } from 'src/app/util/enums';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { UserService } from '../../../dashboard/user/user.service';
import { UserProfile } from '../../profile/model/user-profile';
import { ProfileService } from '../../profile/service/profile.service';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _profileService: ProfileService,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _commonService: CommonService,
    public _dialog: MatDialog
  ) {
    this.createRequestStatusTypeList();
    this._activatedRoute.params.subscribe(params => {
      this.initializeList(params.userType);
      this.initializeFilterForm();
      this.initializeListFetchParams();

      this.loggedInType = this._profileService.getLoggedInUserType();
      if (this.loggedInType === USER_TYPE.ULB) {
        return this.fetchULBProfileUpdateRequest();
      }
      this.fetchList(this.listFetchOption);
    });
  }
  userList: UserProfile[];
  filterForm: FormGroup;

  userTypes = USER_TYPE;

  userTypeList: any[] = [];
  listType: USER_TYPE;

  loggedInType: USER_TYPE;
  currentSort = 1;

  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null
  };

  listFetchOption = {
    filter: null,
    sort: null,
    role: null,
    skip: 0
  };

  stateList: IStateULBCovered[];

  statesByID: { [id: string]: IStateULBCovered } = {};
  requestStatusTypeList: {
    key: string;
    value: string;
  }[];

  userToDelete: { [key: string]: string };
  respone = {
    errorMessage: null,
    successMessage: null
  };

  private fetchULBProfileUpdateRequest() {
    // this._profileService.getULBProfileUpdateRequestList().subscribe(res => {
    //   console.log(res);
    // });
  }

  private initializeList(type: USER_TYPE) {
    for (const key in USER_TYPE) {
      if (USER_TYPE[key] === type) {
        this.listType = <USER_TYPE>USER_TYPE[key];
        break;
      }
    }

    if (!this.listType) {
      return this._router.navigate(["/home"]);
    }
  }

  ngOnInit() {}
  openUserDeleteConfirmationBox(template: TemplateRef<any>, user: any) {
    this.resetResponseMessages();
    this.userToDelete = user;
    this._dialog.open(template);
    this._dialog.afterAllClosed.subscribe(event => {
      this.userToDelete = null;
    });
  }

  public searchUsersBy(filterForm: {}) {
    this.listFetchOption.filter = filterForm;

    this.fetchList({ ...(<any>this.listFetchOption) });
  }

  sortListBy(key: string) {
    this.currentSort = this.currentSort > 0 ? -1 : 1;

    const values = {
      filter: this.filterForm.value,
      sort: { [key]: this.currentSort },
      role: this.listType,
      skip:
        (this.tableDefaultOptions.currentPage - 1) *
        this.tableDefaultOptions.itemPerPage
    };
    this.listFetchOption = values;
    this.searchUsersBy(values.filter);
  }

  setPage(pageNoClick: number) {
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip =
      (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    this.searchUsersBy(this.filterForm.value);
  }

  public deleteUser(userId: string) {
    this.resetResponseMessages();
    this._profileService.deleteUser({ userId }).subscribe(
      res => {
        this._dialog.closeAll();
        this.fetchList(this.listFetchOption);
      },
      err => (this.respone.errorMessage = err.error.message || "Server Error")
    );
  }

  private fetchList(
    body: {
      filter: { [key: string]: string };
      sort: { [key: string]: number };
      role?: USER_TYPE;
    } = { filter: {}, sort: {} }
  ) {
    const util = new JSONUtility();
    body.filter = util.filterEmptyValue(body.filter);

    this._userService.getUsers(body).subscribe(res => {
      if (res.hasOwnProperty("total")) {
        this.tableDefaultOptions.totalCount = res["total"];
      }
      if (res["success"]) {
        this.userList = res["data"];
      } else {
        alert("Failed");
      }
    });
  }

  private initializeFilterForm() {
    switch (this.listType) {
      case USER_TYPE.USER:
        return this.initializeUserFilterForm();
      case USER_TYPE.ULB:
        this.fetchStateList();
        this.initializeULBFilterForm();
        return;
      case USER_TYPE.STATE:
        this.initializeStateFilterForm();
        this.fetchStateList();
        return;
      case USER_TYPE.PARTNER:
        this.initializePartnerFilterForm();
        break;
      case USER_TYPE.MoHUA:
        this.initializeMoHUAFilterForm();
        break;
    }
  }

  private fetchStateList() {
    this._commonService.getStateUlbCovered().subscribe(res => {
      this.stateList = res.data;
      res.data.forEach(state => {
        this.statesByID[state._id] = state;
      });
    });
  }

  private initializeUserFilterForm() {
    this.filterForm = this._fb.group({
      name: [null],
      email: [null],
      designation: [null],
      organization: [null]
    });
  }

  private initializeULBFilterForm() {
    this.filterForm = this._fb.group({
      name: [null],
      ulbCode: [null],
      status: [""],
      state: [null]
    });
  }

  private initializeStateFilterForm() {
    this.filterForm = this._fb.group({
      name: [null],
      email: [null],
      designation: [null],
      state: [null],
      departmentName: [null]
    });
  }

  private initializePartnerFilterForm() {
    this.filterForm = this._fb.group({
      name: [null],
      email: [null],
      designation: [null]
    });
  }

  private initializeMoHUAFilterForm() {
    this.filterForm = this._fb.group({
      name: [null],
      email: [null],
      designation: [null]
    });
  }

  private initializeListFetchParams() {
    this.listFetchOption = {
      role: this.listType,
      filter: this.filterForm ? this.filterForm.value : {},
      sort: null,
      skip: 0
    };
  }

  private createRequestStatusTypeList() {
    this.requestStatusTypeList = Object.keys(ULBSIGNUPSTATUS).map(key => ({
      key,
      value: key
    }));
  }

  public downloadList() {
    const params = { ...this.listFetchOption };
    delete params["skip"];

    const url = this._userService.getURLForUserList(params);
    return window.open(url);
  }

  private resetResponseMessages() {
    this.respone.errorMessage = null;
    this.respone.successMessage = null;
  }
}
