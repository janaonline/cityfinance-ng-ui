import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule
} from '@angular/material';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { AngularMaterialModule } from '../angular-material.module';
import { UlbCoverageComponent } from '../pages/analytics/home-tab-view/ulb-coverage/ulb-coverage.component';
import { CfChartsModule } from '../shared/cf-charts/cf-charts.module';
import { SharedModule } from '../shared/shared.module';
import { AuthRouter } from './auth.router';
import { AuthService } from './auth.service';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRouter,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CfChartsModule,
    AngularMaterialModule,
    CommonModule,
    AngularMultiSelectModule,
    MatTooltipModule,
    MatDialogModule,

    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  providers: [AuthService],
  declarations: [StatisticsComponent, UlbCoverageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
