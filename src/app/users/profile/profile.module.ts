import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UserProfileComponent]
})
export class ProfileModule {}
