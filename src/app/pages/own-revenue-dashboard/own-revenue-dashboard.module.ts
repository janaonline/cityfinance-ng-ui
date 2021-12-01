import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnRevenueDashboardRoutingModule } from './own-revenue-dashboard-routing.module';
import { OwnRevenueDashboardComponent } from './own-revenue-dashboard.component';


@NgModule({
  declarations: [OwnRevenueDashboardComponent],
  imports: [
    CommonModule,
    OwnRevenueDashboardRoutingModule
  ]
})
export class OwnRevenueDashboardModule { }
