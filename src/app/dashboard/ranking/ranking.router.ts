import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RankingComponent } from './ranking.component';

export const rankingRouter: Routes = [
  {
    path: "",
    component: RankingComponent,
    children: [
      { path: "", redirectTo: "", pathMatch: "full" },
      { path: "", component: RankingComponent },
    ],
  },
];

export const RankingRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  rankingRouter
);
