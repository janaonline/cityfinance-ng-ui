import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FcGrantHomeRoutingModule } from './fc-grant-home-routing.module';
import { FcHomePageComponent } from './fc-home-page/fc-home-page.component';


@NgModule({
  declarations: [FcHomePageComponent],
  imports: [
    CommonModule,
    FcGrantHomeRoutingModule
  ]
})
export class FcGrantHomeModule { }
