import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ReportComponent } from './report/report.component';
import { ScaleComponent } from './scale/scale.component';
import { MunicipalBondComponent } from './municipal-bond/municipal-bond.component';
import { CreditRatingComponent } from './credit-rating.component';
import { MunicipalLawsComponent } from './municipal-laws/municipal-laws.component';


export const creditRatingRouter: Routes = [
    // { path: '', redirectTo: 'report', pathMatch: 'full' },
    // { path: 'report', component: ReportComponent },
    // { path: 'scale', component: ScaleComponent },
    // { path: 'municipal-bond', component: MunicipalBondComponent },
    // { path: 'laws', component: MunicipalLawsComponent },

    { path: '', component: CreditRatingComponent,
      children: [
        { path: '', redirectTo: 'report', pathMatch: 'full' },
        { path: 'report', component: ReportComponent },
        { path: 'scale', component: ScaleComponent },
        { path: 'municipal-bond', component: MunicipalBondComponent },
        { path: 'laws', component: MunicipalLawsComponent },
      ]
    }
];

export const CreditRatingRouter: ModuleWithProviders = RouterModule.forChild(creditRatingRouter);
