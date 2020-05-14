import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IULBType } from 'src/app/models/ulbs/type';
import { USER_TYPE } from 'src/app/models/user/userType';
import { IStateULBCovered } from 'src/app/shared/models/stateUlbConvered';
import { CommonService } from 'src/app/shared/services/common.service';
import { AccessChecker } from 'src/app/util/access/accessChecker';
import { ACTIONS } from 'src/app/util/access/actions';
import { MODULES_NAME } from 'src/app/util/access/modules';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { IFullULBProfileRequest, IULBProfileRequest } from '../../../../models/ulbs/ulb-request-update';
import { REQUEST_STATUS } from '../../../../util/enums';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: "app-profile-request",
  templateUrl: "./profile-request.component.html",
  styleUrls: ["./profile-request.component.scss"],
})
export class ProfileRequestComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _profileService: ProfileService,

    public modalService: BsModalService,
    public _fb: FormBuilder,
    private _commonService: CommonService
  ) {
    this.initializeAccessCheck();
    this.fetchStateList();
    this.createRequestStatusTypeList();
    this.loggedInUserType = this._profileService.getLoggedInUserType();
    this.initializeListFetchParams();
    this._activatedRoute.queryParams.subscribe((params) => {
      this.resetDatas();
      this.initializeFilterForm();

      if (params.requestId) {
        this.fetchULBProfileRequest(params.requestId);
        this.fetchulbTypeList();
      } else {
        this.fetchRequestList(this.listFetchOption);
      }
    });
  }
  REQUEST_STATUS = REQUEST_STATUS;
  userTypes = USER_TYPE;
  window = window;

  filterForm: FormGroup;
  request: IFullULBProfileRequest;
  requestList: IULBProfileRequest[];
  ulbTypeList: { [id: string]: IULBType } = {};

  canApproveRequest: "readOnly" | "write";
  canViewULBSignUpList = false;
  accessChecker = new AccessChecker();

  requestIDToCancel: string;

  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };

  listFetchOption = {
    filter: null,
    sort: null,
    skip: 0,
    limit: this.tableDefaultOptions.itemPerPage,
  };
  currentSort = 1;
  loggedInUserType: USER_TYPE;

  respone = {
    errorMessage: null,
    successMessage: null,
  };

  requestStatusTypeList: {
    key: string;
    value: string;
  }[];

  stateList: IStateULBCovered[];
  statesByID: { [id: string]: IStateULBCovered } = {};

  resetDatas() {
    this.requestList = null;
    this.request = null;
  }

  public searchUsersBy(filterForm: {}) {
    this.listFetchOption.filter = filterForm;

    this.fetchRequestList({ ...(<any>this.listFetchOption) });
  }

  sortListBy(key: string) {
    this.currentSort = this.currentSort > 0 ? -1 : 1;
    const values = {
      filter: this.filterForm.value,
      sort: { [key]: this.currentSort },
      skip:
        (this.tableDefaultOptions.currentPage - 1) *
        this.tableDefaultOptions.itemPerPage,
      limit: this.tableDefaultOptions.itemPerPage,
    };
    this.listFetchOption = values;
    this.fetchRequestList(values);
  }

  openRequestCancelPopup(ModalRef: TemplateRef<any>, requestID: string) {
    this.resetResponseMessages();

    this.requestIDToCancel = requestID;
    this.modalService.show(ModalRef);
  }

  updateRequest(params: { status: string; id: string }) {
    this.resetResponseMessages();

    return this._profileService.updateULBProfileRequest(params).subscribe(
      (res) => {
        const requestFound = this.requestList.find(
          (request) => request._id === params.id
        );
        if (!requestFound) {
          return;
        }
        requestFound.status = params.status;
        this.modalService.hide(1);
      },
      (err) => (this.respone.errorMessage = err.error.message || "Server Error")
    );
  }

  fetchRequestList(body: { [key: string]: any }) {
    this.resetResponseMessages();
    const util = new JSONUtility();
    body.filter = util.filterEmptyValue(body.filter);

    this._profileService
      .getULBProfileUpdateRequestList(body)
      .subscribe((res) => {
        if (res.total) {
          this.tableDefaultOptions.totalCount = res.total;
        }

        this.requestList = res.data;
      });
  }

  fetchULBProfileRequest(requestId: string) {
    this._profileService
      .getULBProfileUpdateRequest(requestId)
      .subscribe((res) => {
        this.request = res;
      });
  }

  fetchulbTypeList() {
    this._profileService.getULBTypeList().subscribe((res) => {
      if (res.data && res.data.length) {
        res.data.forEach((type) => {
          this.ulbTypeList[type._id] = type;
        });
      }
    });
  }
  ngOnInit() {}

  initializeAccessCheck() {
    const hasAccess = this.accessChecker.hasAccess({
      moduleName: MODULES_NAME.ULB,
      action: ACTIONS.APPROVE,
    });

    this.canApproveRequest = hasAccess ? "write" : "readOnly";
    this.canViewULBSignUpList = this.accessChecker.hasAccess({
      moduleName: MODULES_NAME.ULB_SIGNUP_REQUEST,
      action: ACTIONS.VIEW,
    });
  }

  setPage(pageNoClick: number) {
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip =
      (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    this.searchUsersBy(this.filterForm.value);
  }

  private fetchStateList() {
    this._commonService.getStateUlbCovered().subscribe((res) => {
      this.stateList = res.data;
      res.data.forEach((state) => {
        this.statesByID[state._id] = state;
      });
    });
  }

  private initializeFilterForm() {
    if (this.loggedInUserType === USER_TYPE.ULB) {
      this.filterForm = this._fb.group({
        status: [""],
      });
      return;
    }

    this.filterForm = this._fb.group({
      state: [""],
      ulbName: [""],
      ulbCode: [],
      status: [""],
    });
  }

  private initializeListFetchParams() {
    this.listFetchOption = {
      filter: this.filterForm ? this.filterForm.value : {},
      sort: null,
      skip: 0,
      limit: this.tableDefaultOptions.itemPerPage,
    };
  }

  private resetResponseMessages() {
    this.respone.errorMessage = null;
    this.respone.successMessage = null;
  }

  private createRequestStatusTypeList() {
    this.requestStatusTypeList = Object.keys(REQUEST_STATUS).map((key) => ({
      key,
      value: key,
    }));
  }

  public downloadList() {
    const params = { ...this.listFetchOption, limit: null };
    delete params["skip"];

    const url = this._profileService.getURLForUlbUpdateRequestList(params);
    return window.open(url);
  }
}
