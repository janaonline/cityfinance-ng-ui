import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IULBType } from 'src/app/models/ulbs/type';
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
  styleUrls: ["./profile-request.component.scss"]
})
export class ProfileRequestComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _profileService: ProfileService,
    private _router: Router,
    private _dialog: MatDialog,
    public modalService: BsModalService,
    public _fb: FormBuilder
  ) {
    this.initializeFilterForm();
    this.initializeListFetchParams();
    this._activatedRoute.queryParams.subscribe(params => {
      this.resetDatas();

      if (params.requestId) {
        this.fetchULBProfileRequest(params.requestId);
        this.fetchulbTypeList();
      } else {
        this.fetchRequestList(this.listFetchOption);
      }
    });
  }
  REQUEST_STATUS = REQUEST_STATUS;
  window = window;

  filterForm: FormGroup;
  request: IFullULBProfileRequest;
  requestList: IULBProfileRequest[];
  ulbTypeList: { [id: string]: IULBType } = {};

  canApproveRequest: "readOnly" | "write";
  accessChecker = new AccessChecker();

  requestIDToCancel: string;

  listFetchOption = {
    filter: null,
    sort: null,
    skip: 0
  };

  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null
  };
  currentSort = 1;

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
        this.tableDefaultOptions.currentPage *
        this.tableDefaultOptions.itemPerPage
    };
    this.listFetchOption = values;
    this.fetchRequestList(values);
  }

  openRequestCancelPopup(ModalRef: TemplateRef<any>, requestID: string) {
    this.requestIDToCancel = requestID;
    this.modalService.show(ModalRef);
    // return this._dialog.open(DialogComponent, {
    //   data: { message: alertMessage }
    // });
  }

  updateRequest(params: { status: string; id: string }) {
    return this._profileService
      .updateULBProfileRequest(params)
      .subscribe(res => {
        const requestFound = this.requestList.find(
          request => request._id === params.id
        );
        requestFound.status = params.status;
        this.modalService.hide(1);
      });
  }

  fetchRequestList(body: { [key: string]: any }) {
    const util = new JSONUtility();
    console.log(`fetchRequestList`);
    body.filter = util.filterEmptyValue(body.filter);
    console.log(`fetchRequestList`, { ...body });

    this._profileService.getULBProfileUpdateRequestList(body).subscribe(res => {
      this.requestList = res.data;
    });
  }

  fetchULBProfileRequest(requestId: string) {
    this._profileService.getULBProfileUpdateRequest(requestId).subscribe(
      res => {
        this.request = res;
        console.log(this.request);
      }
      // err => this._router.navigate(['/home'])
    );
  }

  fetchulbTypeList() {
    this._profileService.getULBTypeList().subscribe(res => {
      if (res.data && res.data.length) {
        res.data.forEach(type => {
          this.ulbTypeList[type._id] = type;
        });
      }
    });
  }
  ngOnInit() {}

  initializeMode() {
    const moduleName = MODULES_NAME.ULB_PROFILE;
    const action = ACTIONS.APPROVE;
    const hasAccess = this.accessChecker.hasAccess({ moduleName, action });
    this.canApproveRequest = hasAccess ? "write" : "readOnly";
  }

  setPage(pageNoClick: number) {
    console.log(pageNoClick);
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip =
      (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    this.searchUsersBy(this.filterForm.value);
  }

  private initializeFilterForm() {
    this.filterForm = this._fb.group({
      status: [""]
    });
  }

  private initializeListFetchParams() {
    this.listFetchOption = {
      filter: this.filterForm ? this.filterForm.value : {},
      sort: null,
      skip: 0
    };
  }
}
