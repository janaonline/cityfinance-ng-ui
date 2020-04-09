import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { OnboardUserComponent } from './onboard-user/onboard-user.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRouter } from './user.router';

@NgModule({
  imports: [
    CommonModule,
    UserRouter,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  declarations: [ProfileComponent, OnboardUserComponent]
})
export class UserModule {}
