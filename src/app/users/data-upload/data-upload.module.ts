import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DataUploadRoutingModule} from './data-upload-routing.module';
import { DataUploadActionComponent } from './data-upload-action/data-upload-action.component';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {ReactiveFormsModule} from '@angular/forms';
import {AccessChecker} from '../../util/access/accessChecker';


@NgModule({
    imports: [
        CommonModule,
        DataUploadRoutingModule,
        AngularMultiSelectModule,
        ReactiveFormsModule,
    ],
  providers:[AccessChecker],
  declarations: [DataUploadActionComponent],

})
export class DataUploadModule {
}
