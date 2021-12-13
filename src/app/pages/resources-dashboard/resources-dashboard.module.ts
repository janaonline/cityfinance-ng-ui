import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ResourcesDashboardRoutingModule } from './resources-dashboard-routing.module';
import { ResourcesDashboardComponent } from './resources-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LearningCenterComponent } from './learning-center/learning-center.component';
import { DataSetsComponent } from './data-sets/data-sets.component';
import { ReportsPublicationComponent } from './reports-publication/reports-publication.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
@NgModule({
  declarations: [ResourcesDashboardComponent, LearningCenterComponent, DataSetsComponent, ReportsPublicationComponent, LatestNewsComponent],
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
