import { AgGridModule } from 'ag-grid-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRouter } from './user.router';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { OnboardUserComponent } from './onboard-user/onboard-user.component';

@NgModule({
  imports: [
    CommonModule,
    UserRouter,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])


  ],
  declarations: [ProfileComponent, UserListComponent, OnboardUserComponent]
})
export class UserModule { }
