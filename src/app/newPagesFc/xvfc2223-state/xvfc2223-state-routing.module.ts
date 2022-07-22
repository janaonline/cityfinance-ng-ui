import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PtoComponent } from './pto/pto.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Xvfc2223StateRoutingModule { }
