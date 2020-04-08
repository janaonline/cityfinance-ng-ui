import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';
import { ReUseableHeatMapComponent } from './components/re-useable-heat-map/re-useable-heat-map.component';
import { AuditStatusTextPipe } from './pipes/audit-status-text.pipe';
import { RoundoffPipe } from './pipes/roundoff/roundoff.pipe';
import { RupeeConverterPipe } from './pipes/rupee-converter.pipe';
import { TypeofPipe } from './pipes/typeof.pipe';

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
    MatProgressSpinnerModule
  ],
  declarations: [
    PreLoaderComponent,
    ReUseableHeatMapComponent,
    HomeHeaderComponent,
    RupeeConverterPipe,
    TypeofPipe,
    RoundoffPipe,
    AuditStatusTextPipe
  ],
  exports: [
    PreLoaderComponent,
    ReUseableHeatMapComponent,
    RupeeConverterPipe,
    TypeofPipe,
    RoundoffPipe,
    AuditStatusTextPipe,
    HomeHeaderComponent
  ]
})
export class SharedModule {}
