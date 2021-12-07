import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ResourcesDashboardRoutingModule } from './resources-dashboard-routing.module';
import { ResourcesDashboardComponent } from './resources-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
@NgModule({
  declarations: [ResourcesDashboardComponent],
  imports: [
    CommonModule,
    ResourcesDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatAutocompleteModule,
  ]
})
export class ResourcesDashboardModule { }
