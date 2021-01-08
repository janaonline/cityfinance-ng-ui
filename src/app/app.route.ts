import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './auth/home/home.component';

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

  { path: "**", redirectTo: "" },
  { path: "**", redirectTo: "" },
];

export const AppRouter: ModuleWithProviders<RouterModule> = RouterModule.forRoot(
  appRouter,
  { relativeLinkResolution: "legacy" }
);
