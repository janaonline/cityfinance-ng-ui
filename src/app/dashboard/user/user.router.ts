import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OnboardUserComponent } from './onboard-user/onboard-user.component';
import { ProfileComponent } from './profile/profile.component';

export const userRouter: Routes = [
  { path: "profile", component: ProfileComponent },
  { path: "onboard", component: OnboardUserComponent },
  { path: "", redirectTo: "profile", pathMatch: "full" },
];

export const UserRouter: ModuleWithProviders = RouterModule.forChild(
  userRouter
);
