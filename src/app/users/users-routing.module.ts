import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UsersComponent} from './users.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      {path: 'ulbs', loadChildren: './ulbs/ulbs.module#UlbsModule'},
      {path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},
      {
        path: 'states',
        loadChildren: './state-list/state-list.module#StateListModule'
      },
      {
        path: 'data-upload',
        loadChildren: './data-upload/data-upload.module#DataUploadModule'
      },
      {path: 'list', loadChildren: './list/list.module#ListModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
