import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { services, targets } from '../../../../users/data-upload/components/configs/water-waste-management';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IUserLoggedInDetails } from 'src/app/models/login/userLoggedInDetails';
import { IState } from 'src/app/models/state/state';
import { USER_TYPE } from 'src/app/models/user/userType';
import { CommonService } from 'src/app/shared/services/common.service';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
import { WaterSupplyService } from '../water-supply.service';
import { WaterManagement } from 'src/app/users/data-upload/models/financial-data.interface';
import { UserUtility } from 'src/app/util/user/user';
import { defaultDailogConfiuration } from 'src/app/pages/questionnaires/ulb/configs/common.config';
import { QuestionnaireService } from 'src/app/pages/questionnaires/service/questionnaire.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-water-supply-preview',
  templateUrl: './water-supply-preview.component.html',
  styleUrls: ['./water-supply-preview.component.scss']
})
export class WaterSupplyPreviewComponent implements OnInit {

  states: { [staeId: string]: IState };
  userLoggedInDetails: IUserLoggedInDetails;
  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;
  showLoader;

  @Input() parentData: any;
  @Input()
  changeFromOutSide: any;
  @ViewChild("waterSani") _html: ElementRef;
  @ViewChild("template") template;
  styleForPDF = `<style>
  :root {
    font-size: 14px;
  }
  .sub-h-font{
    font-size: 14px !important;
    font-weight: 600;
  }
  .heading-font{
    font-size: 18px !important;
    font-weight: 700;

  }
  .slb-pd {
    padding: 2% 0% 2.5% 0%;
}


.form-h {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}

  table tbody tr {
    border: 100px solid black;
  }
    table tbody tr:nth-child(even) {
    background: #d7ebeb;
  }
   table tbody tr:nth-child(even) td {
    border:1px solid #d7ebeb;
  }
    h2 {
      font-size: 1.25rem;
    }

    h3 {
      font-size: .9rem;
    }

     h4 {
      font-size: .7rem;
    }
       h5 {
      font-size: .5rem;
    }

    table thead th {
      font-size: .5rem
    }

    table tbody td, li {
      font-size: .5rem
    }

    .td-width {
      width: 25%;
    }

    button {
      display: none;
    }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
  }

  .form-status {
    font-size: 10px;
    margin-top: 10px;


  }

  .fa-times {
    display: none;
  }
  .qus-slb {
    margin-left: 2%;
    font-weight: normal;
    font-size: 12px;
}

#donwloadButton{
  display: none;
}
h5{
  display: inline-flex;
}
.d-i{
  display: inline-flex;
  width : 33.33%;
}
.mr-l{
  margin-left: 22%;
}
.no-data {
  font-size: 10px;
  color: red;
    padding-top: 4px;
    margin-left: 7%;

}
.form-name {
  margin-top: 5px;
  margin-bottom: 15px;
}

  </style>`;
  constructor(
    private _commonService: CommonService,
    private profileService: ProfileService,
    private _router: Router,
    private _matDialog: MatDialog,
    private _WaterSupplyService: WaterSupplyService,
    private _questionnaireService: QuestionnaireService,
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

  stateName;
  uasList;
  USER_TYPES = USER_TYPE;
  userDetails = new UserUtility().getLoggedInUserDetails();
 ngOnInit() {
    this.uasList = Object.values(JSON.parse(sessionStorage.getItem("UasList")))
    let userData = JSON.parse(localStorage.getItem("userData"));

    if(this.userDetails.role == USER_TYPE.STATE){
      this.stateName = userData.stateName;
  }else {
      this.stateName = sessionStorage.getItem('stateName');
  }
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
    console.log('basline', this.focusTargetKey)
   this.getwaterSuppyData();
  }
  // getwaterSuppyData(){
  //   this._WaterSupplyService.getslbsData()
  //     .subscribe((res) => {
  //        console.log('response', res)
  //        let ulbdetail: any = res
  //        this.detailsOfUa = ulbdetail.data;
  //     })
  // }
  getData:any = [];
  totalULBsInUA:any = [];
  totalCompletedUlb: any = [];
  totalPendingUlb:any =[];
  approvedStatusData = []
  statusData = []
  getwaterSuppyData() {
    for(let i =0; i< this.uasList.length; i++) {
  //  this.uasList.forEach(item => {
      this._WaterSupplyService.getslbsData(this.uasList[i]._id)
      .subscribe((res) => {
        let data = res['data']
        this.statusData = []
        this.approvedStatusData = []
        this.getData[i] = data;

         if(this.getData[i] != 'null') {
          console.log('data',i, this.totalULBsInUA, data[1]?.completedAndpendingSubmission.length +
          data[1]?.pendingCompletion.length +
          data[1]?.underStateReview.length +
          data[0]?.total);
          this.totalULBsInUA[i] = data[1]?.completedAndpendingSubmission.length +
          data[1]?.pendingCompletion.length +
          data[1]?.underStateReview.length +
          data[0]?.total;

          this.totalCompletedUlb[i] = data[0]?.total;
          this.totalPendingUlb[i] = data[1]?.completedAndpendingSubmission.length +
          data[1]?.pendingCompletion.length +
          data[1]?.underStateReview.length;
         }
      },
      (err) => {
       // this.getData.push('null');
        this.getData[i] = 'null';
        this.totalULBsInUA[i] = 'NA'
        this.totalPendingUlb[i] ='NA'
        this.totalCompletedUlb[i] ='NA'

      }
      )

    }
    setTimeout(() => {
      console.log('preview........full array from slb', this.getData)
      sessionStorage.setItem("slbStateData", JSON.stringify(this.getData));
    }, 500);
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
  // constructor(
  //   @Inject(MAT_DIALOG_DATA) public data: any,
  //   private _matDialog: MatDialog,
  //   public _router: Router,

  // ) {}


  // ngOnInit(): void {
  // }

  close() {
    this._matDialog.closeAll();
  }
  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    this.showLoader = true;
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(res.slice(0), "pdf", "waterSupplySanitation.pdf");
        this.showLoader = false;
      },
      (err) => {
        this.showLoader = false;
        this.onGettingError(
          ' "Failed to download PDF. Please try after sometime."'
        );
      }
    );
  }
  private onGettingError(message: string) {
    const option = { ...defaultDailogConfiuration };
    option.buttons.cancel.text = "OK";
    option.message = message;
    this.showLoader = false;
    this._matDialog.open(DialogComponent, { data: option });
  }
  private downloadFile(blob: any, type: string, filename: string): string {
    const url = window.URL.createObjectURL(blob); // <-- work with blob directly

    // create hidden dom element (so it works in all browsers)
    const a = document.createElement("a");
    a.setAttribute("style", "display:none;");
    document.body.appendChild(a);

    // create file, attach to hidden element and open hidden element
    a.href = url;
    a.download = filename;
    a.click();
    return url;
  }
}
