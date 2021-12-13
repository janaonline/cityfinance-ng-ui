import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CityComponent } from "./city/city.component";
import { NationalComponent } from "./national/national.component";
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
  { path: "national", component: NationalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewDashbordsRoutingModule {}
