import {CommonModule} from '@angular/common';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {AngularMaterialModule} from '../angular-material.module';
import {CfChartsModule} from '../shared/cf-charts/cf-charts.module';
import {AuthRouter} from './auth.router';
import {AuthService} from './auth.service';
import {HomeHeaderComponent} from './home-header/home-header.component';
import {HeatMapComponent} from './home/heat-map/heat-map.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {HomeTabViewComponent} from './home/home-tab-view/home-tab-view.component';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {SharedModule} from '../shared/shared.module';
import {UlbCoverageComponent} from './home/home-tab-view/ulb-coverage/ulb-coverage.component';
import {MatTooltipModule} from '@angular/material';

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
export class AuthModule {
}
