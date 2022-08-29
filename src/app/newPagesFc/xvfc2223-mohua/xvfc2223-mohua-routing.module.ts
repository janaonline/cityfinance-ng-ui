import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ReviewStateComponent } from "./review-state/review-state.component";
import { ReviewUlbComponent } from "./review-ulb/review-ulb.component";
import { Xvfc2223MohuaComponent } from "./xvfc2223-mohua.component";

const routes: Routes = [
  {
    path: "",
    component: Xvfc2223MohuaComponent,
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
        path: "review-state-form",
        component: ReviewStateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Xvfc2223MohuaRoutingModule {}
