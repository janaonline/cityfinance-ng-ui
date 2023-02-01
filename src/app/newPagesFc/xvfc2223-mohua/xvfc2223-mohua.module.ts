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
import { MohuaGtcComponent } from './mohua-gtc/mohua-gtc.component';
import { GrantTransferMohuaComponent } from 'src/app/pages/mohuaform/grant-transfer-mohua/grant-transfer-mohua.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReviewUlbTableComponent } from './review-ulb-table/review-ulb-table.component';


@NgModule({
  declarations: [
    Xvfc2223MohuaComponent,
    DashboardComponent,
    ReviewUlbComponent,
    ReviewStateComponent,
    MohuaGtcComponent,
    ReviewUlbTableComponent,
  ],
  imports: [
    CommonModule,
    Xvfc2223MohuaRoutingModule,
    SharedModule,
    Shared2223Module,
    MatIconModule,
    MatTooltipModule,
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  //  GrantTransferMohuaComponent
  ],
})
export class Xvfc2223MohuaModule {}
