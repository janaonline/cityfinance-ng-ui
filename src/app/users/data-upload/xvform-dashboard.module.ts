import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { AngularMaterialModule } from '../../angular-material.module';
import { SharedModule } from '../../shared/shared.module';
import { AccessChecker } from '../../util/access/accessChecker';
import { FileUpload } from '../../util/fileUpload';
import { UserUtility } from '../../util/user/user';
import { FinancialDataService } from '../services/financial-data.service';
import { BulkEntryComponent } from './bulk-entry/bulk-entry.component';
import { DataUploadRoutingModule } from './xvform-routing.module';
import { GobalPartModule } from 'src/app/gobal-part/gobal-part.module';

// import { DataUploadActionComponent } from './data-upload-action/data-upload-action.component';
@NgModule({
  imports: [
    CommonModule,
    DataUploadRoutingModule,
    AngularMultiSelectModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule,
    GobalPartModule
  ],
  providers: [AccessChecker, FileUpload, UserUtility, FinancialDataService],
  declarations: [BulkEntryComponent],
})
export class XVFormDashboard {}
