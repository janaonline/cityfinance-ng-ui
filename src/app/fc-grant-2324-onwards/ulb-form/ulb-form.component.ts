import { Component, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserUtility } from 'src/app/util/user/user';
import { CommonServicesService } from '../fc-shared/service/common-services.service';

@Component({
  selector: 'app-ulb-form',
  templateUrl: './ulb-form.component.html',
  styleUrls: ['./ulb-form.component.scss']
})
export class UlbFormComponent implements OnInit,OnDestroy {

  leftMenu = {};
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  loggedInUserType:boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonServices : CommonServicesService
  ) {
    this.getQueryParams();
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.designYearArray = JSON.parse(localStorage.getItem("Years"));
    this.loggedInUserType = this.loggedInUserDetails.role;
    if (!this.loggedInUserType) {
      this.router.navigate(["/login"]);
      // this.showLoader = false;
    }
    this.getLeftMenu();
    this.getAllStatus();
    this.subscription = this.commonServices.setFormStatusUlb.subscribe((res) => {
      if (res == true) {
        console.log("form status 2223", res);
        this.getLeftMenu();
      }
    });
  }
  userData : any;
  designYearArray:any;
  subscription:any;
  ngOnInit(): void {
   // this.leftMenu = JSON.parse(localStorage.getItem("leftMenuULB"));
  }
  getQueryParams() {
  this.route.queryParams.subscribe(params => {
    const id = params['id']; // get the 'id' query parameter
    const name = params['name']; // get the 'name' query parameter
  });
}
getAllStatus(){
  this.commonServices.formGetMethod('master-status', {}).subscribe((res)=>{
    console.log('status responces....', res);
  },
  (error)=>{
    console.log('error', error);

  }
  )
}
getLeftMenu() {
  let queryParam = {
    role: '',
    year: this.designYearArray["2023-24"],
    _id: ''
  }

  if (this.userData?.role === "ULB") {
    queryParam._id = this.userData?.ulb;
    queryParam.role = this.userData?.role;
  }
  // else {
  //   ulb = localStorage.getItem("ulb_id");;
  //   role = 'ULB';
  // }
  this.commonServices.formGetMethod("menu", queryParam).subscribe((res: any) => {
    console.log("left responces..", res);
    this.leftMenu = res?.data;
    localStorage.setItem("leftMenuULB", JSON.stringify(res?.data));
  },
  (error)=>{
    console.log('left menu responces', error)
  }
  );
}
ngOnDestroy() {
  this.subscription.unsubscribe();

}

}
