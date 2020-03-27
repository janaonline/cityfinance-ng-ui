import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DataUploadComponent} from './data-upload.component';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from '../../angular-material.module';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';

const routes: Routes = [
  {path: ':id', component: DataUploadComponent},
  {path: '', component: DataUploadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, AngularMaterialModule, AngularMultiSelectModule],
  exports: [RouterModule],
  declarations: [DataUploadComponent],

})
export class DataUploadRoutingModule {
}
