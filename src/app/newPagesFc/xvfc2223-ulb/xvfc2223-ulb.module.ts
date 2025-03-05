import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { GlobalPartModule } from "src/app/global-part/global-part.module";
import { SharedModule } from "src/app/shared/shared.module";
import { Shared2223Module } from "src/app/shared2223/shared2223.module";
import { DurDumpComponent } from '../../fc-grant-2324-onwards/ulb-form/dur/dur-dump/dur-dump.component';
import { AnnualAccountsComponent } from "./annual-accounts/annual-accounts.component";
import { AnnualPreviewComponent } from "./annual-accounts/annual-preview/annual-preview.component";
import {
  NsixDigitDecimaNumberDirective,
  NtwoDigitDecimaNumberDirective,
} from "./decimal.directive";
import { DetailedUtilizationReportComponent } from "./detailed-utilization-report/detailed-utilization-report.component";
import { DurPreviewComponent } from "./detailed-utilization-report/dur-preview/dur-preview.component";
import { GfcComponent } from "./gfc/gfc.component";
import { Gtc2223Component } from "./gtc2223/gtc2223.component";
import { OdfComponent } from "./odf/odf.component";
import { OverviewComponent } from "./overview/overview.component";
import { CharacterDirective, PatternDirective } from "./pattern.directive";
import { PfmsPreviewComponent } from './pfms-preview/pfms-preview.component';
import { PfmsComponent } from "./pfms/pfms.component";
import { PropertyTaxOperationalisationPreviewComponent } from './property-tax-operationalisation/property-tax-operationalisation-preview/property-tax-operationalisation-preview.component';
import { PropertyTaxOperationalisationComponent } from "./property-tax-operationalisation/property-tax-operationalisation.component";
import { ResourceComponent } from "./resource/resource.component";
import { Slbs2223PreviewComponent } from './slbs2223/slbs2223-preview/slbs2223-preview.component';
import { Slbs2223Component } from "./slbs2223/slbs2223.component";
import { Slbs28FormPreviewComponent } from './slbs28-form/slbs28-form-preview/slbs28-form-preview.component';
import { Slbs28FormComponent } from './slbs28-form/slbs28-form.component';
import { Xvfc2223UlbRoutingModule } from "./xvfc2223-ulb-routing.module";
import { Xvfc2223UlbComponent } from "./xvfc2223-ulb.component";

@NgModule({
  declarations: [
    Xvfc2223UlbComponent,
    OdfComponent,
    AnnualAccountsComponent,
    GfcComponent,
    AnnualPreviewComponent,
    DetailedUtilizationReportComponent,
    Slbs2223Component,
    Gtc2223Component,
    PfmsComponent,
    NtwoDigitDecimaNumberDirective,
    NsixDigitDecimaNumberDirective,
    OverviewComponent,
    ResourceComponent,
    DurPreviewComponent,
    PatternDirective,
    CharacterDirective,
    PfmsPreviewComponent,
    PropertyTaxOperationalisationComponent,
    Slbs28FormComponent,
    Slbs28FormPreviewComponent,
    PropertyTaxOperationalisationPreviewComponent,
    Slbs2223PreviewComponent,
    DurDumpComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Xvfc2223UlbRoutingModule,
    Shared2223Module,
    MatIconModule,
    MatTooltipModule,
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    SharedModule,
    PdfViewerModule,
    GlobalPartModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [Xvfc2223UlbRoutingModule],
})
export class Xvfc2223UlbModule {}
