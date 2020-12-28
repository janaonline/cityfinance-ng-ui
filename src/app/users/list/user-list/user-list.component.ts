import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { USER_TYPE } from 'src/app/models/user/userType';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IDialogConfiguration } from 'src/app/shared/components/dialog/models/dialogConfiguration';
import { IStateULBCovered } from 'src/app/shared/models/stateUlbConvered';
import { CommonService } from 'src/app/shared/services/common.service';
import { AccessChecker } from 'src/app/util/access/accessChecker';
import { ACTIONS } from 'src/app/util/access/actions';
import { MODULES_NAME } from 'src/app/util/access/modules';
import { BaseComponent } from 'src/app/util/baseComponent';
import { ULBSIGNUPSTATUS } from 'src/app/util/enums';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { UserService } from '../../../dashboard/user/user.service';
import { IULBProfileData } from '../../profile/model/ulb-profile';
import { UserProfile } from '../../profile/model/user-profile';
import { ProfileService } from '../../profile/service/profile.service';
import { SidebarUtil } from '../../utils/sidebar.util';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent extends BaseComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _profileService: ProfileService,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _commonService: CommonService,
    public _dialog: MatDialog
  ) {
    super();
    SidebarUtil.showSidebar();

    this.createRequestStatusTypeList();
    this._activatedRoute.params.subscribe((params) => {
      this.resetTableOption();
      this.initializeList(params.userType);
      this.initializeFilterForm();
      this.initializeListFetchParams();

      this.loggedInType = this._profileService.getLoggedInUserType();
      // if (this.loggedInType === USER_TYPE.ULB) {
      //   return this.fetchULBProfileUpdateRequest();
      // }
      this.initializeAccessChecks();
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
    totalCount: null,
  };

  listFetchOption = {
    filter: null,
    sort: null,
    role: null,
    skip: 0,
    limit: this.tableDefaultOptions.itemPerPage,
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
    successMessage: null,
  };

  SINGPUP_STATUS = ULBSIGNUPSTATUS;

  // ACCESS
  canDeleteUser = false;
  canEditProfile = false;

  userListSubscription: Subscription;

  ngOnInit() {}
  openUserDeleteConfirmationBox(template: TemplateRef<any>, user: any) {
    this.resetResponseMessages();
    this.userToDelete = user;
    this._dialog.open(template);
    this._dialog.afterAllClosed.subscribe((event) => {
      this.userToDelete = null;
    });
  }

  searchUsersBy(filterForm: {}, skip?: number) {
    this.listFetchOption.filter = filterForm;
    this.listFetchOption.skip =
      skip || skip === 0 ? skip : this.listFetchOption.skip;

    this.fetchList({ ...(<any>this.listFetchOption) });
  }

  sortListBy(key: string) {
    this.currentSort = this.currentSort > 0 ? -1 : 1;

    const values = {
      filter: this.filterForm.value,
      sort: { [key]: this.currentSort },
      role: this.listType,
      limit: this.tableDefaultOptions.itemPerPage,
      skip:
        (this.tableDefaultOptions.currentPage - 1) *
        this.tableDefaultOptions.itemPerPage,
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

  downloadList() {
    const params = { ...this.listFetchOption };
    delete params["skip"];

    const url = this._userService.getURLForUserList(params);
    return window.open(url);
  }

  deleteUser(userId: string) {
    this.resetResponseMessages();
    if (!this.canDeleteUser) {
      return false;
    }
    this._profileService.deleteUser({ userId }).subscribe(
      (res) => {
        this._dialog.closeAll();
        this.fetchList(this.listFetchOption);
      },
      (err) => (this.respone.errorMessage = err.error.message || "Server Error")
    );
  }

  showUserRejectReason(user: IULBProfileData) {
    if (user.status !== this.SINGPUP_STATUS.REJECTED) {
      return false;
    }
    const reason = user.rejectReason
      ? user.rejectReason
      : "No reason available";
    const configuration: IDialogConfiguration = {
      message: `<h3 class="text-center linkColor">Reason for Rejection</h3> <p class="text-center">${reason}</p>`,
      buttons: { cancel: { text: "Close" } },
    };
    this._dialog.open(DialogComponent, {
      height: "fit-content",
      width: "31vw",
      minHeight: "175px",
      data: configuration,
    });
  }

  private fetchList(
    body: {
      filter: { [key: string]: string };
      sort: { [key: string]: number };
      role?: USER_TYPE;
    } = { filter: {}, sort: {} }
  ) {
    this.isApiInProgress = true;
    const util = new JSONUtility();
    body.filter = util.filterEmptyValue(body.filter);
    if (this.userListSubscription) {
      this.userListSubscription.unsubscribe();
    }

    this.userListSubscription = this._userService
      .getUsers(body)
      .subscribe((res) => {
        this.isApiInProgress = false;
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
    this._commonService.getStateUlbCovered().subscribe((res) => {
      this.stateList = res.data;
      res.data.forEach((state) => {
        this.statesByID[state._id] = state;
      });
    });
  }

  private initializeUserFilterForm() {
    this.filterForm = this._fb.group({
      name: [null],
      email: [null],
      designation: [null],
      organization: [null],
    });
  }

  private initializeULBFilterForm() {
    this.filterForm = this._fb.group({
      name: [null],
      ulbCode: [null],
      status: [""],
      state: [""],
      censusCode: [null],
      sbCode: [null],
    });
  }

  private initializeStateFilterForm() {
    this.filterForm = this._fb.group({
      name: [null],
      email: [null],
      designation: [null],
      state: [""],
      departmentName: [null],
    });
  }

  private initializePartnerFilterForm() {
    this.filterForm = this._fb.group({
      name: [null],
      email: [null],
      designation: [null],
      departmentName: [null],
    });
  }

  private initializeMoHUAFilterForm() {
    this.filterForm = this._fb.group({
      name: [null],
      email: [null],
      designation: [null],
    });
  }

  private initializeListFetchParams() {
    this.listFetchOption = {
      role: this.listType,
      filter: this.filterForm ? this.filterForm.value : {},
      sort: null,
      skip: 0,
      limit: this.tableDefaultOptions.itemPerPage,
    };
  }

  private createRequestStatusTypeList() {
    this.requestStatusTypeList = Object.keys(ULBSIGNUPSTATUS).map((key) => ({
      key,
      value: key,
    }));
  }

  private resetResponseMessages() {
    this.respone.errorMessage = null;
    this.respone.successMessage = null;
  }

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

  private resetTableOption() {
    this.tableDefaultOptions = {
      itemPerPage: 10,
      currentPage: 1,
      totalCount: null,
    };
  }

  private initializeAccessChecks() {
    const accessChecker = new AccessChecker();
    this.canDeleteUser = accessChecker.hasAccess({
      action: ACTIONS.DELETE,
      moduleName: <MODULES_NAME>(<any>this.listType),
    });

    this.canEditProfile = accessChecker.hasAccess({
      action: ACTIONS.EDIT,
      moduleName: <MODULES_NAME>(<any>this.listType),
    });
  }
}
