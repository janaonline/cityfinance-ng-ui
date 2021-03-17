import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { UlbLocationVisualizeComponent } from './components/ulb-location-visualize/ulb-location-visualize.component';
import { UlbVisualizationRouteModule } from './ulbs-visualization.routing';

@NgModule({
  declarations: [UlbLocationVisualizeComponent],
  imports: [CommonModule, UlbVisualizationRouteModule, SharedModule],
})
export class UlbsVisualizationModule {}
