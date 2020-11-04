import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FcGrantComponent } from './components/fc-grant/fc-grant.component';
import { FcGrantRoutingModule } from './fc-grant-routing.module';

@NgModule({
  imports: [CommonModule, FcGrantRoutingModule],
  declarations: [FcGrantComponent],
})
export class FcGrantModule {}
