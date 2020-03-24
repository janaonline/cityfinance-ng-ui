import {CommonModule} from '@angular/common';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../angular-material.module';
import {CfChartsModule} from '../shared/cf-charts/cf-charts.module';
import {AuthRouter} from './auth.router';
import {AuthService} from './auth.service';
import {HeatMapComponent} from './home/heat-map/heat-map.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {SharedModule} from '../shared/shared.module';
import {UlbCoverageComponent} from './home/home-tab-view/ulb-coverage/ulb-coverage.component';

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
  ],
  providers: [AuthService],
  declarations: [
    StatisticsComponent,
    HeatMapComponent,
    UlbCoverageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule {
}
