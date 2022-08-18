import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Xvfc2223MohuaRoutingModule } from './xvfc2223-mohua-routing.module';
import { Xvfc2223MohuaComponent } from './xvfc2223-mohua.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReviewUlbComponent } from './review-ulb/review-ulb.component';
import { ReviewStateComponent } from './review-state/review-state.component';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { Shared2223Module } from "src/app/shared2223/shared2223.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    Xvfc2223MohuaComponent,
    DashboardComponent,
    ReviewUlbComponent,
    ReviewStateComponent,
  ],
  imports: [
    CommonModule,
    Xvfc2223MohuaRoutingModule,
    Shared2223Module,
    MatIconModule,
    MatTooltipModule,
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class Xvfc2223MohuaModule {}
