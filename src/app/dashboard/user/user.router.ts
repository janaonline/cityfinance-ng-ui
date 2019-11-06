import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { OnboardUserComponent } from './onboard-user/onboard-user.component';
import { UserListComponent } from './user-list/user-list.component';


export const userRouter: Routes = [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent },
    { path: 'onboard', component: OnboardUserComponent },
    { path: 'list', component: UserListComponent },
    
];

export const UserRouter: ModuleWithProviders = RouterModule.forChild(userRouter);
