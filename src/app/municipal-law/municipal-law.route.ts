import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MunicipalLawsComponent } from './municipal-laws/municipal-laws.component';

export const municipalLawRouter: Routes = [
  {
    path: "",
    component: MunicipalLawsComponent,
  },
];

export const MunicipalLawRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  municipalLawRouter
);
