import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnualAccountComponent } from './annual-account/annual-account.component';
import { DurComponent } from './dur/dur.component';
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
        path: "dur",
        component: DurComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UlbFormRoutingModule { }
