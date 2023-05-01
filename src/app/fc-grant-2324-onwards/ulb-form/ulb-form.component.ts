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
    this.statusSubs = this.commonServices.setFormStatusUlb.subscribe((res) => {
      if (res == true) {
        console.log("form status 2223", res);
        this.getLeftMenu();
      }
    });
    this.ulbName = sessionStorage.getItem("ulbName");
    this.stateName = sessionStorage.getItem("stateName");
    this.pathMohua = sessionStorage.getItem("path2");
    this.stateFormId = sessionStorage.getItem("Stateform_id");
    this.state_id = sessionStorage.getItem("state_id");
    this.path = sessionStorage.getItem("path1");
    this.ulbFormId = sessionStorage.getItem("form_id");
    this.ulbFormName = sessionStorage.getItem("form_name");
  }
  leftMenu = {};
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  loggedInUserType:boolean;
  userData : any;
  designYearArray:any;
  statusSubs:any;
  ulbName:string='';
  stateName:string='';
  pathMohua = null;
  stateFormId = '';
  state_id=null;
  path = null;
  ulbFormId = null;
  ulbFormName = null;
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
  this.commonServices.formGetMethod('master-status', {}).subscribe((res:any)=>{
    console.log('status responces....', res);
    localStorage.setItem("allStatusArray", JSON.stringify(res?.data));
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
  else {
    queryParam._id = localStorage.getItem("ulb_id");;
    queryParam.role = 'ULB';
  }
  this.commonServices.formGetMethod("menu", queryParam).subscribe((res: any) => {
    console.log("left responces..", res);
    this.leftMenu = res?.data;
    localStorage.setItem("leftMenuULB", JSON.stringify(res?.data));
    localStorage.setItem("overViewCard2324", JSON.stringify(res?.card));
    this.commonServices.ulbLeftMenuComplete.next(true);
  },
  (error)=>{
    console.log('left menu responces', error)
  }
  );
}
ngOnDestroy() {
  this.statusSubs?.unsubscribe();
}
backStatePage(type) {
  if (type == 'ULB Review' && !this.pathMohua) {
    this.router.navigate(['mohua-form/review-ulb-form'], { queryParams: { formId: this.ulbFormId, state: this.state_id } });
    this.path = null;
  } else if (type == 'ULB Review' && this.pathMohua) {
    this.router.navigate(['state-form/review-ulb-form'], { queryParams: { formId: this.ulbFormId, state: this.state_id } });
    this.path = null;
  } else if (type == 'State Review') {
    this.router.navigate(['mohua-form/review-state-form'], { queryParams: { formId: this.stateFormId } });
    sessionStorage.removeItem("path2");
    this.pathMohua = null;
    this.stateFormId = ''
    sessionStorage.removeItem("Stateform_id");
  }

}
backStatePage2() {
  this.router.navigate(['state-form/review-ulb-form'], { queryParams: { formId: this.ulbFormId } });
  this.path = null;
}

}
