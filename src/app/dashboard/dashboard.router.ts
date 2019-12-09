import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../security/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataTrackerComponent } from './data-tracker/data-tracker.component';
// import { TestComponent } from './test/test.component';

export const dashboardRouter: Routes = [
    {
        path: '', component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'user', pathMatch: 'full' },
            { path: 'user', loadChildren: './user/user.module#UserModule', canActivate: [AuthGuard] },
            { path: 'entry', loadChildren: './data-entry/data-entry.module#DataEntryModule', canActivate: [AuthGuard] },
            { path: 'report', loadChildren: './report/report.module#ReportModule'},
            { path: 'ranking', loadChildren: './ranking/ranking.module#RankingModule'},
            { path: 'data-tracker', component: DataTrackerComponent},
            // { path: 'test', component: TestComponent}
        ]
    }
];

export const DashboardRouter: ModuleWithProviders = RouterModule.forChild(dashboardRouter);
