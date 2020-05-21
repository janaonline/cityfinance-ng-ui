import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTabViewComponent } from 'src/app/auth/home/home-tab-view/home-tab-view.component';

export const routes: Routes = [
  {
    path: ":tab",
    component: HomeTabViewComponent,
  },
];

export const AnalyticsRoutes: ModuleWithProviders = RouterModule.forChild(
  routes
);
