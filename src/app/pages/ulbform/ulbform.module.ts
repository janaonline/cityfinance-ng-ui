import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UlbformRoutingModule } from './ulbform-routing.module';
import { UtilisationReportComponent } from './utilisation-report/utilisation-report.component';
import { UlbformComponent } from './ulbform.component';


@NgModule({
  declarations: [UtilisationReportComponent, UlbformComponent],
  imports: [
    CommonModule,
    UlbformRoutingModule
  ]
})
export class UlbformModule { }
