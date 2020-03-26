import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UsersComponent} from './users.component';

const routes: Routes = [
  {path: '', component: UsersComponent},
  {path: 'ulbs', loadChildren: './ulbs/ulbs.module#UlbsModule'},
  {path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},
  {path: 'states', loadChildren: './state-list/state-list.module#StateListModule'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
