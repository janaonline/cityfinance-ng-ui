import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../security/auth-guard.service';
import { DataTrackerComponent } from './data-tracker/data-tracker.component';

// import { TestComponent } from './test/test.component';

export const dashboardRouter: Routes = [
  {
    path: "",
    children: [
      { path: "", redirectTo: "user", pathMatch: "full" },
      {
        path: "user",
        loadChildren: () =>
          import("./user/user.module").then((m) => m.UserModule),
        canActivate: [AuthGuard],
      },
      {
        path: "entry",
        loadChildren: () =>
          import("./data-entry/data-entry.module").then(
            (m) => m.DataEntryModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "report",
        loadChildren: () =>
          import("./report/report.module").then((m) => m.ReportModule),
          data: {reuse:  true}
      },
      {
        path: "ranking",
        loadChildren: () =>
          import("./ranking/ranking.module").then((m) => m.RankingModule),
      },
      {
        path: "financial-information",
        loadChildren: () =>
          import("./financial-information/financial-information.module").then(
            (m) => m.FinancialInformationModule
          ),
      },
      { path: "data-tracker", component: DataTrackerComponent },
      // { path: 'test', component: TestComponent}
    ],
  },
];

export const DashboardRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  dashboardRouter
);
