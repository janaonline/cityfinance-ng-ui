import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UlbAdminRoutingModule } from './ulb-admin-routing.module';
import { UlbReviewComponent } from './ulb-admin/ulb-review.component';
import { UlbAdminComponent } from './ulb-admin.component';


@NgModule({
  declarations: [
    UlbReviewComponent,
    UlbAdminComponent
  ],
  imports: [
    CommonModule,
    UlbAdminRoutingModule
  ]
})
export class UlbAdminModule { }
