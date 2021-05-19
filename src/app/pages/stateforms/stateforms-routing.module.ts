import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateformsComponent } from './stateforms.component'
import { GTCertificateComponent } from './gtcertificate/gtcertificate.component'
const routes: Routes = [
  {
    path: "",
    component: StateformsComponent,
    children: [
      {
        path: "grant-transfer-certificate", component: GTCertificateComponent
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateformsRoutingModule { }
