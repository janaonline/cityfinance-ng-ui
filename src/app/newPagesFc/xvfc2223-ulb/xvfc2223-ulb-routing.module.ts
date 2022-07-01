import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AnnualAccountsComponent } from "./annual-accounts/annual-accounts.component";
import { GfcComponent } from "./gfc/gfc.component";
import { OdfComponent } from "./odf/odf.component";
import { PfmsComponent } from "./pfms/pfms.component";
import { Xvfc2223UlbComponent } from "./xvfc2223-ulb.component";

const routes: Routes = [
  {
    path: "",
    component: Xvfc2223UlbComponent,
    // canActivate: [UlbGaurdGuard],
    children: [
      {
        path: "odf",
        component: OdfComponent,
      },
      {
        path: "gfc",
        component: GfcComponent,
      },
      {
        path: "annual_acc",
        component: AnnualAccountsComponent,
      },
      {
        path: "pfms_acc",
        component: PfmsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Xvfc2223UlbRoutingModule {}
