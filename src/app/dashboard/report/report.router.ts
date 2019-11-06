import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { IncomeExpenditureComponent } from './income-expenditure/income-expenditure.component';
// import { IncomeExpenditureSummaryComponent } from './income-expenditure-summary/income-expenditure-summary.component';
// import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
// import { CommonSizeComponent } from './common-size/common-size.component';
// import { ComparativeComponent } from './comparative/comparative.component';
// import { CommonSizeUlbComponent } from './common-size-ulb/common-size-ulb.component';
import { ReportComponent } from './report/report.component';
import { BasicComponent } from './basic/basic.component';
import { ComparativeUlbComponent } from './comparative-ulb/comparative-ulb.component';


export const reportRouter: Routes = [

    {
        path: '', component: ReportComponent,
        children: [
            { path: '', redirectTo: 'basic', pathMatch: 'full' },
            // { path: 'income-expenditure', component: IncomeExpenditureComponent },
            // { path: 'income-expenditure-Summary', component: IncomeExpenditureSummaryComponent },
            // { path: 'balance-sheet', component: BalanceSheetComponent },
            // { path: 'common-size', component: CommonSizeComponent },
            // { path: 'common', component: CommonComponent },
            // { path: 'common-size-ulb', component: CommonSizeUlbComponent },
            { path: 'basic', component: BasicComponent },
            // { path: 'comparative', component: ComparativeComponent },
            { path: 'comparative-ulb', component: ComparativeUlbComponent }
        ]
    }

];

export const ReportRouter: ModuleWithProviders = RouterModule.forChild(reportRouter);
