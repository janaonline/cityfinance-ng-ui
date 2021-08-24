import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UlbLocationVisualizeComponent } from './components/ulb-location-visualize/ulb-location-visualize.component';

const routes: Routes = [
  {
    path: "",
    component: UlbLocationVisualizeComponent,
  },
];

export const UlbVisualizationRouteModule: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  routes
);
