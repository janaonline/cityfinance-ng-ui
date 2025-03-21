import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DurDumpComponent } from 'src/app/fc-grant-2324-onwards/ulb-form/dur/dur-dump/dur-dump.component';
import { Ulb2223Guard } from 'src/app/shared2223/common-gaurds/ulb/ulb2223.guard';
import { ConfirmationGuard } from '../guards/confirmation.guard';
import { AnnualAccountComponent } from './annual-account/annual-account.component';
import { CommonFormComponent } from './common-form/common-form.component';
import { DurComponent } from './dur/dur.component';
import { FourSlbComponent } from './four-slb/four-slb.component';
import { OverviewComponent } from './overview/overview.component';
import { PfmsComponent } from './pfms/pfms.component';
import { PropertyTaxComponent } from './property-tax/property-tax.component';
import { ResourceComponent } from './resource/resource.component';
import { TwentyEightSlbComponent } from './twenty-eight-slb/twenty-eight-slb.component';
import { UlbFormComponent } from './ulb-form.component';
import { VideoGallaryComponent } from './video-gallary/video-gallary.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

const routes: Routes = [
  {
    path: ":yearId",
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
      {
        path: "video-gallary",
        component: VideoGallaryComponent,
      },
      {
        path: "feedback",
        component: FeedbackFormComponent,
      },
      {
        path: "utilisation-report/:id",
        component: DurComponent,
      },
      {
        path: "dur-dump-pdf/:stateId",
        component: DurDumpComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UlbFormRoutingModule { }
