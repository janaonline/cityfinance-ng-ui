import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DataUploadRoutingModule} from './data-upload-routing.module';
import {DataUploadActionComponent} from './data-upload-action/data-upload-action.component';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {ReactiveFormsModule} from '@angular/forms';
import {AccessChecker} from '../../util/access/accessChecker';
import {AngularMaterialModule} from '../../angular-material.module';
import {UserUtility} from '../../util/user/user';


@NgModule({
  imports: [
    CommonModule,
    DataUploadRoutingModule,
    AngularMultiSelectModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  providers: [AccessChecker, UserUtility],
  declarations: [DataUploadActionComponent],

})
export class DataUploadModule {
}
