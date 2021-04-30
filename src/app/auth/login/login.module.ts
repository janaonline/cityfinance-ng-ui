import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RecaptchaModule } from 'ng-recaptcha';

import { SharedModule } from '../../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './login.component';
import { MdePopoverModule } from '@material-extended/mde';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    SharedModule,
    MatTooltipModule,
    RecaptchaModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MdePopoverModule
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
