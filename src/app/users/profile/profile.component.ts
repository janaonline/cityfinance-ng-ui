import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { USER_TYPE } from '../../models/user/userType';
import { ProfileService } from './service/profile.service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  USER_TYPE = USER_TYPE;
  userType: USER_TYPE;

  profileData = null;
  showProfileComponent = false;
  profileType: USER_TYPE;

  profileMode: "view" | "create";
  listFetchOption = {
    filter: null,
    sort: null,
    skip: 0
  };

  filterForm: FormGroup;

  constructor(
    private _profileService: ProfileService,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this._activatedRoute.params.subscribe(params => {
      this.initializeFilterForm();
      this.profileMode = params.type;
      this.setFormView();

      this._activatedRoute.queryParams.subscribe(queryParams => {
        const param = { _id: null, role: null };
        console.log({ queryParams, params });
        this.profileType = queryParams.role;

        if (this.profileMode === "create") {
          if (!queryParams || !queryParams.role) {
            return;
          }
        }

        if (queryParams && queryParams.id && queryParams.role) {
          param._id = queryParams.id;
          param.role = queryParams.role;
        }
        console.log(queryParams);
        this.initializeListFetchParams();
        this.fetchProfileData(param);
      });
    });
  }

  ngOnInit() {}

  fetchProfileData(params: {}) {
    this._profileService.getUserProfile(params).subscribe(res => {
      this.profileData = res["data"];

      this.userType = res["data"].role;
    });
  }

  private setFormView() {
    this.userType = this._profileService.getLoggedInUserType();
  }

  private initializeFilterForm() {
    this.filterForm = this._fb.group({
      status: [null]
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
