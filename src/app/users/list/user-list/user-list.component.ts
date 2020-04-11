import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_TYPE } from 'src/app/models/user/userType';

import { UserService } from '../../../dashboard/user/user.service';
import { UserProfile } from '../../profile/model/user-profile';
import { ProfileService } from '../../profile/service/profile.service';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  userList: UserProfile[];
  filterForm: FormGroup;

  userTypes = USER_TYPE;

  userTypeList: any[] = [];
  listType: USER_TYPE;

  loggedInType: USER_TYPE;

  constructor(
    private _userService: UserService,
    private _profileService: ProfileService,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._activatedRoute.params.subscribe(params => {
      this.initializeList(params.userType);
      this.initializeFilterForm();
      const type = this._profileService.getLoggedInUserType();
      if (type === USER_TYPE.ULB) {
        this.fetchULBProfileUpdateRequest();
      }
    });
  }

  private fetchULBProfileUpdateRequest() {
    this._profileService.getULBProfileUpdateRequestList().subscribe(res => {
      console.log(res);
    });
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
    this.fetchList({ role: this.listType });
  }

  ngOnInit() {}

  public searchUsersBy(params: {}) {
    this.fetchList(params);
  }

  setPage(pageNoClick: number) {}

  private fetchList(body: { [key: string]: string } = {}) {
    this._userService.getUsers(body).subscribe(res => {
      console.log(res);
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
        return this.initializeULBFilterForm();
    }
  }

  private initializeUserFilterForm() {
    this.filterForm = this._fb.group({
      name: [null],
      email: [null],
      designation: [null],
      organisationName: [null]
    });
  }

  private initializeULBFilterForm() {
    this.filterForm = this._fb.group({
      name: [null],
      email: [null],
      designation: [null],
      organisationName: [null]
    });
  }
}
