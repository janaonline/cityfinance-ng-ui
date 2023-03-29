import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UlbFormRoutingModule } from './ulb-form-routing.module';
import { UlbFormComponent } from './ulb-form.component';
import { AnnualAccountComponent } from './annual-account/annual-account.component';
import { FcSharedModule } from '../fc-shared/fc-shared.module';
 import { WebFormModule } from 'src/app/mform_webform/web-form/web-form.module';
import { DurComponent } from './dur/dur.component';
import { DurPreviewComponent } from './dur/dur-preview/dur-preview.component';
import { CommonFormComponent } from './common-form/common-form.component';
import { TwentyEightSlbComponent } from './twenty-eight-slb/twenty-eight-slb.component';
import { TwentyEightSlbPreviewComponent } from './twenty-eight-slb/twenty-eight-slb-preview/twenty-eight-slb-preview.component';
import { OverviewComponent } from './overview/overview.component';
import { ResourceComponent } from './resource/resource.component';



@NgModule({
  declarations: [UlbFormComponent, AnnualAccountComponent, DurComponent, DurPreviewComponent, CommonFormComponent, TwentyEightSlbComponent, TwentyEightSlbPreviewComponent, OverviewComponent, ResourceComponent],
  imports: [
    CommonModule,
    UlbFormRoutingModule,
    FcSharedModule,
    WebFormModule,
  ]
})
export class UlbFormModule { }
