import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LedgerComponent } from './ledger/ledger.component';
import { LedgerListComponent } from './ledger-list/ledger-list.component';
import { BulkEntryComponent } from './bulk-entry/bulk-entry.component';


export const dataEntryRouter: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: LedgerListComponent },
    { path: 'ledger', component: LedgerComponent },
    { path: 'bulk', component: BulkEntryComponent },
    
];

export const DataEntryRouter: ModuleWithProviders = RouterModule.forChild(dataEntryRouter);
