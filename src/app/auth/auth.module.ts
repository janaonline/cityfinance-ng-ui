import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRouter } from './auth.router';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CfChartsModule } from '../shared/cf-charts/cf-charts.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRouter,
    ReactiveFormsModule,
    CfChartsModule
  ],
  providers: [
    AuthService
  ],
  declarations: [LoginComponent, RegisterComponent, RegisterComponent, 
    HomeComponent, HomeHeaderComponent, StatisticsComponent],
  exports: [
    HomeHeaderComponent
  ]

})
export class AuthModule { }
