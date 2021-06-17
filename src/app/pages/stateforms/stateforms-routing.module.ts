import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateformsComponent } from './stateforms.component'
import { GTCertificateComponent } from './gtcertificate/gtcertificate.component'
import { WaterSupplyComponent } from './water-supply/water-supply.component';
import { ReviewUlbFormComponent } from './review-ulb-form/review-ulb-form.component';
import { EditUlbProfileComponent } from './edit-ulb-profile/edit-ulb-profile.component';
import { StateDashboardComponent } from './state-dashboard/state-dashboard.component'
import {WaterRejenuvationComponent} from "./water-rejenuvation/water-rejenuvation.component"
import {ActionPlanUAComponent} from "./action-plan-ua/action-plan-ua.component"
import { GrantAllocationComponent } from './grant-allocation/grant-allocation.component';
const routes: Routes = [
  {
    path: "",
    component: StateformsComponent,
    children: [
      {
        path: "dashboard", component: StateDashboardComponent
      },
      {
        path: "gtCertificate", component: GTCertificateComponent
      },
      {
        path: "water-supply", component: WaterSupplyComponent
      },
      {
        path: "review-ulb-form", component: ReviewUlbFormComponent
      },
      {
        path: "edit-ulb-profile", component: EditUlbProfileComponent
      },
      {
        path: "water-rejenuvation", component: WaterRejenuvationComponent,
      },
      {
        path: "action-plan", component: ActionPlanUAComponent,
      },
      {
        path: "grant-allocation", component: GrantAllocationComponent,
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateformsRoutingModule { }
