import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SharedModule } from 'src/app/shared/shared.module';

import { AnalyticsRoutes } from './analytics.route';
import { HomeTabViewComponent } from './home-tab-view/home-tab-view.component';

@NgModule({
  imports: [
    CommonModule,
    AnalyticsRoutes,
    MatTabsModule,
    SharedModule,
    AngularMultiSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
  ],
  declarations: [HomeTabViewComponent],
})
export class AnalyticsModule {}
