import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';
import { ReUseableHeatMapComponent } from './components/re-useable-heat-map/re-useable-heat-map.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PreLoaderComponent, ReUseableHeatMapComponent],
  exports: [PreLoaderComponent, ReUseableHeatMapComponent]
})
export class SharedModule {}
