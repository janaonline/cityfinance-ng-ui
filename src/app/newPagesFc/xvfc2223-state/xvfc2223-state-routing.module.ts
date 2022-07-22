import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { PropertyTaxFloorRateComponent } from './property-tax-floor-rate/property-tax-floor-rate.component';
=======
import { PtoComponent } from './pto/pto.component';
import {ReviewApplicationComponent} from './review-application/review-application.component'
import { Xvfc2223StateComponent } from "./xvfc2223-state.component";
>>>>>>> f5f745edc3698e4777b8fed5b4873146b8255ac5

const routes: Routes = [
  {
<<<<<<< HEAD
    path : "property-tax-floor-rate", component: PropertyTaxFloorRateComponent
  }
=======
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
>>>>>>> f5f745edc3698e4777b8fed5b4873146b8255ac5
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Xvfc2223StateRoutingModule { }
