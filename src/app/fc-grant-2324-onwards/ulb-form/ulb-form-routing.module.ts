import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UlbGaurdsGuard } from '../fc-shared/gaurds/ulb-gaurds.guard';
import { AnnualAccountComponent } from './annual-account/annual-account.component';
import { DurComponent } from './dur/dur.component';
import { CommonFormComponent } from './common-form/common-form.component';
import { UlbFormComponent } from './ulb-form.component';

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
        component: CommonFormComponent,
      },
      {
        path: "slbs",
        component: CommonFormComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UlbFormRoutingModule { }
