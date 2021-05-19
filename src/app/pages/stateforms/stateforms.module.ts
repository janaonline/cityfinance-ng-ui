import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateformsRoutingModule } from './stateforms-routing.module';
import { StateformsComponent } from './stateforms.component';
import { GTCertificateComponent } from './gtcertificate/gtcertificate.component';


@NgModule({
  declarations: [StateformsComponent, GTCertificateComponent],
  imports: [
    CommonModule,
    StateformsRoutingModule
  ]
})
export class StateformsModule { }
