import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FiscalHomeComponent } from './fiscal-home/fiscal-home.component';
import { FiscalLoginComponent } from './fiscal-login/fiscal-login.component';
import { ConfirmationGuard } from './guards/confirmation.guard';
import { ReviewUlbTableComponent } from './review-ulb-table/review-ulb-table.component';
import { UlbFiscalNewComponent } from './ulb-fiscal-new/ulb-fiscal-new.component';
import { UlbFiscalComponent } from './ulb-fiscal/ulb-fiscal.component';

const routes: Routes = [
  { path: "", component: FiscalHomeComponent },
  { path: "home", component: FiscalHomeComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "login", component: FiscalLoginComponent },
  { path: "ulb-form/:ulbId", component: UlbFiscalNewComponent },
  {
    path: "ulb-form",
    component: UlbFiscalNewComponent,
    canDeactivate: [ConfirmationGuard],
    data: {
      'formType': 'custom-form'
    },
  },
  { path: "review-rankings-ulbform", component: ReviewUlbTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiscalRankingRoutingModule { }
