import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnnualAccountsCreateComponent } from './annual-accounts-create/annual-accounts-create.component';

const routes: Routes = [
  { path: "", component: AnnualAccountsCreateComponent },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnualAccountsRoutingModule {}
