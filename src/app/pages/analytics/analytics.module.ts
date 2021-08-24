import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
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
