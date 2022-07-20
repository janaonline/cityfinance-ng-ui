import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PtoComponent } from './pto/pto.component';

const routes: Routes = [
  // {
  //   path : "", component: 
  // },
  {
    path : "pto", component: PtoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Xvfc2223StateRoutingModule { }
