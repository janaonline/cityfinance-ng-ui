import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CityComponent } from "./city/city.component";
import { NationalComponent } from "./national/national.component";
import { SlbDashboardComponent } from "./slb-dashboard/slb-dashboard.component";
import { StateComponent } from "./state/state.component";

const routes: Routes = [
  {
    path: "city",
    component: CityComponent,
  },
  {
    path: "state",
    component: StateComponent,
  },
  {
    path: "slb",
    component: SlbDashboardComponent,
  },

  // { path: "national", component: NationalComponent },
  {
    path: "national",
    loadChildren: () =>
      import("./national/national.module").then(
        (m) => m.NationalModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewDashbordsRoutingModule {}
