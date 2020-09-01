import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AnnualAccountsCreateComponent } from "./annual-accounts-create/annual-accounts-create.component";
import { AnnualAccountsViewComponent } from "./annual-accounts-view/annual-accounts-view.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "create",
  },
  { path: "create", component: AnnualAccountsCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnualAccountsRoutingModule {}
