import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Mohua2223Guard } from "src/app/shared2223/common-gaurds/mohua/mohua2223.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MohuaGtcComponent } from "./mohua-gtc/mohua-gtc.component";
import { ReviewStateComponent } from "./review-state/review-state.component";
import { ReviewUlbTableComponent } from "./review-ulb-table/review-ulb-table.component";
import { ReviewUlbComponent } from "./review-ulb/review-ulb.component";
import { Xvfc2223MohuaComponent } from "./xvfc2223-mohua.component";

const routes: Routes = [
  {
    path: "",
    component: Xvfc2223MohuaComponent,
    canActivate: [Mohua2223Guard],
    children: [
      {
        path: "mohua-dashboard",
        component: DashboardComponent,
      },
      {
        path: "review-grant-app",
        component: ReviewUlbComponent,
      },
      {
        path: "review-ulb-table",
        component: ReviewUlbTableComponent,
      },
      {
        path: "review-state-form",
        component: ReviewStateComponent,
      },
      {
        path: "gtc",
        component: MohuaGtcComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Xvfc2223MohuaRoutingModule {}
