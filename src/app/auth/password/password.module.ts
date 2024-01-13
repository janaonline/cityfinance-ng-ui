import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RecaptchaModule } from 'ng-recaptcha';

import { SharedModule } from '../../shared/shared.module';
import { PasswordRoutingModule } from './password-routing.module';
import { PasswordComponent } from './password.component';
import { GobalPartModule } from 'src/app/gobal-part/gobal-part.module';

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
    GobalPartModule
  ],
  declarations: [PasswordComponent],
})
export class PasswordModule {}
