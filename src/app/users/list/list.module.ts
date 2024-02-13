import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserListComponent } from './user-list/user-list.component';
import { GobalPartModule } from 'src/app/gobal-part/gobal-part.module';

const routes: Routes = [{ path: ":userType", component: UserListComponent }];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    GobalPartModule
  ],
  declarations: [UserListComponent],
})
export class ListModule {}
