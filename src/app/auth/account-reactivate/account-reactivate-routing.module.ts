import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountReactivateComponent } from './account-reactivate.component';

const routes: Routes = [{ path: "", component: AccountReactivateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordRoutingModule {}
