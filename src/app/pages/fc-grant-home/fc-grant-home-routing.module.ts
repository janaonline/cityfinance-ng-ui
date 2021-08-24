import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FcHomePageComponent } from './fc-home-page/fc-home-page.component';

const routes: Routes = [

  { path: "", component:  FcHomePageComponent},
 {
   path: "**",
   pathMatch: "full",
   redirectTo: "",
 }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FcGrantHomeRoutingModule { }
