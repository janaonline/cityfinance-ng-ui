import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Xvfc2223StateRoutingModule } from './xvfc2223-state-routing.module';
import { Xvfc2223StateComponent } from "./xvfc2223-state.component";
import { PtoComponent } from './pto/pto.component';
import { ReviewApplicationComponent } from './review-application/review-application.component';
import {TableComponent} from '../../shared2223/components/table/table.component'
@NgModule({
  declarations: [Xvfc2223StateComponent, PtoComponent, ReviewApplicationComponent],
  imports: [CommonModule, Xvfc2223StateRoutingModule, TableComponent],
})
export class Xvfc2223StateModule {}
