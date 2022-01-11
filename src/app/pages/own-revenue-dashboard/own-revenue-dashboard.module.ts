import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { OwnRevenueDashboardRoutingModule } from './own-revenue-dashboard-routing.module';
import { OwnRevenueDashboardComponent } from './own-revenue-dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [OwnRevenueDashboardComponent],
  imports: [
    CommonModule,
    OwnRevenueDashboardRoutingModule,
    SharedModule,
    MatTableModule,
    HttpClientModule
  ]
})
export class OwnRevenueDashboardModule { }
