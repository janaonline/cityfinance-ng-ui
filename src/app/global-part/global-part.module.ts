import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToStorageUrlPipe } from './common-pipes/to-storage-url.pipe';
import { MinMaxRestrictionDirective } from './common-directive/min-max-restriction.directive';



@NgModule({
  declarations: [
   ToStorageUrlPipe,
   MinMaxRestrictionDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ToStorageUrlPipe,
    MinMaxRestrictionDirective
  ]
})
export class GlobalPartModule { }
