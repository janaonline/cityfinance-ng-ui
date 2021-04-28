import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FcGrantComponent } from './components/fc-grant/fc-grant.component';


const routes: Routes = [

 { path: "", component: FcGrantComponent },
{
  path: "**",
  pathMatch: "full",
  redirectTo: "",
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FcGrantRoutingModule {}
