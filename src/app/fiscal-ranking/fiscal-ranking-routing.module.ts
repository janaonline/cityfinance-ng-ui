import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiscalHomeComponent } from './fiscal-home/fiscal-home.component';
import { FiscalLoginComponent } from './fiscal-login/fiscal-login.component';
import { ReviewUlbTableComponent } from './review-ulb-table/review-ulb-table.component';
import { UlbFiscalNewComponent } from './ulb-fiscal-new/ulb-fiscal-new.component';
import { UlbFiscalComponent } from './ulb-fiscal/ulb-fiscal.component';
import { MapcomponentComponent } from './mapcomponent/mapcomponent.component';

const routes: Routes = [
  { path: "", component: FiscalHomeComponent },
  { path: "home", component: FiscalHomeComponent },
  { path: "login", component: FiscalLoginComponent},
  { path: "ulb-form/:ulbId", component: UlbFiscalNewComponent },
  { path: "ulb-form", component: UlbFiscalNewComponent },
  { path: "review-rankings-ulbform", component: ReviewUlbTableComponent },
  { path :'test',component:MapcomponentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiscalRankingRoutingModule { }
