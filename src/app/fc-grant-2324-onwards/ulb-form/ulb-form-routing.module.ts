import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnualAccountComponent } from './annual-account/annual-account.component';
import { DurComponent } from './dur/dur.component';
import { CommonFormComponent } from './common-form/common-form.component';
import { UlbFormComponent } from './ulb-form.component';
import { TwentyEightSlbComponent } from './twenty-eight-slb/twenty-eight-slb.component';
import { OverviewComponent } from './overview/overview.component';
import { ResourceComponent } from './resource/resource.component';
import { ConfirmationGuard } from '../guards/confirmation.guard';
import { PropertyTaxComponent } from './property-tax/property-tax.component';
import { PfmsComponent } from './pfms/pfms.component';
import { FourSlbComponent } from './four-slb/four-slb.component';
import { Ulb2223Guard } from 'src/app/shared2223/common-gaurds/ulb/ulb2223.guard';

const routes: Routes = [
  {
    path: "",
    component: UlbFormComponent,
    canActivate: [Ulb2223Guard],
    children: [
      {
        path: "annual_acc",
        component: AnnualAccountComponent,
        canDeactivate: [ConfirmationGuard]
      },
      {
        path: "utilisation-report",
        component: DurComponent,
        canDeactivate: [ConfirmationGuard]
      },
      {
        path: "odf",
        component: CommonFormComponent,
        canDeactivate: [ConfirmationGuard]
      },
      {
        path: "gfc",
        component: CommonFormComponent,
        canDeactivate: [ConfirmationGuard]
      },
      {
        path: "ptax",
        component: PropertyTaxComponent,
        canDeactivate: [ConfirmationGuard],
      },
      {
        path: "28SLBsForm",
        component: TwentyEightSlbComponent,
        canDeactivate: [ConfirmationGuard]
      },
      {
        path: "slbs",
        component: FourSlbComponent,
        canDeactivate: [ConfirmationGuard]
      },
      {
        path: "overview",
        component: OverviewComponent,
        canDeactivate: [ConfirmationGuard]
      },
      {
        path: "resources",
        component: ResourceComponent,
        canDeactivate: [ConfirmationGuard]
      },
      {
        path: "pfms_acc",
        component: PfmsComponent,
        canDeactivate: [ConfirmationGuard]
      },
      

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UlbFormRoutingModule { }
