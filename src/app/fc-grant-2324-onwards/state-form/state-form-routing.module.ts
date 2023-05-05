import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { State2223Guard } from 'src/app/shared2223/common-gaurds/state/state2223.guard';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ReviewUlbTableComponent } from './review-ulb-table/review-ulb-table.component';
import { StateFormComponent } from './state-form.component';
import { ProjectsWssComponent } from './projects-wss/projects-wss.component';
import { ProjectsWaterRejComponent } from './projects-water-rej/projects-water-rej.component';
import { ActionPlanSliComponent } from './action-plan-sli/action-plan-sli.component';

const routes: Routes = [
  {
    path: "",
    component: StateFormComponent,
   canActivate: [State2223Guard],
    children: [
      {
        path: "dashboard",
        component: DashbordComponent,
      },
      {
        path: "review-ulb-form",
        component: ReviewUlbTableComponent,
      },
      {
        path: "water-rejenuvation",
        component: ProjectsWaterRejComponent,
      },
      {
        path: "water-rejenuvation-new",
        component: ProjectsWssComponent,
      },
      {
        path: "action-plan",
        component: ActionPlanSliComponent,
      },
      
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateFormRoutingModule { }
