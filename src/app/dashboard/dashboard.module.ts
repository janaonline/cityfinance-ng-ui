import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { AgGridModule } from 'ag-grid-angular';

import { AngularMaterialModule } from '../angular-material.module';
import { AuthModule } from '../auth/auth.module';
import { CommonService } from '../shared/services/common.service';
import { SharedModule } from '../shared/shared.module';
import { DashboardRouter } from './dashboard.router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

// import { TestComponent } from './test/test.component';
@NgModule({
  imports: [
    CommonModule,
    DashboardRouter,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    AuthModule,
    SharedModule,
    MatListModule,
    AngularMaterialModule,
  ],
  providers: [CommonService],
  declarations: [HeaderComponent, DashboardComponent],
})
export class DashboardModule {}
