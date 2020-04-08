import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
} from '@angular/material';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { AngularMaterialModule } from '../angular-material.module';
import { CfChartsModule } from '../shared/cf-charts/cf-charts.module';
import { SharedModule } from '../shared/shared.module';
import { AuthRouter } from './auth.router';
import { AuthService } from './auth.service';
import { HeatMapComponent } from './home/heat-map/heat-map.component';
import { UlbCoverageComponent } from './home/home-tab-view/ulb-coverage/ulb-coverage.component';
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
    MatInputModule
  ],
  providers: [AuthService],
  declarations: [StatisticsComponent, HeatMapComponent, UlbCoverageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule {}
