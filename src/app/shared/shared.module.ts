import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
} from '@angular/material';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';

import {PreLoaderComponent} from './components/pre-loader/pre-loader.component';
import {ReUseableHeatMapComponent} from './components/re-useable-heat-map/re-useable-heat-map.component';
import {RupeeConverterPipe} from './pipes/rupee-converter.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    AngularMultiSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  declarations: [PreLoaderComponent, ReUseableHeatMapComponent, RupeeConverterPipe],
  exports: [PreLoaderComponent, ReUseableHeatMapComponent, RupeeConverterPipe]
})
export class SharedModule {
}
