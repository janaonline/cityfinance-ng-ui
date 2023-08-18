import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UlbFormRoutingModule } from './ulb-form-routing.module';
import { UlbFormComponent } from './ulb-form.component';
import { AnnualAccountComponent } from './annual-account/annual-account.component';
import { FcSharedModule } from '../fc-shared/fc-shared.module';
 import { WebFormModule } from 'src/app/web-form/web-form.module';
import { DurComponent } from './dur/dur.component';
import { DurPreviewComponent } from './dur/dur-preview/dur-preview.component';
import { CommonFormComponent } from './common-form/common-form.component';
import { TwentyEightSlbComponent } from './twenty-eight-slb/twenty-eight-slb.component';
import { TwentyEightSlbPreviewComponent } from './twenty-eight-slb/twenty-eight-slb-preview/twenty-eight-slb-preview.component';
import { OverviewComponent } from './overview/overview.component';
import { ResourceComponent } from './resource/resource.component';
import { PropertyTaxComponent } from './property-tax/property-tax.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { PreviewComponent } from './property-tax/preview/preview.component';
import { PfmsComponent } from './pfms/pfms.component';
import { FourSlbComponent } from './four-slb/four-slb.component';
import { DecimalLimitDirective } from './property-tax/decimal-limit.directive';
import { YearComparisionPipe } from './property-tax/year-comparision.pipe';
import { AllowedFileTypesPipe } from './property-tax/allowed-file-types.pipe';
import { FormErrorPipe } from './property-tax/form-error.pipe';
import { VideoGallaryComponent } from './video-gallary/video-gallary.component';



@NgModule({
  declarations: [
    UlbFormComponent, 
    AnnualAccountComponent, 
    DurComponent, 
    DurPreviewComponent, 
    CommonFormComponent, 
    TwentyEightSlbComponent, 
    TwentyEightSlbPreviewComponent, 
    OverviewComponent, 
    ResourceComponent, 
    PropertyTaxComponent, LoaderComponent, PreviewComponent, PfmsComponent, FourSlbComponent, DecimalLimitDirective, YearComparisionPipe, AllowedFileTypesPipe, FormErrorPipe, VideoGallaryComponent
  ],
  imports: [
    CommonModule,
    UlbFormRoutingModule,
    FcSharedModule,
    WebFormModule,
    MatFormFieldModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatIconModule,
    ReactiveFormsModule,
  ]
})
export class UlbFormModule { }
