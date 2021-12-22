import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnRevenueDashboardRoutingModule } from './own-revenue-dashboard-routing.module';
import { OwnRevenueDashboardComponent } from './own-revenue-dashboard.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [OwnRevenueDashboardComponent],
  imports: [
    CommonModule,
    OwnRevenueDashboardRoutingModule,
    SharedModule
  ]
})
export class OwnRevenueDashboardModule { }
