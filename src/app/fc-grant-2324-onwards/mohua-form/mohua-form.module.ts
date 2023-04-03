import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MohuaFormRoutingModule } from './mohua-form-routing.module';
import { MohuaFormComponent } from './mohua-form.component';
import { ReviewUlbTableComponent } from './review-ulb-table/review-ulb-table.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { FcSharedModule } from '../fc-shared/fc-shared.module';
import { Shared2223Module } from 'src/app/shared2223/shared2223.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MohuaFormComponent, ReviewUlbTableComponent, DashbordComponent],
  imports: [
    CommonModule,
    MohuaFormRoutingModule,
    FcSharedModule,
    Shared2223Module,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class MohuaFormModule { }
