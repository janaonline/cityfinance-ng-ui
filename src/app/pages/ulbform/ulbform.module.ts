import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UlbformRoutingModule } from './ulbform-routing.module';
import { UtilisationReportComponent } from './utilisation-report/utilisation-report.component';
import { UlbformComponent } from './ulbform.component';
import { PreviewUtiFormComponent } from './utilisation-report/preview-uti-form/preview-uti-form.component';

import { MatDialogModule } from '@angular/material/dialog';
import { WaterSanitationComponent } from './water-sanitation/water-sanitation.component';
import { SixDigitDecimaNumberDirective, TwoDigitDecimaNumberDirective } from './utilisation-report/decimal.directive';
import { GrantTraCertiComponent } from './grant-tra-certi/grant-tra-certi.component';
import { ImagePreviewComponent } from './utilisation-report/image-preview/image-preview.component';
import { SlbsComponent } from './slbs/slbs.component';
import { OverviewComponent } from './overview/overview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PreviewSlbComponentComponent } from './preview-slb-component/preview-slb-component.component';
import { LinkPFMSComponent } from './link-pfms/link-pfms.component';
//ngx-bootstrap
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AnnualAccountsComponent } from './annual-accounts/annual-accounts.component';
import { UlbformPreviewComponent } from './ulbform-preview/ulbform-preview.component';
import { PfmsPreviewComponent } from './link-pfms/pfms-preview/pfms-preview.component';
import { WaterSanitationPreviewComponent } from './water-sanitation/water-sanitation-preview/water-sanitation-preview.component';
import { PlanGuardGuard } from './water-sanitation/plan-guard.guard'
import { SlbsGaurdGuard } from './slbs/slbs-gaurd.guard';
import { AnnualPreviewComponent } from './annual-accounts/annual-preview/annual-preview.component';
import { ServiceSlbsComponent } from './service-slbs/service-slbs.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  entryComponents: [PreviewUtiFormComponent, ImagePreviewComponent],
  declarations: [
    UtilisationReportComponent,
    UlbformComponent,
    PreviewUtiFormComponent,
    WaterSanitationComponent,
    TwoDigitDecimaNumberDirective,
    SixDigitDecimaNumberDirective,
    GrantTraCertiComponent,
    ImagePreviewComponent,
    SlbsComponent,
    OverviewComponent,
    PreviewSlbComponentComponent,
    LinkPFMSComponent,
    AnnualAccountsComponent,
    UlbformPreviewComponent,
    PfmsPreviewComponent,
    WaterSanitationPreviewComponent,
    AnnualPreviewComponent,
    ServiceSlbsComponent,

  ],
  imports: [
    CarouselModule.forRoot(),
    CommonModule,
    UlbformRoutingModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,

    SharedModule,
    MatTooltipModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot()

  ],
  providers: [PlanGuardGuard]
})
export class UlbformModule { }
