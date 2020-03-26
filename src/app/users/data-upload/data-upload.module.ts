import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataUploadRoutingModule } from './data-upload-routing.module';
import { DataUploadComponent } from './data-upload.component';

@NgModule({
  imports: [
    CommonModule,
    DataUploadRoutingModule
  ],

})
export class DataUploadModule { }
