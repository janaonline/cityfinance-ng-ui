import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IUserLoggedInDetails } from "src/app/models/login/userLoggedInDetails";
import { IState } from "src/app/models/state/state";
import { USER_TYPE } from "src/app/models/user/userType";
import { CommonService } from "src/app/shared/services/common.service";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
import { ProfileService } from "src/app/users/profile/service/profile.service";
import { UserUtility } from "src/app/util/user/user";

@Component({
  selector: "app-xvfc2223-state",
  templateUrl: "./xvfc2223-state.component.html",
  styleUrls: ["./xvfc2223-state.component.scss"],
})
export class Xvfc2223StateComponent implements OnInit, OnDestroy {
  constructor(
    private newCommonService: NewCommonService,
    private profileService: ProfileService,
    private _commonService: CommonService,
    private router: Router
  ) {
    this.initializeUserType();
    this.fetchStateList();
    this.initializeLoggedInUserDataFetch();
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.leftMenu = JSON.parse(localStorage.getItem("leftStateMenuRes"));
    this.stateName = sessionStorage.getItem("stateName");
    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
    }
  }
  states: { [staeId: string]: IState };
  userLoggedInDetails: IUserLoggedInDetails;
  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;
  userData;
  leftMenu;
  stateName = '';
  stateFormId = '';
  path = '';
  stateSubs;
  stateId;
  ngOnInit(): void {
    this.path = sessionStorage.getItem("path2");
    this.stateFormId = sessionStorage.getItem("Stateform_id");
    this.stateSubs = this.newCommonService.setStateFormStatus2223.subscribe((res) => {
      if (res == true) {
        this.getStateBar(this.stateId, "STATE", "");
        // console.log("form status 2", res);
        //  this.getSideBar();
      }
    });
    this.getStateBar(this.stateId, "STATE", "");
  }
  ngOnDestroy() {
    this.stateSubs.unsubscribe();

  }
  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
    // console.log(this._router.url);
  }
  private initializeLoggedInUserDataFetch() {
    UserUtility.getUserLoggedInData().subscribe((data) => {
      this.userLoggedInDetails = data;
      //console.log("hi", data);
    });
  }
  private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.states = {};
      res.forEach((state) => (this.states[state._id] = state));
      localStorage.setItem('state_name', this.states[this.userLoggedInDetails["state"]]?.name)
      localStorage.setItem('state_code', this.states[this.userLoggedInDetails["state"]]?.code)
    });
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   debugger
  //   this.leftMenu = JSON.parse(localStorage.getItem("leftStateMenuRes"));
  // }
  backStatePage() {
    if (this.loggedInUserType !== this.userTypes.STATE) {
      this.router.navigate(['mohua2223/review-state-form'], { queryParams: { formId: this.stateFormId } });
    }
  }
  getStateBar(id, role, isUA) {
    this.newCommonService.getLeftMenu(id, role, isUA).subscribe((res: any) => {
      console.log("left responces..", res);
      this.leftMenu = res?.data;
      localStorage.setItem("leftStateMenuRes", JSON.stringify(res?.data));
    });
  }

}
