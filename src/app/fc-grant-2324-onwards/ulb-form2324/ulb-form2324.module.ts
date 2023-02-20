import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UlbForm2324RoutingModule } from './ulb-form2324-routing.module';
import { UlbForm2324Component } from './ulb-form2324.component';
import { AnnualAccountComponent } from './annual-account/annual-account.component';
import { FcSharedModule } from '../fc-shared/fc-shared.module';



@NgModule({
  declarations: [UlbForm2324Component, AnnualAccountComponent],
  imports: [
    CommonModule,
    UlbForm2324RoutingModule,
    FcSharedModule,
  ]
})
export class UlbForm2324Module { }
