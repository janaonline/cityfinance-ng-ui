import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';

// import {UsersComponent} from './users.component';

const routes: Routes = [
  { path: "", component: ProfileComponent }
  // {path: '', component: UsersComponent},
  // {path: 'ulbs', loadChildren: './ulbs/ulbs.module#UlbsModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
