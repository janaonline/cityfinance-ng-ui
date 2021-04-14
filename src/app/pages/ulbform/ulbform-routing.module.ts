import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UlbformComponent } from './ulbform.component';
import { UtilisationReportComponent } from './utilisation-report/utilisation-report.component';

const routes: Routes = [
 {
  path: "",
  component: UlbformComponent,
  children: [
  {
    path:"utilisation-report" , component: UtilisationReportComponent
  }
]
 }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UlbformRoutingModule { }
