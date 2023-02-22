import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UlbFormRoutingModule } from './ulb-form-routing.module';
import { UlbFormComponent } from './ulb-form.component';
import { AnnualAccountComponent } from './annual-account/annual-account.component';
import { FcSharedModule } from '../fc-shared/fc-shared.module';



@NgModule({
  declarations: [UlbFormComponent, AnnualAccountComponent],
  imports: [
    CommonModule,
    UlbFormRoutingModule,
    FcSharedModule,
  ]
})
export class UlbFormModule { }
