import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UlbGaurdsGuard } from '../fc-shared/gaurds/ulb-gaurds.guard';
import { AnnualAccountComponent } from './annual-account/annual-account.component';
import { DurComponent } from './dur/dur.component';
import { CommonFormComponent } from './common-form/common-form.component';
import { UlbFormComponent } from './ulb-form.component';
import { TwentyEightSlbComponent } from './twenty-eight-slb/twenty-eight-slb.component';
import { OverviewComponent } from './overview/overview.component';
import { ResourceComponent } from './resource/resource.component';
import { ConfirmationGuard } from './guards/confirmation.guard';

const routes: Routes = [
  {
    path: "",
    component: UlbFormComponent,
    canActivate: [UlbGaurdsGuard],
    children: [
      {
        path: "annual_acc",
        component: AnnualAccountComponent,
      },
      {
        path: "utilisation-report",
        component: DurComponent,
        canDeactivate: [ConfirmationGuard]
      },
      {
        path: "odf",
        component: CommonFormComponent,
      },
      {
        path: "gfc",
        component: CommonFormComponent,
      },
      {
        path: "gfc",
        component: CommonFormComponent,
      },
      {
        path: "ptax",
        component: CommonFormComponent,
      },
      {
        path: "28SLBsForm",
        component: TwentyEightSlbComponent,
      },
      {
        path: "slbs",
        component: CommonFormComponent,
      },
      {
        path: "overview",
        component: OverviewComponent,
      },
      {
        path: "grant-tra-certi",
        component: ResourceComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UlbFormRoutingModule { }
