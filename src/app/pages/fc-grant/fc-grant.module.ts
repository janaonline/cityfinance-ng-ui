import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { FcGrantComponent } from './components/fc-grant/fc-grant.component';
import { FcGrantRoutingModule } from './fc-grant-routing.module';
//import {FcHomePageComponent } from '../fc-grant-home/fc-home-page/fc-home-page.component';

@NgModule({
  imports: [CommonModule, FcGrantRoutingModule, SharedModule],
  declarations: [FcGrantComponent],
})
export class FcGrantModule {}
