import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FiscalHomeComponent } from './fiscal-home/fiscal-home.component';
import { FiscalLoginComponent } from './fiscal-login/fiscal-login.component';
import { ConfirmationGuard } from './guards/confirmation.guard';
import { ReviewUlbTableComponent } from './review-ulb-table/review-ulb-table.component';
import { UlbFiscalNewComponent } from './ulb-fiscal-new/ulb-fiscal-new.component';
//import { UlbFiscalComponent } from './ulb-fiscal/ulb-fiscal.component';
import { MapcomponentComponent } from './mapcomponent/mapcomponent.component';
import { HomeComponent } from './home/home.component';
import { AssessmentParameterComponent } from './assessment-parameter/assessment-parameter.component';
import { AnnualFinancialStatementsComponent } from './annual-financial-statements/annual-financial-statements.component';
import { AnnualBudgetsComponent } from './annual-budgets/annual-budgets.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
{ path: "home", component: HomeComponent },
  // { path: "", component: FiscalHomeComponent },
  // { path: "home", component: FiscalHomeComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "login", component: FiscalLoginComponent },
  { path: "annual-financial-statements", component: AnnualFinancialStatementsComponent },
  { path: "annual-budgets", component: AnnualBudgetsComponent },
  {
    path: "ulb-form/:ulbId",
    component: UlbFiscalNewComponent,
    canDeactivate: [ConfirmationGuard],
    data: {
      'formType': 'custom-form'
    },
  },
  {
    path: "ulb-form",
    component: UlbFiscalNewComponent,
    canDeactivate: [ConfirmationGuard],
    data: {
      'formType': 'custom-form'
    },
  },
  { path: "review-rankings-ulbform", component: ReviewUlbTableComponent },
  { path: 'test', component: MapcomponentComponent },
  {
    path: "populationWise/:stateId",
    component: DashboardComponent,
    data: {
      table: {
        id: 'populationWise',
        endpoint: 'fiscal-ranking/overview/populationWise',
        response: null,
      }
    }
  },
  {
    path: "populationWise",
    component: DashboardComponent,
    data: {
      table: {
        id: 'populationWise',
        endpoint: 'fiscal-ranking/overview/populationWise',
        response: null,
      }
    }
  },
  {
    path: 'assesst-parameters/:id', component: AssessmentParameterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiscalRankingRoutingModule { }
