import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "src/app/shared/shared.module";
import { NationalRoutingModule } from './national-routing.module';
import { TabAboutFilterComponent } from './tab-about-filter/tab-about-filter.component';
import { NationalComponent } from './national.component';
import { NationalSubComponent } from './national-sub/national-sub.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    NationalComponent,
    TabAboutFilterComponent,
    NationalSubComponent
  ],
  imports: [
    CommonModule,
    NationalRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class NationalModule { }
