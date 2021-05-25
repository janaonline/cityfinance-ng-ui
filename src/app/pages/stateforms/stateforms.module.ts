import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { StateformsRoutingModule } from './stateforms-routing.module';
import { StateformsComponent } from './stateforms.component';
import { GTCertificateComponent } from './gtcertificate/gtcertificate.component';


@NgModule({
  declarations: [StateformsComponent, GTCertificateComponent],
  imports: [
    CommonModule,
    StateformsRoutingModule,
    MatIconModule
  ]
})
export class StateformsModule { }
