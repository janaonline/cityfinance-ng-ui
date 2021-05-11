import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UlbAdminRoutingModule } from './ulb-admin-routing.module';
import { UlbAdminComponent } from './ulb-admin/ulb-admin.component';


@NgModule({
  declarations: [UlbAdminComponent],
  imports: [
    CommonModule,
    UlbAdminRoutingModule
  ]
})
export class UlbAdminModule { }
