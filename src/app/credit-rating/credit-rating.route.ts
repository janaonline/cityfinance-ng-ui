import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreditRatingComponent } from './credit-rating.component';
import { MunicipalBondComponent } from './municipal-bond/municipal-bond.component';
import { ReportComponent } from './report/report.component';
import { ScaleComponent } from './scale/scale.component';

export const creditRatingRouter: Routes = [
  // { path: '', redirectTo: 'report', pathMatch: 'full' },
  // { path: 'report', component: ReportComponent },
  // { path: 'scale', component: ScaleComponent },
  // { path: 'municipal-bond', component: MunicipalBondComponent },
  // { path: 'laws', component: MunicipalLawsComponent },

  {
    path: "",
    component: CreditRatingComponent,
    children: [
      { path: "", redirectTo: "report", pathMatch: "full" },
      { path: "credit-rating", component: ReportComponent },
      { path: "scale", component: ScaleComponent },
      { path: "municipal-bond", component: MunicipalBondComponent },
      {
        path: "resources",
        loadChildren: () =>
          import("../pages/resources/public-files.module").then(
            (m) => m.PublicFilesModule
          ),
      },
    ],
  },
];

export const CreditRatingRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  creditRatingRouter
);
