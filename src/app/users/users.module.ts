import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {AuthModule} from '../auth/auth.module';
import {SharedModule} from '../shared/shared.module';
import {AngularMaterialModule} from '../angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    AuthModule,
    SharedModule,
    AngularMaterialModule
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
