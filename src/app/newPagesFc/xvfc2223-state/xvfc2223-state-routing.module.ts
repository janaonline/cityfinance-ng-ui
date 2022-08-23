import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrantAllocationComponent } from "./grant-allocation/grant-allocation.component";
import { GtcFormComponent } from "./gtc-form/gtc-form.component";
import { PropertyTaxFloorRateComponent } from "./property-tax-floor-rate/property-tax-floor-rate.component";
import { ReviewApplicationComponent } from "./review-application/review-application.component";
import { StateFinanceComponent } from "./state-finance/state-finance.component";
import { Xvfc2223StateComponent } from "./xvfc2223-state.component";
import {DashboardComponent} from './dashboard/dashboard.component'
const routes: Routes = [
  {
    path: "",
    component: Xvfc2223StateComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "property-tax",
        component: PropertyTaxFloorRateComponent,
      },
      {
        path: "fc-formation",
        component: StateFinanceComponent,
      },
      {
        path: "review-ulb-form",
        component: ReviewApplicationComponent,
      },
      {
        path: "gtCertificate",
        component: GtcFormComponent,
      },
      {
        path: "grant-allocation",
        component: GrantAllocationComponent,
      },
      {
        path: "dashboard/:id",
        component: DashboardComponent,
      },
      {
        path: "property-tax/:id",
        component: PropertyTaxFloorRateComponent,
      },
      {
        path: "fc-formation/:id",
        component: StateFinanceComponent,
      },
      {
        path: "gtCertificate/:id",
        component: GtcFormComponent,
      },
      {
        path: "grant-allocation/:id",
        component: GrantAllocationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Xvfc2223StateRoutingModule { }
