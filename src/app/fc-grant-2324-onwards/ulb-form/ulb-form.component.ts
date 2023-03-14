import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserUtility } from 'src/app/util/user/user';
import { CommonServicesService } from '../fc-shared/service/common-services.service';

@Component({
  selector: 'app-ulb-form',
  templateUrl: './ulb-form.component.html',
  styleUrls: ['./ulb-form.component.scss']
})
export class UlbFormComponent implements OnInit {

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
    this.loggedInUserType = this.loggedInUserDetails.role;
    if (!this.loggedInUserType) {
      this.router.navigate(["/login"]);
      // this.showLoader = false;
    }
    this.getAllStatus();
  }
  userData : any;
  ngOnInit(): void {
    this.leftMenu = JSON.parse(localStorage.getItem("leftMenuRes"));
  }
  getQueryParams() {
  this.route.queryParams.subscribe(params => {
    const id = params['id']; // get the 'id' query parameter
    const name = params['name']; // get the 'name' query parameter
  });
}
getAllStatus(){
  this.commonServices.formGetMethod('master-status/all', {}).subscribe((res)=>{
    console.log('status responces....', res);

  },
  (error)=>{
    console.log('error', error);

  }
  )
}

}
