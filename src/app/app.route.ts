import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './auth/home/home.component';
import { EntryLevelComponent } from './pages/entry-level/entry-level.component';
import { EntryListComponent } from './pages/entry-level/entry-list/entry-list.component';
import { EntryList1Component } from './pages/entry-level/entry-list1/entry-list1.component';
import { EntryList2Component } from './pages/entry-level/entry-list2/entry-list2.component';
import { EntryList3Component } from './pages/entry-level/entry-list3/entry-list3.component';
import { EntryList4Component } from './pages/entry-level/entry-list4/entry-list4.component';
import { EntryList5Component } from './pages/entry-level/entry-list5/entry-list5.component';
import {UlbNotRegisteredComponent} from "./auth/ulb-not-registered/ulb-not-registered.component"

export const appRouter: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },

  { path: "home", component: HomeComponent },
  {
    path: "analytics",
    loadChildren: () =>
      import("./pages/analytics/analytics.module").then(
        (m) => m.AnalyticsModule
      ),
  },
  // {
  //   path: "resources",
  //   loadChildren: "./pages/resources/public-files.module#PublicFilesModule"
  // },
  {
    path: "fc_grant",
    loadChildren: () =>
      import("./pages/fc-grant/fc-grant.module").then((m) => m.FcGrantModule),
  },
  {
    path: "entry-level",
    component: EntryLevelComponent,
    children:[
      {
        path:"entry-list" , component: EntryListComponent
      },
      {
        path:"entry-list1" , component: EntryList1Component
      },
      {
        path:"entry-list2" , component: EntryList2Component
      },
      {
        path:"entry-list3" , component: EntryList3Component
      },
      {
        path:"entry-list4" , component: EntryList4Component
      },
      {
        path:"entry-list5" , component: EntryList5Component
      }

    ]
  },
  {
    path: "ulbform",
    loadChildren: () =>
      import("./pages/ulbform/ulbform.module").then(
        (m) => m.UlbformModule
      ),
  },
  {
    path: "questionnaires",
    loadChildren: () =>
      import("./pages/questionnaires/questionnaires.module").then(
        (m) => m.QuestionnairesModule
      ),
  },

  {
    path: "user",
    loadChildren: () =>
      import("./users/users.module").then((m) => m.UsersModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./auth/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./auth/register/register.module").then((m) => m.RegisterModule),
  },
  {
    path: "password",
    loadChildren: () =>
      import("./auth/password/password.module").then((m) => m.PasswordModule),
  },
  {
    path: "account-reactivate",
    loadChildren: () =>
      import("./auth/account-reactivate/account-reactivate.module").then(
        (m) => m.AccountReactivateModule
      ),
  },
  {
    path: "borrowings",
    loadChildren: () =>
      import("./credit-rating/credit-rating.module").then(
        (m) => m.CreditRatingModule
      ),
  },

  {
    path: "municipal-law",
    loadChildren: () =>
      import("./municipal-law/municipal-law.module").then(
        (m) => m.MunicipalLawModule
      ),
  },

  {
    path: "financial-statement",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "data-tracker",
    loadChildren: () =>
      import("./pages/data-tracker/data-tracker.module").then(
        (m) => m.DataTrackerModule
      ),
  },
  {
    path: "upload-annual-accounts",
    loadChildren: () =>
      import("./pages/annual-accounts/annual-accounts.module").then(
        (m) => m.AnnualAccountsModule
      ),
  },

  {
    path: "not-found",
    loadChildren: () =>
      import("./not-found/not-found.module").then((m) => m.NotFoundModule),
  },
  {
    path: "ulb-location-visualize",
    loadChildren: () =>
      import("./pages/ulbs-visualization/ulbs-visualization.module").then(
        (m) => m.UlbsVisualizationModule
      ),
  },{
    path: "ulb-not-registered",
    component:UlbNotRegisteredComponent
  },

  { path: "**", redirectTo: "" },
];

export const AppRouter: ModuleWithProviders<RouterModule> = RouterModule.forRoot(
  appRouter,
  { relativeLinkResolution: "legacy" }
);
