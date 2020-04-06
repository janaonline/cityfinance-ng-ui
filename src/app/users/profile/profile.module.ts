import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../app/shared/shared.module';
import { CommonProfileComponent } from './common-profile/common-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { UlbProfileComponent } from './ulb-profile/ulb-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { StateProfileComponent } from './state-profile/state-profile.component';
import { MohuaProfileComponent } from './mohua-profile/mohua-profile.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    UserProfileComponent,
    ProfileComponent,
    UlbProfileComponent,
    CommonProfileComponent,
    StateProfileComponent,
    MohuaProfileComponent
  ]
})
export class ProfileModule {}
