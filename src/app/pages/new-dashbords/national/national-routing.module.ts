import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataAvailableComponent } from './data-available/data-available.component';
import { NationalResourcesComponent } from './national-resources/national-resources.component';
import { NationalSubComponent } from './national-sub/national-sub.component';
import { NationalComponent } from './national.component';

const routes: Routes = [
   {
     path: "", component: NationalComponent,
     children:[

       {
        path: "61e150439ed0e8575c881028", component: DataAvailableComponent
       },
       {
        path: "61e1507a9ed0e8575c88102c", component: NationalResourcesComponent
       },
       {
        path: ":_id", component: NationalSubComponent
       },
     ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NationalRoutingModule { }
