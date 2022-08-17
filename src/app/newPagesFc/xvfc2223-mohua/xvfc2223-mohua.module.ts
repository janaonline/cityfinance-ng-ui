import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Xvfc2223MohuaRoutingModule } from './xvfc2223-mohua-routing.module';
import { Xvfc2223MohuaComponent } from './xvfc2223-mohua.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReviewUlbComponent } from './review-ulb/review-ulb.component';
import { ReviewStateComponent } from './review-state/review-state.component';


@NgModule({
  declarations: [Xvfc2223MohuaComponent, DashboardComponent, ReviewUlbComponent, ReviewStateComponent],
  imports: [
    CommonModule,
    Xvfc2223MohuaRoutingModule
  ]
})
export class Xvfc2223MohuaModule { }
