import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IUserLoggedInDetails } from "src/app/models/login/userLoggedInDetails";
import { IState } from "src/app/models/state/state";
import { USER_TYPE } from "src/app/models/user/userType";
import { CommonService } from "src/app/shared/services/common.service";
import { ProfileService } from "src/app/users/profile/service/profile.service";
import { UserUtility } from "src/app/util/user/user";
import { NewCommonService } from "../../shared2223/services/new-common.service";
@Component({
  selector: "app-xvfc2223-ulb",
  templateUrl: "./xvfc2223-ulb.component.html",
  styleUrls: ["./xvfc2223-ulb.component.scss"],
})
export class Xvfc2223UlbComponent implements OnInit {
  // leftMenu: any = {
  //   success: true,
  //   data: {
  //     "": [
  //       {
  //         _id: "62aa29ac82b30b29a283a841",
  //         isActive: true,
  //         name: "Overview",
  //         category: "",
  //         url: "overview",
  //         role: "ULB",
  //         position: 1,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //     ],
  //     "Entry Level Conditions": [
  //       {
  //         _id: "62aa1bbec9a98b2254632a86",
  //         isActive: true,
  //         name: "Grant Transfer Certificate",
  //         category: "Entry Level Conditions",
  //         url: "grant-tra-certi",
  //         role: "ULB",
  //         position: 1,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //       {
  //         _id: "62aa1b04729673217e5ca3aa",
  //         isActive: true,
  //         name: "Annual Accounts",
  //         category: "Entry Level Conditions",
  //         url: "annual_acc",
  //         role: "ULB",
  //         position: 2,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //       {
  //         _id: "62aa1c96c9a98b2254632a8a",
  //         isActive: true,
  //         name: "Detailed Utilisation Report",
  //         category: "Entry Level Conditions",
  //         url: "utilisation-report",
  //         role: "ULB",
  //         position: 3,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //       {
  //         _id: "62aa1cc9c9a98b2254632a8e",
  //         isActive: true,
  //         name: "Linking of PFMS Account",
  //         category: "Entry Level Conditions",
  //         url: "pfms_acc",
  //         role: "ULB",
  //         position: 4,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //       {
  //         _id: "62aa1ceac9a98b2254632a92",
  //         isActive: true,
  //         name: "Property Tax Operationalisation",
  //         category: "Entry Level Conditions",
  //         url: "ptax",
  //         role: "ULB",
  //         position: 5,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //     ],
  //     "Performance Conditions": [
  //       {
  //         _id: "62aa1dadc9a98b2254632aa6",
  //         isActive: true,
  //         name: "SLBs for Water Supply and Sanitation",
  //         category: "Performance Conditions",
  //         url: "slbs",
  //         role: "ULB",
  //         position: 1,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //       {
  //         _id: "62aa1dc0c9a98b2254632aaa",
  //         isActive: true,
  //         name: "Open Defecation Free (ODF)",
  //         category: "Performance Conditions",
  //         url: "odf",
  //         role: "ULB",
  //         position: 2,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //       {
  //         _id: "62aa1dd6c9a98b2254632aae",
  //         isActive: true,
  //         name: "Garbage Free City (GFC)",
  //         category: "Performance Conditions",
  //         url: "gfc",
  //         role: "ULB",
  //         position: 3,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //     ],
  //   },
  // };
  leftMenu: any;
  isUserVerified = true;
  profileData;
  constructor(
    private newCommonService: NewCommonService,
    private profileService: ProfileService,
    private _commonService: CommonService,
    private router: Router
  ) {
    this.userData = JSON.parse(localStorage.getItem("userData"));

    this.initializeUserType();
    this.fetchStateList();
    this.initializeLoggedInUserDataFetch();

    console.log("left responces..", this.leftMenu);
    this.leftMenu = JSON.parse(localStorage.getItem("leftMenuRes"));
    this.newCommonService.setFormStatus2223.subscribe((res) => {
      console.log("form status 2223", res);
      if(this.loggedInUserType === this.userTypes.ULB)
      this.getSideBar();
    });
    this.path = sessionStorage.getItem("path1");
    this.ulbFormId = sessionStorage.getItem("form_id");
    this.ulbFormName = sessionStorage.getItem("form_name");
  }
  path = null;
  ulbFormId = null;
  ulbFormName = null;
  states: { [staeId: string]: IState };
  userLoggedInDetails: IUserLoggedInDetails;
  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;
  userData;
  ngOnInit(): void {
    this.fetchProfileData({});
    console.log("left responces..1", this.leftMenu);
  }
  getSideBar() {
    let ulb = this.userData?.ulb;
    let role = this.userData?.role;
    let isUA = "";
    this.newCommonService.getLeftMenu(ulb, role, isUA).subscribe((res: any) => {
      console.log("left responces..", res);
      this.leftMenu = res?.data;
    });
  }
  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();

    // console.log(this._router.url);
  }
  private initializeLoggedInUserDataFetch() {
    UserUtility.getUserLoggedInData().subscribe((data) => {
      this.userLoggedInDetails = data;

      console.log("hi", data);
    });
  }
  private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.states = {};
      res.forEach((state) => (this.states[state._id] = state));
    });
  }

  fetchProfileData(params: {}) {
    this.profileService.getUserProfile(params).subscribe((res) => {
      this.profileData = res["data"];
      this.isUserVerified = this.profileData?.isVerified2223;
      if (
        this.isUserVerified == false &&
        this.loggedInUserType === this.userTypes.ULB
      ) {
        this.router.navigateByUrl("/profile-update");
        return;
        //  this.routerlink2223 = "/ulbform2223/overview"
      } else {
        //  this.routerlink2223 = "/profile-update";
      }
    });
  }
  backStatePage() {
    this.router.navigate(['stateform2223/review-ulb-form'], { queryParams: { formId: this.ulbFormId } });
  }
}
