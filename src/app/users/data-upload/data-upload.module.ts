import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';

import {AngularMaterialModule} from '../../angular-material.module';
import {SharedModule} from '../../shared/shared.module';
import {AccessChecker} from '../../util/access/accessChecker';
import {UserUtility} from '../../util/user/user';
import {BulkEntryComponent} from './bulk-entry/bulk-entry.component';
import {DataUploadActionComponent} from './data-upload-action/data-upload-action.component';
import {DataUploadRoutingModule} from './data-upload-routing.module';
import FileUpload from '../../util/fileUpload';
import {FinancialDataService} from '../services/financial-data.service';

@NgModule({
  imports: [
    CommonModule,
    DataUploadRoutingModule,
    AngularMultiSelectModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule
  ],
  providers: [AccessChecker, UserUtility, FileUpload,FinancialDataService],
  declarations: [DataUploadActionComponent, BulkEntryComponent]
})
export class DataUploadModule {
}
