import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToStorageUrlPipe } from './common-pipes/to-storage-url.pipe';



@NgModule({
  declarations: [
   ToStorageUrlPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ToStorageUrlPipe
  ]
})
export class GobalPartModule { }
