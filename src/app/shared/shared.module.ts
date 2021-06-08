import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { AngularMaterialModule } from '../angular-material.module';
import { InrCurrencyPipe } from '../dashboard/report/inr-currency.pipe';
import { CompletedComponent } from '../pages/questionnaires/components/completed/completed.component';
import { FormhistoryComponent } from '../users/data-upload/components/formhistory/formhistory.component';
import { FinancialDataService } from '../users/services/financial-data.service';
import {
  FileStatusCheckerInputComponent,
} from './components/file-status-checker-input/file-status-checker-input.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import {
  FinanceDataUploadInputComponent,
} from './components/finance-data-upload-input/finance-data-upload-input.component';
import { FinancialDataChartComponent } from './components/financial-data-chart/financial-data-chart.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';
import { ReUseableHeatMapComponent } from './components/re-useable-heat-map/re-useable-heat-map.component';
import { IncompleteProfileComponent } from './components/ulb/incomplete-profile/incomplete-profile.component';
import { UserTypeConfirmationComponent } from './components/user-type-confirmation/user-type-confirmation.component';
import { AuditStatusTextPipe } from './pipes/audit-status-text.pipe';
import { RoundoffPipe } from './pipes/roundoff/roundoff.pipe';
import { RupeeConverterPipe } from './pipes/rupee-converter.pipe';
import { TypeofPipe } from './pipes/typeof.pipe';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TickIconComponent } from './tick-icon/tick-icon.component';
import { FcSlbComponent } from './components/fc-slb/fc-slb.component';

import { MapDialogComponent } from './components/map-dialog/map-dialog.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
//G-Mpas
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmCoreModule } from "@agm/core";
import { WaterRejenuvationComponent } from './components/water-rejenuvation/water-rejenuvation.component';
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    AngularMultiSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCardModule,
    AngularMaterialModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyBum81Liii93xQ3JerXGozwDmNSutlZHro&libraries',
      libraries : ['places']
    }),
    MatCardModule
  ],
  declarations: [
    PreLoaderComponent,
    ReUseableHeatMapComponent,
    HomeHeaderComponent,
    RupeeConverterPipe,
    TypeofPipe,
    RoundoffPipe,
    AuditStatusTextPipe,
    SideMenuComponent,
    FileStatusCheckerInputComponent,
    FinanceDataUploadInputComponent,
    FinancialDataChartComponent,
    TickIconComponent,
    InrCurrencyPipe,
    CompletedComponent,
    UserTypeConfirmationComponent,
    FormhistoryComponent,
    IncompleteProfileComponent,
    FileUploadComponent,
    FcSlbComponent,
    MapDialogComponent,
    GoogleMapComponent,
    WaterRejenuvationComponent,
  ],
  exports: [
    PreLoaderComponent,
    ReUseableHeatMapComponent,
    RupeeConverterPipe,
    TypeofPipe,
    RoundoffPipe,
    AuditStatusTextPipe,
    HomeHeaderComponent,
    SideMenuComponent,
    FileStatusCheckerInputComponent,
    FinanceDataUploadInputComponent,
    FinancialDataChartComponent,
    TickIconComponent,
    InrCurrencyPipe,
    CompletedComponent,
    UserTypeConfirmationComponent,
    FormhistoryComponent,
    MatSlideToggle,
    MatSelect,
    MatOption,
    IncompleteProfileComponent,
    FileUploadComponent,
    MatCheckboxModule,
    FcSlbComponent
  ],
  providers: [FinancialDataService],
})
export class SharedModule {}
