import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiscalRankingRoutingModule } from './fiscal-ranking-routing.module';
import { FiscalHomeComponent } from './fiscal-home/fiscal-home.component';
import { FiscalLoginComponent } from './fiscal-login/fiscal-login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

import { MatCardModule } from "@angular/material/card";
import { UlbFiscalComponent } from './ulb-fiscal/ulb-fiscal.component';
import { SharedModule } from '../shared/shared.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { LoaderComponent } from './loader/loader.component';
import {MatRadioModule} from '@angular/material/radio';
import { UlbFisPreviewComponent } from './ulb-fiscal-new/ulb-fis-preview/ulb-fis-preview.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RecaptchaModule } from 'ng-recaptcha';
import { MdePopoverModule } from '@material-extended/mde';
import { DownloadPopupComponent } from './download-popup/download-popup.component';
import { ReviewUlbTableComponent } from './review-ulb-table/review-ulb-table.component';
import { Shared2223Module } from '../shared2223/shared2223.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { UlbFiscalNewComponent } from './ulb-fiscal-new/ulb-fiscal-new.component';
import { TowordPipe } from './pipes/toword.pipe';
import { PercentprogressPipe } from './pipes/percentprogress.pipe';
import { YearInfoPipe } from './pipes/year-info.pipe';
import { DisplayPositionPipe } from './pipes/display-position.pipe';
import { DecimalLimitDirective } from './ulb-fiscal-new/decimal-limit.directive';
import { NoUpDownDirective } from './ulb-fiscal-new/no-up-down.directive';
import { AlreadyUpdatedUrlPipe } from './pipes/already-updated-url.pipe';
import { MapcomponentComponent } from './mapcomponent/mapcomponent.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonTableComponent } from './common-table/common-table.component';

@NgModule({
  declarations: [
    FiscalHomeComponent,
    FiscalLoginComponent,
    UlbFiscalComponent,
    UlbFiscalNewComponent,
    LoaderComponent,
    UlbFisPreviewComponent,
    DownloadPopupComponent,
    ReviewUlbTableComponent,
    TowordPipe,
    PercentprogressPipe,
    YearInfoPipe,
    DisplayPositionPipe,
    DecimalLimitDirective,
    NoUpDownDirective,
    AlreadyUpdatedUrlPipe,
    MapcomponentComponent,
    DashboardComponent,
    CommonTableComponent,
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    FiscalRankingRoutingModule,
    MatRadioModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatTooltipModule,
    RecaptchaModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MdePopoverModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxPaginationModule,
    Shared2223Module,
    AngularMultiSelectModule
  ],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
  // providers: [
  //   {
  //     provide: STEPPER_GLOBAL_OPTIONS,
  //     useValue: { displayDefaultIndicatorType: false }
  //   }
  // ],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
  // bootstrap: [UlbFiscalComponent],
})
export class FiscalRankingModule { }
