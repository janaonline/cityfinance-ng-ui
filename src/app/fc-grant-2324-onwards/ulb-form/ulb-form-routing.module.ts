import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnualAccountComponent } from './annual-account/annual-account.component';
import { CommonFormComponent } from './common-form/common-form.component';
import { UlbFormComponent } from './ulb-form.component';

const routes: Routes = [
  {
    path: "",
    component: UlbFormComponent,
    // canActivate: [Ulb2223Guard],
    children: [
      {
        path: "annual-account",
        component: AnnualAccountComponent,
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

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UlbFormRoutingModule { }
