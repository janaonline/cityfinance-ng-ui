import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IncompleteProfileComponent } from "src/app/shared/components/ulb/incomplete-profile/incomplete-profile.component";
import { Ulb2223Guard } from "src/app/shared2223/commom-gaurds/ulb2223.guard";
import { AnnualAccountsComponent } from "./annual-accounts/annual-accounts.component";
import { DetailedUtilizationReportComponent } from "./detailed-utilization-report/detailed-utilization-report.component";
import { GfcComponent } from "./gfc/gfc.component";
import { Gtc2223Component } from "./gtc2223/gtc2223.component";
import { OdfComponent } from "./odf/odf.component";
import { OverviewComponent } from "./overview/overview.component";
import { PfmsComponent } from "./pfms/pfms.component";
import { ResourceComponent } from "./resource/resource.component";
import { Slbs2223Component } from "./slbs2223/slbs2223.component";
import { Xvfc2223UlbComponent } from "./xvfc2223-ulb.component";

const routes: Routes = [
  {
    path: "",
    component: Xvfc2223UlbComponent,
    canActivate: [Ulb2223Guard],
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
        path: "utilisation-report",
        component: DetailedUtilizationReportComponent,
      },
      {
        path: "slbs",
        component: Slbs2223Component,
      },
      {
        path: "grant-tra-certi",
        component: Gtc2223Component,
      },
      {
        path: "pfms_acc",
        component: PfmsComponent,
      },
      {
        path: "overview",
        component: OverviewComponent,
      },
      {
        path: "resources",
        component: ResourceComponent,
      },
    ],
  },
  {
    path: "profileUpdate",
    component: IncompleteProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Xvfc2223UlbRoutingModule {}
