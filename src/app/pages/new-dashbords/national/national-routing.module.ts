import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NationalSubComponent } from './national-sub/national-sub.component';
import { NationalComponent } from './national.component';

const routes: Routes = [
   {
     path: "", component: NationalComponent,
     children:[
       {
         path: ":_id", component: NationalSubComponent
      }
     ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NationalRoutingModule { }
