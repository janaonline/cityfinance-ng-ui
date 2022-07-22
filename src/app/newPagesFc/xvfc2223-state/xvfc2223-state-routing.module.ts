import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyTaxFloorRateComponent } from './property-tax-floor-rate/property-tax-floor-rate.component';

const routes: Routes = [
  // {
  //   path : "", component: 
  // },
  {
    path : "property-tax-floor-rate", component: PropertyTaxFloorRateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Xvfc2223StateRoutingModule { }
