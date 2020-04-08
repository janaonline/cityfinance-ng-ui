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
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HeatMapComponent } from './home/heat-map/heat-map.component';
import { HomeTabViewComponent } from './home/home-tab-view/home-tab-view.component';
import { UlbCoverageComponent } from './home/home-tab-view/ulb-coverage/ulb-coverage.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StatisticsComponent } from './statistics/statistics.component';

// import { GridComponent } from './home/grid/grid.component';
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
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterComponent,
    HomeComponent,
    HomeHeaderComponent,
    StatisticsComponent,
    HeatMapComponent,
    HomeTabViewComponent,
    UlbCoverageComponent
  ],
  exports: [HomeHeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule {}
