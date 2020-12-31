import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { RecaptchaModule } from 'ng-recaptcha';

import { SharedModule } from '../../shared/shared.module';
import { PasswordRoutingModule } from './password-routing.module';
import { PasswordComponent } from './password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordRoutingModule,
    SharedModule,
    RecaptchaModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [PasswordComponent],
})
export class PasswordModule {}
