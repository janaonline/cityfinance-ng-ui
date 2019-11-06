import { AuthGuard } from './security/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


export const appRouter: Routes = [
    // { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'credit-rating', loadChildren: './credit-rating/credit-rating.module#CreditRatingModule' },
    { path: 'dashboard', loadChildren:  './dashboard/dashboard.module#DashboardModule' },
    
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule'},
    { path: '**', redirectTo: '' }
    
    
];

export const AppRouter: ModuleWithProviders = RouterModule.forRoot(appRouter);
