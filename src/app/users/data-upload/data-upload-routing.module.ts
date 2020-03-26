import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DataUploadComponent} from './data-upload.component';

const routes: Routes = [
  {path: ':id', component: DataUploadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [DataUploadComponent]

})
export class DataUploadRoutingModule {
}
