import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FcHomePageComponent } from './fc-home-page/fc-home-page.component';
import { AuthGuard } from '../../security/auth-guard.service';

const routes: Routes = [

  { path: "", component: FcHomePageComponent, canActivate: [AuthGuard] },
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
