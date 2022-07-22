import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PtoComponent } from './pto/pto.component';
import {ReviewApplicationComponent} from './review-application/review-application.component'
import { Xvfc2223StateComponent } from "./xvfc2223-state.component";

const routes: Routes = [
  {
    path: "",
    component: Xvfc2223StateComponent,
    children: [
      {
        path: "pto",
        component: PtoComponent,
      },
      {
        path: "review",
        component: ReviewApplicationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Xvfc2223StateRoutingModule { }
