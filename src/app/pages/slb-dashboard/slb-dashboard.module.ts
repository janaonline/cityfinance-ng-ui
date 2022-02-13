import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlbDashboardRoutingModule } from './slb-dashboard-routing.module';
import { SlbDashboardComponent } from './slb-dashboard.component';


@NgModule({
  declarations: [SlbDashboardComponent],
  imports: [
    CommonModule,
    SlbDashboardRoutingModule
  ]
})
export class SlbDashboardModule { }
