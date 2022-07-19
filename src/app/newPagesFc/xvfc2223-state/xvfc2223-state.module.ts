import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Xvfc2223StateRoutingModule } from './xvfc2223-state-routing.module';
import { Xvfc2223StateComponent } from "./xvfc2223-state.component";

@NgModule({
  declarations: [Xvfc2223StateComponent],
  imports: [CommonModule, Xvfc2223StateRoutingModule],
})
export class Xvfc2223StateModule {}
