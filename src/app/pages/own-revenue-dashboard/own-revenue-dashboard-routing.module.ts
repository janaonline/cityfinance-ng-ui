import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnRevenueDashboardComponent } from './own-revenue-dashboard.component';

const routes: Routes = [
  {
    path: '', component: OwnRevenueDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnRevenueDashboardRoutingModule { }
