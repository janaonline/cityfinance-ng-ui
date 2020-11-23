import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register.component';

const routes: Routes = [
  { path: ":type", component: RegisterComponent },
  { path: "**", redirectTo: "  " },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
