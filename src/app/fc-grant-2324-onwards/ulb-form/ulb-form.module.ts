import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UlbFormRoutingModule } from './ulb-form-routing.module';
import { AnnualAccountComponent } from './annual-account/annual-account.component';


@NgModule({
  declarations: [AnnualAccountComponent],
  imports: [
    CommonModule,
    UlbFormRoutingModule
  ]
})
export class UlbFormModule { }
