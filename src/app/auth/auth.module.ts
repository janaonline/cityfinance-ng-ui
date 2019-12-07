import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CfChartsModule } from '../shared/cf-charts/cf-charts.module';
import { PreLoaderComponent } from '../shared/components/pre-loader/pre-loader.component';
import { AuthRouter } from './auth.router';
import { AuthService } from './auth.service';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { GridComponent } from './home/grid/grid.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  imports: [CommonModule, AuthRouter, ReactiveFormsModule, CfChartsModule],
  providers: [AuthService],
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterComponent,
    HomeComponent,
    HomeHeaderComponent,
    StatisticsComponent,
    GridComponent,
    PreLoaderComponent
  ],
  exports: [HomeHeaderComponent]
})
export class AuthModule {}
