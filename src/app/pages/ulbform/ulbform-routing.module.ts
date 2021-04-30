import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrantTraCertiComponent } from './grant-tra-certi/grant-tra-certi.component';
import { SlbsComponent } from './slbs/slbs.component';
import { UlbformComponent } from './ulbform.component';
import { UtilisationReportComponent } from './utilisation-report/utilisation-report.component';
import { WaterSanitationComponent } from './water-sanitation/water-sanitation.component';
import { LinkPFMSComponent } from './link-pfms/link-pfms.component'
import { OverviewComponent } from './overview/overview.component';
const routes: Routes = [
  {
    path: "",
    component: UlbformComponent,
    children: [
      {
        path: "utilisation-report", component: UtilisationReportComponent
      },
      {
        path: "water-sanitation", component: WaterSanitationComponent
      },
      {
        path: "grant-tra-certi", component: GrantTraCertiComponent
      },
      {
        path: "slbs", component: SlbsComponent
      },
      {
        path: "pfms_acc", component: LinkPFMSComponent
      },
      {
        path: "overview", component: OverviewComponent
      }

    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UlbformRoutingModule { }
