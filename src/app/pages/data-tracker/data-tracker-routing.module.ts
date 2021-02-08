import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataTrackerComponent } from './data-tracker/data-tracker.component';

const routes: Routes = [
  { path: "", component: DataTrackerComponent },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataTrackerRoutingModule {}
