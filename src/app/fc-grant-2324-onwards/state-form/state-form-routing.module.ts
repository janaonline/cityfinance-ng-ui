import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { State2223Guard } from 'src/app/shared2223/common-gaurds/state/state2223.guard';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ReviewUlbTableComponent } from './review-ulb-table/review-ulb-table.component';
import { StateFormComponent } from './state-form.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateFormRoutingModule { }
