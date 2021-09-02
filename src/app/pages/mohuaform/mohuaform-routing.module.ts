import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MohuaDashboardComponent } from './mohua-dashboard/mohua-dashboard.component'
import { MohuaformComponent } from './mohuaform.component'
import { GrantTransferMohuaComponent } from './grant-transfer-mohua/grant-transfer-mohua.component'
import { ReviewUlbComponent } from './review-ulb/review-ulb.component'
import { ReviewStateComponent } from './review-state/review-state.component'
import { AuthMohuaGuard } from './auth-mohua.guard';
const routes: Routes = [
  {
    path: "",
    component: MohuaformComponent,
    canActivate: [AuthMohuaGuard],
    children: [
      {
        path: "dashboard", component: MohuaDashboardComponent
      },
      {
        path: "review-ulb", component: ReviewUlbComponent
      },
      {
        path: "review-state", component: ReviewStateComponent
      },
      {
        path: "gt-mohua", component: GrantTransferMohuaComponent
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MohuaformRoutingModule { }
