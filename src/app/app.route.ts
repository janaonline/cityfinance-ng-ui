import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './auth/home/home.component';

export const appRouter: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },

  { path: "home", component: HomeComponent },
  {
    path: "analytics",
    loadChildren: "./pages/analytics/analytics.module#AnalyticsModule",
  },
  // {
  //   path: "resources",
  //   loadChildren: "./pages/resources/public-files.module#PublicFilesModule"
  // },
  {
    path: "questionnaires",
    loadChildren:
      "./pages/questionnaires/questionnaires.module#QuestionnairesModule",
  },

  {
    path: "user",
    loadChildren: "./users/users.module#UsersModule",
  },
  {
    path: "login",
    loadChildren: "./auth/login/login.module#LoginModule",
  },
  {
    path: "register",
    loadChildren: "./auth/register/register.module#RegisterModule",
  },
  {
    path: "password",
    loadChildren: "./auth/password/password.module#PasswordModule",
  },
  {
    path: "account-reactivate",
    loadChildren:
      "./auth/account-reactivate/account-reactivate.module#AccountReactivateModule",
  },
  {
    path: "borrowings",
    loadChildren: "./credit-rating/credit-rating.module#CreditRatingModule",
  },

  {
    path: "municipal-law",
    loadChildren: "./municipal-law/municipal-law.module#MunicipalLawModule",
  },

  {
    path: "financial-statement",
    loadChildren: "./dashboard/dashboard.module#DashboardModule",
  },
  {
    path: "upload-annual-accounts",
    loadChildren:
      "./pages/annual-accounts/annual-accounts.module#AnnualAccountsModule",
  },

  {
    path: "not-found",
    loadChildren: "./not-found/not-found.module#NotFoundModule",
  },

  { path: "**", redirectTo: "" },
  { path: "**", redirectTo: "" },
];

export const AppRouter: ModuleWithProviders = RouterModule.forRoot(appRouter);
