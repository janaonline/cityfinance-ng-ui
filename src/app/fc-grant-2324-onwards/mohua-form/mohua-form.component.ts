import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '../fc-shared/service/common-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserUtility } from 'src/app/util/user/user';
import { USER_TYPE } from 'src/app/models/user/userType';

@Component({
  selector: 'app-mohua-form',
  templateUrl: './mohua-form.component.html',
  styleUrls: ['./mohua-form.component.scss']
})
export class MohuaFormComponent implements OnInit {

  constructor(
    private router: Router,
    private commonServices : CommonServicesService,
    private route: ActivatedRoute,
  ) {
    this.loggedInUserType = this.loggedInUserDetails.role;
    if (!this.loggedInUserType) {
      this.router.navigate(["/login"]);
    }
    this.userData = JSON.parse(localStorage.getItem("userData"));
    if (![USER_TYPE.MoHUA, USER_TYPE.ADMIN].includes(this.userData?.role)) {
      this.router.navigate(["/fc-home-page"]);
    }
    this.designYearArray = JSON.parse(localStorage.getItem("Years"));
    this.stateName = sessionStorage.getItem("stateName");
    this.stateId = this.userData?.state;
   // this.getMohuaSideBar(this.userData);
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
  isLeftMenu:boolean = false;
  selectedYearId:string="";
  selectedYear:string="";

  ngOnInit(): void {
    this.getQueryParams();
   // this.leftMenu = JSON.parse(localStorage.getItem("leftMenuULB"));
  }

  getMohuaSideBar(userData) {
    this.isLeftMenu = false;
    let role = userData?.role;
    let queryParam = {
      role,
      year: this.selectedYearId,
      _id: ''
    }
    this.commonServices.formGetMethod('menu', queryParam).subscribe((res: any) => {
      console.log("left responces..", res);
      this.leftMenu = res?.data;
      this.isLeftMenu = true;
      // localStorage.setItem("leftMenuState", JSON.stringify(res?.data));
      // this.commonServices.stateLeftMenuComplete.next(true);
      this.isApiComplete = true;
    },
    (err)=>{
      this.isLeftMenu = false;
      this.isApiComplete = true;
    }
    );
  }
  
  getQueryParams() {
    this.route.params.subscribe(params => {
     const yearId = params['yearId']; // get the 'id' query parameter
     this.selectedYearId = yearId ? yearId : sessionStorage.getItem("selectedYearId");
    // this.getLeftMenu(this.selectedYearId); 
      this.getMohuaSideBar(this.userData);
     this.selectedYear = this.commonServices.getYearName(this.selectedYearId);
  });
}

}
