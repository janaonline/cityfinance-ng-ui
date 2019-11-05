import { AgGridModule } from 'ag-grid-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LedgerComponent } from './ledger/ledger.component';
import { DataEntryRouter } from './dataentry.router';
import { ReactiveFormsModule } from '@angular/forms';
import { LedgerListComponent } from './ledger-list/ledger-list.component';
import { BulkEntryComponent } from './bulk-entry/bulk-entry.component';

@NgModule({
  imports: [
    CommonModule,
    DataEntryRouter,
    ReactiveFormsModule,
    AgGridModule.withComponents([])

  ],
  declarations: [LedgerComponent, LedgerListComponent, BulkEntryComponent]
})
export class DataEntryModule { }
