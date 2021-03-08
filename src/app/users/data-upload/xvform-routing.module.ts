import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule, Routes } from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

import { AngularMaterialModule } from '../../angular-material.module';
import { SharedModule } from '../../shared/shared.module';
import { BulkEntryComponent } from './bulk-entry/bulk-entry.component';
import { DocumentsUploadComponent } from './components/documents-upload/documents-upload.component';
import { FinancialUploadsComponent } from './components/financial-uploads/financial-uploads.component';
import { MillionPlusCitiesComponent } from './components/million-plus-cities/million-plus-cities.component';
import { PreviewComponent } from './components/preview/preview.component';
import { SolidWasteManagementComponent } from './components/solid-waste-management/solid-waste-management.component';
import { WasteWaterManagementComponent } from './components/waste-water-management/waste-water-management.component';
import { DataUploadComponent } from './xvform-dashboard.component';

// import { DataUploadActionComponent } from './data-upload-action/data-upload-action.component';
const routes: Routes = [
  { path: "list", component: DataUploadComponent },
  { path: "bulk-upload", component: BulkEntryComponent },
  // { path: "action", component: DataUploadActionComponent },
  // { path: "action/:id", component: DataUploadActionComponent },
  { path: ":id", component: DataUploadComponent },
  { path: ":id/:uploadId", component: DataUploadComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AngularMaterialModule,
    AngularMultiSelectModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
    MatStepperModule,
  ],
  exports: [RouterModule],
  declarations: [
    DataUploadComponent,
    FinancialUploadsComponent,
    SolidWasteManagementComponent,
    WasteWaterManagementComponent,
    DocumentsUploadComponent,
    MillionPlusCitiesComponent,
    PreviewComponent,
  ],
})
export class DataUploadRoutingModule {}
