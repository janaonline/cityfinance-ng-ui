import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {AuthModule} from '../auth/auth.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    AuthModule,
    SharedModule
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
