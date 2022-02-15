import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlbDashboardComponent } from './slb-dashboard.component';

const routes: Routes = [
  {
    path: "", component: SlbDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlbDashboardRoutingModule { }
