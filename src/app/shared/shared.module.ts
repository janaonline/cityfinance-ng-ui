import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';
import { ReUseableHeatMapComponent } from './components/re-useable-heat-map/re-useable-heat-map.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    AngularMultiSelectModule,
    MatSnackBarModule
  ],
  declarations: [PreLoaderComponent, ReUseableHeatMapComponent],
  exports: [PreLoaderComponent, ReUseableHeatMapComponent]
})
export class SharedModule {}
