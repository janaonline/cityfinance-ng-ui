import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DataUploadRoutingModule} from './data-upload-routing.module';
import { DataUploadActionComponent } from './data-upload-action/data-upload-action.component';


@NgModule({
  imports: [
    CommonModule,
    DataUploadRoutingModule,
  ],
  declarations: [DataUploadActionComponent],

})
export class DataUploadModule {
}
