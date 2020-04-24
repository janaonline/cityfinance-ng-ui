import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReportsRoutingModule} from './reports-routing.module';
import {ReportTableComponent} from './report-table/report-table.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../../angular-material.module';

@NgModule({
    imports: [
        CommonModule,
        ReportsRoutingModule,
        ReactiveFormsModule,
        AngularMaterialModule
    ],
  declarations: [ReportTableComponent]
})
export class ReportsModule {
}
