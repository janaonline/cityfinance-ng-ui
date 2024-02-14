import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserListComponent } from './user-list/user-list.component';
import { GlobalPartModule } from 'src/app/global-part/global-part.module';

const routes: Routes = [{ path: ":userType", component: UserListComponent }];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    GlobalPartModule
  ],
  declarations: [UserListComponent],
})
export class ListModule {}
