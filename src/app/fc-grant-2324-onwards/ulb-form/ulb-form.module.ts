import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UlbFormRoutingModule } from './ulb-form-routing.module';
import { UlbFormComponent } from './ulb-form.component';
import { AnnualAccountComponent } from './annual-account/annual-account.component';
import { FcSharedModule } from '../fc-shared/fc-shared.module';
import { WebFormModule } from 'src/app/mform_webform/web-form/web-form.module';
import { CommonFormComponent } from './common-form/common-form.component';



@NgModule({
  declarations: [UlbFormComponent, AnnualAccountComponent, CommonFormComponent],
  imports: [
    CommonModule,
    UlbFormRoutingModule,
    FcSharedModule,
    WebFormModule
  ]
})
export class UlbFormModule { }
