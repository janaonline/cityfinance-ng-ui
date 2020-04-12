import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { AngularMaterialModule } from '../../angular-material.module';
import { SharedModule } from '../../shared/shared.module';
import { BulkEntryComponent } from './bulk-entry/bulk-entry.component';
import { DataUploadActionComponent } from './data-upload-action/data-upload-action.component';
import { DataUploadComponent } from './data-upload.component';

const routes: Routes = [
  { path: "bulk-upload", component: BulkEntryComponent },
  { path: "action", component: DataUploadActionComponent },
  { path: "action/:id", component: DataUploadActionComponent },
  { path: ":id", component: DataUploadComponent },
  { path: ":id/:uploadId", component: DataUploadComponent },
  { path: "", component: DataUploadComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AngularMaterialModule,
    AngularMultiSelectModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [RouterModule],
  declarations: [DataUploadComponent]
})
export class DataUploadRoutingModule {}
