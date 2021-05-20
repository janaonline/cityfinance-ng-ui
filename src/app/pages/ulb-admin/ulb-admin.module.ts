import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UlbAdminRoutingModule } from './ulb-admin-routing.module';
import { UlbReviewComponent } from './ulb-admin/ulb-review.component';
import { UlbAdminComponent } from './ulb-admin.component';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    UlbReviewComponent,
    UlbAdminComponent
  ],
  imports: [
    CommonModule,
    UlbAdminRoutingModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class UlbAdminModule { }
