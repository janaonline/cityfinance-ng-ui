import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material';
import { RecaptchaModule } from 'ng-recaptcha';

import { SharedModule } from '../../shared/shared.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
    SharedModule,
    RecaptchaModule,
    MatProgressSpinnerModule,
  ],
  declarations: [RegisterComponent],
})
export class RegisterModule {}
