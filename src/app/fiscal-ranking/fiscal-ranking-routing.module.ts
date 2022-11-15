import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiscalHomeComponent } from './fiscal-home/fiscal-home.component';
import { FiscalLoginComponent } from './fiscal-login/fiscal-login.component';

const routes: Routes = [
  { path: "", component: FiscalHomeComponent},
  { path: "login", component: FiscalLoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiscalRankingRoutingModule { }
