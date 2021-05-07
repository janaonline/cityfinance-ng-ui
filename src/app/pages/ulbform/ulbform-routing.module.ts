import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrantTraCertiComponent } from './grant-tra-certi/grant-tra-certi.component';
import { SlbsComponent } from './slbs/slbs.component';
import { UlbformComponent } from './ulbform.component';
import { UtilisationReportComponent } from './utilisation-report/utilisation-report.component';
import { WaterSanitationComponent } from './water-sanitation/water-sanitation.component';
import { LinkPFMSComponent } from './link-pfms/link-pfms.component'
import { OverviewComponent } from './overview/overview.component';
import {PlanGuardGuard} from './water-sanitation/plan-guard.guard'
import { AnnualAccountsComponent } from './annual-accounts/annual-accounts.component';
import { SlbsGaurdGuard } from './slbs/slbs-gaurd.guard';
import { UlbGaurdGuard } from './ulb-gaurd.guard';
const routes: Routes = [
  {
    path: "",
    component: UlbformComponent,
    canActivate: [UlbGaurdGuard],
    children: [
      {
        path: "utilisation-report", component: UtilisationReportComponent
      },
      {
        path: "water-sanitation", component: WaterSanitationComponent,
        canActivate: [PlanGuardGuard]
      },
      {
        path: "grant-tra-certi", component: GrantTraCertiComponent
      },
      {
        path: "slbs", component: SlbsComponent,
        canActivate: [SlbsGaurdGuard]
      },
      {
        path: "pfms_acc", component: LinkPFMSComponent
      },
      {
        path: "overview", component: OverviewComponent
      },
      {

        path: "annual_acc", component: AnnualAccountsComponent
      },
      {
        path: "ulbform-overview", component: OverviewComponent
      }

    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UlbformRoutingModule { }
