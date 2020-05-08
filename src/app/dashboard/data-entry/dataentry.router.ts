import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LedgerListComponent } from './ledger-list/ledger-list.component';
import { LedgerComponent } from './ledger/ledger.component';

export const dataEntryRouter: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "list", component: LedgerListComponent },
  { path: "ledger", component: LedgerComponent }
];

export const DataEntryRouter: ModuleWithProviders = RouterModule.forChild(
  dataEntryRouter
);
