import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { services, targets } from '../../../users/data-upload/components/configs/water-waste-management';
import { IFinancialData, WaterManagement } from '../../../users/data-upload/models/financial-data.interface';
import { IUserLoggedInDetails } from "../../../models/login/userLoggedInDetails";
import { USER_TYPE } from "../../../models/user/userType";
import { UserUtility } from "../../../util/user/user";
import { ProfileService } from "../../../users/profile/service/profile.service";
import { IState } from "../../../models/state/state";

import { CommonService } from "src/app/shared/services/common.service";
import { Router } from '@angular/router';
import { WaterSupplyService } from './water-supply.service';
@Component({
  selector: 'app-water-supply',
  templateUrl: './water-supply.component.html',
  styleUrls: ['./water-supply.component.scss']
})
export class WaterSupplyComponent implements OnInit {
  states: { [staeId: string]: IState };
  userLoggedInDetails: IUserLoggedInDetails;
  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;
  constructor(
    private _commonService: CommonService,
    private profileService: ProfileService,
    private _router: Router,
    private _WaterSupplyService : WaterSupplyService
    ) {
      this.initializeUserType();
      this.fetchStateList();
      this.initializeLoggedInUserDataFetch();
    }
  waterWasteManagementForm: FormGroup;

  focusTargetKey: any = {}
  focusTargetKeyForErrorMessages: any = {}
  targets = targets;

  benchmarks = []
  services: {
    key: keyof WaterManagement;
    name: string;
    benchmark: string;
  }[] = services;
  detailsOfUa;
  ngOnInit() {

    this.services.forEach(data => {
      this.focusTargetKey[data.key + 'baseline'] = false
      this.targets.forEach(item => {
        this.focusTargetKey[data.key + item.key] = false
      })
    })
    this.services.forEach(data => {
      this.focusTargetKeyForErrorMessages[data.key + 'baseline'] = false
      this.targets.forEach(item => {
        this.focusTargetKeyForErrorMessages[data.key + item.key] = false
      })
    })

    this.benchmarks = this.services.map((el) => (parseInt(el.benchmark)))
    console.log(this.benchmarks);
    console.log('target', this.targets)
    console.log('serv', this.services);
    console.log('basline',this.focusTargetKey )
    this.getwaterSuppyData()

  }
  getwaterSuppyData(){
    this._WaterSupplyService.getslbsData()
      .subscribe((res) => {
         console.log('response', res)
         this.detailsOfUa = res;
      })
  }

  private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.states = {};
      res.forEach((state) => (this.states[state._id] = state));
      console.log('res', res)
    });
  }
  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
    console.log(this._router.url);
  }
  private initializeLoggedInUserDataFetch() {
    //  = this.profileService.getUserLoggedInDetails();
    UserUtility.getUserLoggedInData().subscribe((data) => {
      this.userLoggedInDetails = data;
      console.log("hi", data);
    });
    if (!this.userLoggedInDetails) {
      return this._router.navigate(["/login"]);
    }
    switch (this.userLoggedInDetails.role) {
      case USER_TYPE.STATE:
      case USER_TYPE.ULB:
        return this.fetchStateList();
    }
 }


  }


