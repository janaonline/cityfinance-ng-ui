import { Component, OnInit } from '@angular/core';
import { ActionPlanComponent } from 'src/app/newPagesFc/xvfc2223-state/action-plan/action-plan.component';
import { StateDashboardService } from 'src/app/pages/stateforms/state-dashboard/state-dashboard.service';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';
import { ActionplanserviceService } from 'src/app/pages/stateforms/action-plan-ua/actionplanservice.service';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
import { State2223Service } from 'src/app/newPagesFc/xvfc2223-state/state-services/state2223.service';
import { Router } from '@angular/router';
import { SweetAlert } from "sweetalert/typings/core";
import { CommonServicesService } from '../../fc-shared/service/common-services.service';

const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-action-plan-sli',
  templateUrl: './action-plan-sli.component.html',
  styleUrls: ['./action-plan-sli.component.scss']
})
export class ActionPlanSliComponent extends ActionPlanComponent implements OnInit {
 
  constructor(
     actionplanserviceService: ActionplanserviceService,
     _router: Router,
     profileService: ProfileService,
     stateDashboardService: StateDashboardService,
     stateService: State2223Service,
     newCommonService: NewCommonService,
    fcCommonServices: CommonServicesService
  ) { 
    super(
      actionplanserviceService,
      _router,
      profileService,
      stateDashboardService,
      stateService, 
      newCommonService,
      fcCommonServices
      
      );
     // this.initializeUserType();

      this.stateId = this.userData?.state;
      if (!this.stateId) {
        this.stateId = localStorage.getItem("state_id");
      }
      this.designYear = this.Year['2023-24'];
  }
  yearCode="2023-24"
  isActionSubmitted:boolean = false;
  actionPayload = {
    "form_level": 3,
    "design_year": this.Year["2023-24"],
    "formId": 13,
    "type": "STATE",
    "states": [],
    "responses": [
      // {
      //   "shortKey": "UA_44_HR021",
      //   "status": 6,
      //   "rejectReason": "q",
      //   "responseFile": {
      //     "url": "aditya",
      //     "name": "1123456"
      //   }
      // },
      // {
      //   "shortKey": "UA_223_ML002",
      //   "status": 6,
      //   "rejectReason": "q1",
      //   "responseFile": {
      //     "url": "1",
      //     "name": "1"
      //   }
      // }
    ],
    "multi": false,
    "shortKeys": [
      // "UA_44_HR021",
      // "UA_223_ML002"
    ]
  }
  canTakeAction: boolean = false;
  ngOnInit(): void {
   this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuState"));
   this.getUAList();
   this.setRouter();
   this.pendingStatus = '2';
   
  }
  actionFormChanges(e){
    // console.log('ee', e); 
   }
   actionPayloadPrepare(){
     console.log('this.data 453', this.data);
     this.actionPayload["states"].push(this.stateId);
     this.data.uaData.forEach((elem)=>{
      if (elem?.statusId == 4 || elem?.statusId == 6 || this.userData?.role != 'STATE') {
        elem["isDisabled"] = true;
      } else {
        elem["isDisabled"] = false;
      }
       this.actionPayload.shortKeys.push(elem?.uaCode);
       let actionObj = {
         "shortKey": elem?.uaCode,
         "status": elem?.status,
         "rejectReason": elem?.rejectReason,
         "responseFile": elem?.responseFile ? elem?.responseFile : { "url": "", "name": ""}
     }
       this.actionPayload.responses.push(actionObj);
     })
   }
 
   saveAction(){
     console.log('this. action action', this.actionPayload);
     this.isActionSubmitted = true;
     for(let item of this.actionPayload.responses){
       if(item?.status != 6 && item?.status != 7){
         swal('Error', 'Status for all UA is mandatory', 'error')
         return;
       };
       if(item?.status == 7 && !item?.rejectReason){
         swal('Error', 'Reject reason is mandatory in case of rejection', 'error')
         return;
       };
     }
     swal("Confirmation !", `Are you sure you want to submit this action?`, "warning", {
       buttons: {
         Submit: {
           text: "Submit",
           value: "submit",
         },
         Cancel: {
           text: "Cancel",
           value: "cancel",
         },
       },
     }).then((value) => {
       switch (value) {
         case "submit":
           this.finalSubmitAction();
           break;
         case "cancel":
           break;
       }
     });
  //   console.log('everthing is corrects.............');
     
   }
 
   finalSubmitAction(){
     this.fcCommonServices.formPostMethod(this.actionPayload, 'common-action/masterAction').subscribe((res:any)=>{
       console.log('ressssss action', res);
       //this.actBtnDis = true;
       this.isActionSubmitted = false;
       this.fcCommonServices.setFormStatusState.next(true);
       this.load();
        this.setCode();
       swal('Saved', "Action submitted successfully", "success");
     },
     (error)=>{
       console.log('ressssss action', error);
      // this.formChangeEventEmit.emit(false);
       this.isActionSubmitted = false;
       swal('Error', error?.message ?? 'Something went wrong', 'error');
     }
     )
   }


}
