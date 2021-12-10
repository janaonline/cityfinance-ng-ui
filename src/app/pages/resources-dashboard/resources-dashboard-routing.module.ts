import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataSetsComponent } from './data-sets/data-sets.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { LearningCenterComponent } from './learning-center/learning-center.component';
import { ReportsPublicationComponent } from './reports-publication/reports-publication.component';
import { ResourcesDashboardComponent } from './resources-dashboard.component';

const routes: Routes = [
  {
    path: "", component: ResourcesDashboardComponent,
    children: [
      {
        path: 'learning-center', component: LearningCenterComponent
      },
      {
        path: 'data-sets', component: DataSetsComponent
      },
      {
        path: 'report-publications', component: ReportsPublicationComponent
      },
      {
        path: 'latest-news', component: LatestNewsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesDashboardRoutingModule { }
