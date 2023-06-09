import { Component, OnInit } from '@angular/core';
import { ActionPlanComponent } from 'src/app/newPagesFc/xvfc2223-state/action-plan/action-plan.component';
import { StateDashboardService } from 'src/app/pages/stateforms/state-dashboard/state-dashboard.service';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';
import { ActionplanserviceService } from 'src/app/pages/stateforms/action-plan-ua/actionplanservice.service';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
import { State2223Service } from 'src/app/newPagesFc/xvfc2223-state/state-services/state2223.service';
import { Router } from '@angular/router';

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
     newCommonService: NewCommonService
  ) { 
    super(
      actionplanserviceService,
      _router,
      profileService,
      stateDashboardService,
      stateService, 
      newCommonService
      );
     // this.initializeUserType();

      this.stateId = this.userData?.state;
      if (!this.stateId) {
        this.stateId = localStorage.getItem("state_id");
      }
      this.designYear = this.Year['2023-24'];
  }
  yearCode="2023-24"
  ngOnInit(): void {
   this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuState"));
   this.getUAList();
   this.setRouter();
   this.pendingStatus = '2'
  }
  

}
