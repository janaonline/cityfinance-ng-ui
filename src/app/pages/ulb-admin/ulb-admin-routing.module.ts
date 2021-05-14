import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UlbAdminComponent } from './ulb-admin.component';
import { UlbReviewComponent } from './ulb-admin/ulb-review.component';

const routes: Routes = [
  {
    path: "", component: UlbAdminComponent,
    children:[
      {
        path: 'ulb-review', component: UlbReviewComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UlbAdminRoutingModule { }
