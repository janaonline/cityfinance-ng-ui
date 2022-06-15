import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OdfComponent } from "./odf/odf.component";
import { Xvfc2223UlbComponent } from "./xvfc2223-ulb.component";

const routes: Routes = [
  {
    path: "",
    component: Xvfc2223UlbComponent,
    // canActivate: [UlbGaurdGuard],
    children: [
      {
        path: "odf",
        component: OdfComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Xvfc2223UlbRoutingModule {}
