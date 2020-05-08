import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { DataEntryRouter } from './dataentry.router';
import { LedgerListComponent } from './ledger-list/ledger-list.component';
import { LedgerComponent } from './ledger/ledger.component';

@NgModule({
  imports: [
    CommonModule,
    DataEntryRouter,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  declarations: [LedgerComponent, LedgerListComponent]
})
export class DataEntryModule {}
