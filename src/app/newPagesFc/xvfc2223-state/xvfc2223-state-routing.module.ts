import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PtoComponent } from './pto/pto.component';
import {ReviewApplicationComponent} from './review-application/review-application.component'
const routes: Routes = [
  // {
  //   path : "", component: 
  // },
  {
    path : "pto", component: PtoComponent
  },
  {
    path : "review2223", component: ReviewApplicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Xvfc2223StateRoutingModule { }
