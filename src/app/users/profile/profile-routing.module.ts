import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';

// import {UsersComponent} from './users.component';

const routes: Routes = [
  { path: "", component: UserProfileComponent }
  // {path: '', component: UsersComponent},
  // {path: 'ulbs', loadChildren: './ulbs/ulbs.module#UlbsModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
