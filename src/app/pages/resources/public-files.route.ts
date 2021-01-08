import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FileComponent } from './file/file.component';

export const routes: Routes = [
  {
    path: "",
    component: FileComponent,
  },
];

export const FileRoutes: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  routes
);
