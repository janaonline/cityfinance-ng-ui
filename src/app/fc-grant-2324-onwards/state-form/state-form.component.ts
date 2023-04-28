import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServicesService } from '../fc-shared/service/common-services.service';
import { UserUtility } from 'src/app/util/user/user';

@Component({
  selector: 'app-state-form',
  templateUrl: './state-form.component.html',
  styleUrls: ['./state-form.component.scss']
})
export class StateFormComponent implements OnInit {

  constructor(
    private router: Router,
    private commonServices : CommonServicesService
  ) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
  //  this.leftMenu = JSON.parse(localStorage.getItem("leftMenuState"));
    this.stateName = sessionStorage.getItem("stateName");
    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
    }
    this.designYearArray = JSON.parse(localStorage.getItem("Years"));
    this.loggedInUserType = this.loggedInUserDetails.role;
    if (!this.loggedInUserType) {
      this.router.navigate(["/login"]);
      // this.showLoader = false;
    }
  this.getLeftMenu();
    
  }
  leftMenu = {};
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  loggedInUserType:boolean;
  userData:any;
  stateName:string;
  stateId:string;
  designYearArray:any;
  statusSubs:any;
  isApiComplete:boolean =false;
  ngOnInit(): void {
   // this.leftMenu = JSON.parse(localStorage.getItem("leftMenuULB"));
  }

  getLeftMenu() {
    let queryParam = {
      role: 'STATE',
      year: this.designYearArray["2023-24"],
      _id: this.stateId
    }

    this.commonServices.formGetMethod("menu", queryParam).subscribe((res: any) => {
      console.log("left responces..", res);
      this.leftMenu = res?.data;
      localStorage.setItem("leftMenuState", JSON.stringify(res?.data));
      this.commonServices.stateLeftMenuComplete.next(true);
      this.isApiComplete = true
    },
    (error)=>{
      console.log('left menu responces', error)
    }
    );
  }
  ngOnDestroy() {
  //  this.statusSubs.unsubscribe();
  }

}
