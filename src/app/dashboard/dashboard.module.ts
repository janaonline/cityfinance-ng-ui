import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRouter} from './dashboard.router';
import {HeaderComponent} from './header/header.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CommonService} from '../shared/services/common.service';
import {DataTrackerComponent} from './data-tracker/data-tracker.component';
import {AgGridModule} from 'ag-grid-angular';
// import { TestComponent } from './test/test.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthModule} from '../auth/auth.module';
import {SharedModule} from '../shared/shared.module';
import { MatListModule } from '@angular/material/list';
import {AngularMaterialModule} from '../angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRouter,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    AuthModule,
    SharedModule,
    MatListModule,
    AngularMaterialModule
  ],
  providers: [
    CommonService
  ],
  declarations: [HeaderComponent, DashboardComponent, DataTrackerComponent,
    // TestComponent
  ]
})
export class DashboardModule {
}
