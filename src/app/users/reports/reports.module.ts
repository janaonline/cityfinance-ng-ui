import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReportsRoutingModule} from './reports-routing.module';
import {ReportTableComponent} from './report-table/report-table.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ReportTableComponent]
})
export class ReportsModule {
}
