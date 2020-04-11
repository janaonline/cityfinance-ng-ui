import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IULBType } from 'src/app/models/ulbs/type';
import { AccessChecker } from 'src/app/util/access/accessChecker';
import { ACTIONS } from 'src/app/util/access/actions';
import { MODULES_NAME } from 'src/app/util/access/modules';

import { IULBProfileRequest } from '../../../../models/ulbs/ulb-request-update';
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
    public modalService: BsModalService
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      this.resetDatas();

      if (params.requestId) {
        this.fetchULBProfileRequest(params.requestId);
        this.fetchulbTypeList();
      } else {
        this.fetchRequestList();
      }
    });
  }
  request: IULBProfileRequest;
  requestList: IULBProfileRequest[];
  ulbTypeList: { [id: string]: IULBType } = {};
  filterForm: FormGroup;

  canApproveRequest: "readOnly" | "write";
  accessChecker = new AccessChecker();

  requestIDToCancel: string;

  resetDatas() {
    this.requestList = null;
    this.request = null;
  }

  searchUsersBy(params: {}) {}

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
      });
  }

  fetchRequestList() {
    this._profileService.getULBProfileUpdateRequestList().subscribe(res => {
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
}
