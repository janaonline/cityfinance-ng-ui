import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthModule } from "./auth/auth.module";

import { HomeComponent } from "./auth/home/home.component";
import { NewHomeComponent } from "./auth/new-home/new-home.component";

import { UlbNotRegisteredComponent } from "./auth/ulb-not-registered/ulb-not-registered.component";
import { AboutIndicatorComponent } from "./shared/components/about-indicator/about-indicator.component";
import { CompareDialogComponent } from "./shared/components/compare-dialog/compare-dialog.component";
import { DashboardTabsComponent } from "./shared/components/dashboard-tabs/dashboard-tabs.component";
import { FilterDataComponent } from "./shared/components/filter-data/filter-data.component";
import { FrontPanelComponent } from "./shared/components/front-panel/front-panel.component";
import { MapWithFilterComponent } from "./shared/components/map-with-filter/map-with-filter.component";
import { RevenuechartComponent } from "./shared/components/revenuechart/revenuechart.component";
import { SharedCardComponent } from "./shared/components/shared-card/shared-card.component";
import { WaterRejenuvationComponent } from "./shared/components/water-rejenuvation/water-rejenuvation.component";

export const appRouter: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },

  { path: "oldhome", component: HomeComponent },
  { path: "card", component: SharedCardComponent },
  { path: "front", component: FrontPanelComponent },
  { path: "tab", component: DashboardTabsComponent },
  { path: "about", component: AboutIndicatorComponent },
  { path: "filter", component: FilterDataComponent },

  { path: "revenuchart", component: RevenuechartComponent },
  { path: "compareDialog", component: CompareDialogComponent },

  { path: "home", component: NewHomeComponent },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./pages/new-dashbords/new-dashbords.module").then(
        (m) => m.NewDashbordsModule
      ),
  },
  {
    path: "analytics",
    loadChildren: () =>
      import("./pages/analytics/analytics.module").then(
        (m) => m.AnalyticsModule
      ),
  },

  {
    path: "fc_grant",
    loadChildren: () =>
      import("./pages/fc-grant/fc-grant.module").then((m) => m.FcGrantModule),
  },
  {
    path: "fc-home-page",
    loadChildren: () =>
      import("./pages/fc-grant-home/fc-grant-home.module").then(
        (m) => m.FcGrantHomeModule
      ),
  },
  {
    path: "ulbform",
    loadChildren: () =>
      import("./pages/ulbform/ulbform.module").then((m) => m.UlbformModule),
  },
  {
    path: "stateform",
    loadChildren: () =>
      import("./pages/stateforms/stateforms.module").then(
        (m) => m.StateformsModule
      ),
  },
  {
    path: "mohua",
    loadChildren: () =>
      import("./pages/mohuaform/mohuaform.module").then(
        (m) => m.MohuaformModule
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
  },
  {
    path: "ulb-not-registered",
    component: UlbNotRegisteredComponent,
  },
  {
    path: "app-water-rejenuvation",
    component: WaterRejenuvationComponent,
  },
  {
    path: "own-revenue-dashboard",
    loadChildren: () =>
      import("./pages/own-revenue-dashboard/own-revenue-dashboard.module").then(
        (m) => m.OwnRevenueDashboardModule
      ),
  },
  {
    path: "resources-dashboard",
    loadChildren: () =>
      import("./pages/resources-dashboard/resources-dashboard.module").then(
        (m) => m.ResourcesDashboardModule
      ),
  },

  { path: "**", redirectTo: "" },
];

export const AppRouter: ModuleWithProviders<RouterModule> =
  RouterModule.forRoot(appRouter, { relativeLinkResolution: "legacy" });
