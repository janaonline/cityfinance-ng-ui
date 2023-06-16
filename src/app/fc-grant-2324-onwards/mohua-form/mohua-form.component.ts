import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '../fc-shared/service/common-services.service';
import { Router } from '@angular/router';
import { UserUtility } from 'src/app/util/user/user';

@Component({
  selector: 'app-mohua-form',
  templateUrl: './mohua-form.component.html',
  styleUrls: ['./mohua-form.component.scss']
})
export class MohuaFormComponent implements OnInit {

  constructor(
    private router: Router,
    private commonServices : CommonServicesService 
  ) {
    this.loggedInUserType = this.loggedInUserDetails.role;
    if (!this.loggedInUserType) {
      this.router.navigate(["/login"]);
    }
    this.userData = JSON.parse(localStorage.getItem("userData"));
    if (this.userData?.role != 'MoHUA' && this.userData?.role != 'ADMIN') {
      this.router.navigate(["/fc-home-page"]);
    }
    this.designYearArray = JSON.parse(localStorage.getItem("Years"));
    this.stateName = sessionStorage.getItem("stateName");
    this.stateId = this.userData?.state;
    this.getMohuaSideBar(this.userData);
  }
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  loggedInUserType:boolean;
  leftMenu:any;
  userData:any;
  stateName:string;
  stateId:string;
  designYearArray:any;
  statusSubs:any;
  isApiComplete:boolean =false;
  ngOnInit(): void {
   // this.leftMenu = JSON.parse(localStorage.getItem("leftMenuULB"));
  }

  getMohuaSideBar(userData) {
    // let role = userData?.role;
    let queryParam = {
      role: 'MoHUA',
      year: this.designYearArray["2023-24"],
      _id: ''
    }
    this.commonServices.formGetMethod('menu', queryParam).subscribe((res: any) => {
      console.log("left responces..", res);
      this.leftMenu = res?.data;
      // localStorage.setItem("leftMenuState", JSON.stringify(res?.data));
      // this.commonServices.stateLeftMenuComplete.next(true);
      this.isApiComplete = true;
    },
    (err)=>{
      this.isApiComplete = true;
    }
    );
  }

}
