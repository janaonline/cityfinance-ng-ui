import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UlbAdminComponent } from './ulb-admin/ulb-admin.component';

const routes: Routes = [
  {
    path: 'ulb-admin', component: UlbAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UlbAdminRoutingModule { }
