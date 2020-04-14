import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ReportsComponent} from './reports.component';
import {UsageReportComponent} from './usage-report/usage-report.component';

const routes: Routes = [{
  path: '',
  component: ReportsComponent,
  children: [
    {
      path: 'usage',
      component:UsageReportComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [ReportsComponent]
})
export class ReportsRoutingModule {
}
