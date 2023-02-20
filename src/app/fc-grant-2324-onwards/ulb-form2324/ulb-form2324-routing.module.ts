import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnualAccountComponent } from './annual-account/annual-account.component';
import { UlbForm2324Component } from './ulb-form2324.component';

const routes: Routes = [
  {
    path: "",
    component: UlbForm2324Component,
    // canActivate: [Ulb2223Guard],
    children: [
      {
        path: "annual-account",
        component: AnnualAccountComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UlbForm2324RoutingModule { }
