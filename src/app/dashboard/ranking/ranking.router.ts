import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RankingComponent } from './ranking.component';


export const rankingRouter: Routes = [

    {
        path: '', component: RankingComponent,
        children: [
            { path: '', redirectTo: '', pathMatch: 'full' },
            { path: '', component: RankingComponent },
        ]
    }

];

export const RankingRouter: ModuleWithProviders = RouterModule.forChild(rankingRouter);
