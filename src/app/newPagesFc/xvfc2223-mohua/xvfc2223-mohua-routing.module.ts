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
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "review-ulb",
        component: ReviewUlbComponent,
      },
      {
        path: "review-state",
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
