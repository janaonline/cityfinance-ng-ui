import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ReportsComponent} from './reports.component';
import {ReportTableComponent} from './report-table/report-table.component';

const routes: Routes = [{
  path: '',
  component: ReportsComponent,
  children: [
    {
      path: ':type',
      component: ReportTableComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [ReportsComponent]
})
export class ReportsRoutingModule {
}
