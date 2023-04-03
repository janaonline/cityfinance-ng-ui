import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateFormRoutingModule } from './state-form-routing.module';
import { StateFormComponent } from './state-form.component';
import { ReviewUlbTableComponent } from './review-ulb-table/review-ulb-table.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { Shared2223Module } from 'src/app/shared2223/shared2223.module';
import { FcSharedModule } from '../fc-shared/fc-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [StateFormComponent, ReviewUlbTableComponent, DashbordComponent],
  imports: [
    CommonModule,
    StateFormRoutingModule,
    FcSharedModule,
    Shared2223Module,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class StateFormModule { }
