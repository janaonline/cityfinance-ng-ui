import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiscalHomeComponent } from './fiscal-home/fiscal-home.component';
import { FiscalLoginComponent } from './fiscal-login/fiscal-login.component';
import { UlbFiscalComponent } from './ulb-fiscal/ulb-fiscal.component';

const routes: Routes = [
  { path: "", component: FiscalHomeComponent },
  { path: "home", component: FiscalHomeComponent },
 // { path: "login", component: FiscalLoginComponent},
 // { path: "ulb-form", component: UlbFiscalComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiscalRankingRoutingModule { }
