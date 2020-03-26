import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './users.component';

const routes: Routes = [
  {path: '', component: UsersComponent},
  {path: 'ulbs', loadChildren: './ulbs/ulbs.module#UlbsModule'},
  {path: 'states', loadChildren: './state-list/state-list.module#StateListModule'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
