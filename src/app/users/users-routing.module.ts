import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AnnualAccountsViewComponent
} from '../pages/annual-accounts/annual-accounts-view/annual-accounts-view.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: "",
    component: UsersComponent,
    children: [
      {
        path: "ulbs",
        loadChildren: () =>
          import("./ulbs/ulbs.module").then((m) => m.UlbsModule),
      },
      {
        path: "profile",
        loadChildren: () =>
          import("./profile/profile.module").then((m) => m.ProfileModule),
      },
      {
        path: "states",
        loadChildren: () =>
          import("./state-list/state-list.module").then(
            (m) => m.StateListModule
          ),
      },
      {
        path: "xvform",
        loadChildren: () =>
          import("./data-upload/xvform-dashboard.module").then(
            (m) => m.XVFormDashboard
          ),
      },
      {
        path: "data-upload",
        loadChildren: () =>
          import("./data-upload/data-upload.module").then(
            (m) => m.DataUploadModule
          ),
      },
      {
        path: "list",
        loadChildren: () =>
          import("./list/list.module").then((m) => m.ListModule),
      },
      {
        path: "reports",
        loadChildren: () =>
          import("./reports/reports.module").then((m) => m.ReportsModule),
      },
      { path: "annual-accounts/view", component: AnnualAccountsViewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
