import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material.module';
import { CfChartsModule } from '../shared/cf-charts/cf-charts.module';
import { AuthRouter } from './auth.router';
import { AuthService } from './auth.service';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HeatMapComponent } from './home/heat-map/heat-map.component';
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
    CfChartsModule,
    AngularMaterialModule,
    CommonModule
  ],
  providers: [AuthService],
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterComponent,
    HomeComponent,
    HomeHeaderComponent,
    StatisticsComponent,
    HeatMapComponent
  ],
  exports: [HomeHeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule {}
