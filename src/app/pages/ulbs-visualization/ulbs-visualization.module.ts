import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { UlbLocationVisualizeComponent } from './components/ulb-location-visualize/ulb-location-visualize.component';
import { UlbVisualizationRouteModule } from './ulbs-visualization.routing';
import { GlobalPartModule } from 'src/app/global-part/global-part.module';

@NgModule({
  declarations: [UlbLocationVisualizeComponent],
  imports: [CommonModule, UlbVisualizationRouteModule, SharedModule, GlobalPartModule],
})
export class UlbsVisualizationModule {}
