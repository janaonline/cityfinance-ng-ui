import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateFormRoutingModule } from './state-form-routing.module';
import { StateFormComponent } from './state-form.component';
import { ReviewUlbTableComponent } from './review-ulb-table/review-ulb-table.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { Shared2223Module } from 'src/app/shared2223/shared2223.module';
import { FcSharedModule } from '../fc-shared/fc-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GtcComponent } from './gtc/gtc.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { WebFormModule } from 'src/app/mform_webform/web-form/web-form.module';
import { GtcPreviewComponent } from './gtc/gtc-preview/gtc-preview.component';


@NgModule({
  declarations: [StateFormComponent, ReviewUlbTableComponent, DashbordComponent, GtcComponent, GtcPreviewComponent],
  imports: [
    CommonModule,
    StateFormRoutingModule,
    FcSharedModule,
    Shared2223Module,
    ReactiveFormsModule,
    FormsModule,
    WebFormModule,
    AccordionModule.forRoot(),
  ]
})
export class StateFormModule { }
