import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
import { BaseComponent } from 'src/app/util/BaseComponent/base_component';
import { USER_TYPE } from 'src/app/models/user/userType';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FcHomePageService } from './fc-home-page.service';
@Component({
  selector: 'app-fc-home-page',
  templateUrl: './fc-home-page.component.html',
  styleUrls: ['./fc-home-page.component.scss']
})
export class FcHomePageComponent extends BaseComponent implements OnInit {

  constructor(private _router: Router,private _profileService: ProfileService,
    private location: Location,private fchomepageservice:FcHomePageService ) {
    super();
    if(!this.loggedInUserType){
      this._router.navigate(["/fc_grant"]);
    }
    switch (this.loggedInUserType) {
      case USER_TYPE.ULB:
      case USER_TYPE.STATE:
      case USER_TYPE.PMU:
      case USER_TYPE.MoHUA:
      case USER_TYPE.ADMIN:
        this._router.navigate(["/fc-home-page"]);
        break;
        case undefined:
          case null:
            return;
          default:
            this._router.navigate(["/home"]);
            break;
    }
   // this.fetchProfileData({});
  }

 ulbName ='';
 stateName=''
 isULBProfileCompleted: boolean;
 profileData;
 //routerlink2223;
 yearList
 yearList2: any[] = [];
  ngOnInit(): void {
     let ulbRecord = JSON.parse(localStorage.getItem('userData'));
     this.ulbName = ulbRecord?.name;
     this.stateName = ulbRecord?.stateName
     console.log(ulbRecord)
     this._profileService.getAccessYears().subscribe((res)=> {
     this.yearList = res['data'];
    //  if (this.loggedInUserType === 'STATE') this.yearList = this.yearList.filter((item: any) => item.year != '2025-26');
    //  console.log('year list data', this.yearList);
     },
     (err)=> {
      console.log(err.message)
     })
            const userDataStr = localStorage.getItem('userData');
            const userData = userDataStr ? JSON.parse(userDataStr) : null;
             const ulb = userData?.ulb;
      this.fchomepageservice.getYearsData(ulb).subscribe({
      next: (res: any) => {
        if (res.status && Array.isArray(res.data)) {
          this.yearList2 = res.data.map((item: any) => ({
            id: item.designYearId,
            year: item.designYear,
            url: `/ulb-form/${item.designYearId}/budget-documents`,
            files: item.files || []
          }));

          console.log('Year list:', this.yearList2);
        }
      },
      error: (err) => {
        console.error('Error fetching year data:', err);
      }
    });
  }

  // fetchProfileData(params: {}) {
  //   this._profileService.getUserProfile(params).subscribe((res) => {
  //     this.profileData = res["data"];
  //     console.log('profile data', this.profileData);

  //     this.isULBProfileCompleted = this.profileData?.isVerified2223;
  //     if(this.isULBProfileCompleted){
  //       this.routerlink2223 = "/ulbform2223/overview"
  //     }else{
  //       this.routerlink2223 = "/profile-update";
  //     }
  //   });
  // }
  setId(yearId) {
    sessionStorage.setItem("selectedYearId", yearId);
  }
  onYearSelect(item: any): void {

    const userDataStr = localStorage.getItem('userData');
  const userData = userDataStr ? JSON.parse(userDataStr) : null;
  const role = userData?.role;
    this.setId(item.id);
if(role==="ULB"){
const allHaveFiles = this.yearList2.every(
  (y: any) => !!y.files && Array.isArray(y.files) && y.files.length > 0
);
    if ((item.year === '2024-25' || item.year === '2025-26') && !allHaveFiles) {
      const yearId = item.id;
      Swal.fire({
        // title: 'Share your latest budget documents',
        html: `
        <h5 class="text-center">Share your latest budget documents</h5>
        <p class="small">Uploading your budget documents helps improve transparency and ensures your city’s data is complete and up to date on the platform.</p>
        <span class="text-muted small">This step is OPTIONAL and can be done at any time.</span>
      `,
        imageUrl: 'https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with your image
        imageWidth: 400,
        imageHeight: 300,
        showCancelButton: true,
        confirmButtonText: 'Upload now',
        cancelButtonText: 'Dismiss',
        reverseButtons: true,
        customClass: {
          confirmButton: 'btn btn-dark',
          cancelButton: 'btn btn-outline-dark me-2'
        },
        buttonsStyling: false
      }).then((result) => {
        if (result.isConfirmed) if (result.isConfirmed) {
          this._router.navigate([`/ulb-form/${yearId}/budget-documents`]);
        }
      });
    } 
    else {
      // Regular navigation
      this.setId(item.id);
      this._router.navigate([item.url]);
    }
}
    // Trigger background navigation
    this._router.navigate([item.url]);
   
  }

}
