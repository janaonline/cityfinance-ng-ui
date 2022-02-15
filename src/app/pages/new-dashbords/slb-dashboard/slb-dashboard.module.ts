import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ]
})
export class SlbDashboardModule { }
