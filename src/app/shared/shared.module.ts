import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { AngularMaterialModule } from '../angular-material.module';
import { InrCurrencyPipe } from '../dashboard/report/inr-currency.pipe';
import { CompletedComponent } from '../pages/questionnaires/components/completed/completed.component';
import { FinancialDataService } from '../users/services/financial-data.service';
import {
  FileStatusCheckerInputComponent,
} from './components/file-status-checker-input/file-status-checker-input.component';
import {
  FinanceDataUploadInputComponent,
} from './components/finance-data-upload-input/finance-data-upload-input.component';
import { FinancialDataChartComponent } from './components/financial-data-chart/financial-data-chart.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';
import { ReUseableHeatMapComponent } from './components/re-useable-heat-map/re-useable-heat-map.component';
import { UserTypeConfirmationComponent } from './components/user-type-confirmation/user-type-confirmation.component';
import { AuditStatusTextPipe } from './pipes/audit-status-text.pipe';
import { RoundoffPipe } from './pipes/roundoff/roundoff.pipe';
import { RupeeConverterPipe } from './pipes/rupee-converter.pipe';
import { TypeofPipe } from './pipes/typeof.pipe';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TickIconComponent } from './tick-icon/tick-icon.component';

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
  ],
  providers: [FinancialDataService],
})
export class SharedModule {}
