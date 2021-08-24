import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { DataTrackerRoutingModule } from './data-tracker-routing.module';
import { DataTrackerComponent } from './data-tracker/data-tracker.component';

@NgModule({
  declarations: [DataTrackerComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    DataTrackerRoutingModule,
    SharedModule,
    AngularMaterialModule,
  ],
})
export class DataTrackerModule {}
