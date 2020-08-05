import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { PasswordRoutingModule } from './account-reactivate-routing.module';
import { AccountReactivateComponent } from './account-reactivate.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordRoutingModule,
    SharedModule,
  ],
  declarations: [AccountReactivateComponent],
})
export class AccountReactivateModule {}
