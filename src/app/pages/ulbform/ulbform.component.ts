import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { IUserLoggedInDetails } from '../../models/login/userLoggedInDetails';
import { USER_TYPE } from '../../models/user/userType';
import { UserUtility } from '../../util/user/user';
import { ProfileService } from '../../users/profile/service/profile.service';
import { IState } from '../../models/state/state';

import { CommonService } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';
import { UlbformPreviewComponent } from './ulbform-preview/ulbform-preview.component';
import { WaterSanitationService } from './water-sanitation/water-sanitation.service';
@Component({
  selector: 'app-ulbform',
  templateUrl: './ulbform.component.html',
  styleUrls: ['./ulbform.component.scss']
})
export class UlbformComponent implements OnInit {

  states: { [staeId: string]: IState };
  userLoggedInDetails: IUserLoggedInDetails;
  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;
  isMillionPlus;
  isUA;
 constructor(private _commonService: CommonService,
  private profileService: ProfileService,private _router: Router, private wsService : WaterSanitationService,
  public dialog: MatDialog) {
    this.accessGrant();
  this.initializeUserType();
   this.fetchStateList();
   this.initializeLoggedInUserDataFetch();
  //  switch (this.userLoggedInDetails.role) {

  //     case USER_TYPE.PARTNER:
  //     case USER_TYPE.MoHUA:
  //     case USER_TYPE.ADMIN:
  //       this._router.navigate(["/fc-home-page"]);
  // }

 }


 private fetchStateList() {
   this._commonService.fetchStateList().subscribe((res) => {
     this.states = {};
     res.forEach((state) => (this.states[state._id] = state));

   });
 }
public accessGrant(){
  let userData = JSON.parse(localStorage.getItem('userData'));
  this.isMillionPlus =  userData.isMillionPlus;
  this.isUA = userData.isUA;
  console.log('milli', this.isMillionPlus)
  console.log('Ua', this.isUA)
}
  ngOnInit(): void {


  }

  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();

  }
  private initializeLoggedInUserDataFetch() {
    //  = this.profileService.getUserLoggedInDetails();
    UserUtility.getUserLoggedInData().subscribe((data) => {
      this.userLoggedInDetails = data;
      console.log('hi', data)
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
  dialogData;
  ulbPreview(){

   console.log("hello", this.dialogData)
    const dialogRef = this.dialog.open(UlbformPreviewComponent,
      {
        data:this.dialogData,
        width: "85vw",
  //   maxHeight: "95vh",
       height: "100%",
       panelClass: 'no-padding-dialog'
    } );
   // this.hidden = false;
    dialogRef.afterClosed().subscribe(result => {
    // console.log(`Dialog result: ${result}`);
  //   this.hidden = true;

   });
  }


}
