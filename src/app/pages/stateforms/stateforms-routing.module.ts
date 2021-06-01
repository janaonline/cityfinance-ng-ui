import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateformsComponent } from './stateforms.component'
import { GTCertificateComponent } from './gtcertificate/gtcertificate.component'
import { WaterSupplyComponent } from './water-supply/water-supply.component';
const routes: Routes = [
  {
    path: "",
    component: StateformsComponent,
    children: [
      {
        path: "gtCertificate", component: GTCertificateComponent
      },
      {
        path: "water-supply", component: WaterSupplyComponent
      },

    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateformsRoutingModule { }
