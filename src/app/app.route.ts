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
    path: "credit-rating",
    loadChildren: "./credit-rating/credit-rating.module#CreditRatingModule",
  },

  {
    path: "dashboard",
    loadChildren: "./dashboard/dashboard.module#DashboardModule",
  },

  {
    path: "not-found",
    loadChildren: "./not-found/not-found.module#NotFoundModule",
  },

  { path: "**", redirectTo: "" },
  { path: "**", redirectTo: "" },
];

export const AppRouter: ModuleWithProviders = RouterModule.forRoot(appRouter);
