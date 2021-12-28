import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataSetsComponent } from './data-sets/data-sets.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { DynamicSubLearningComponent } from './learning-center/dynamic-sub-learning/dynamic-sub-learning.component';
import { LearningCenterComponent } from './learning-center/learning-center.component';
import { ScorePerComponent } from './learning-center/score-per/score-per.component';
import { ToolkitsComponent } from './learning-center/toolkits/toolkits.component';
import { ReportsPublicationComponent } from './reports-publication/reports-publication.component';
import { ResourcesDashboardComponent } from './resources-dashboard.component';
import { ResourcesTabsComponent } from './resources-tabs/resources-tabs.component';

const routes: Routes = [
  {
    path: "", component: ResourcesDashboardComponent,
    children: [
      {
        path: 'learning-center', component: LearningCenterComponent,
        children:[
          {
           path: 'toolkits', component: ToolkitsComponent,
           children: [
            {
              path: 'introduction', component: DynamicSubLearningComponent,
             },
             {
              path: 'score-performance', component: ScorePerComponent,
             },
             {
              path: 'enumeration', component: DynamicSubLearningComponent,
             },
             {
              path: 'valuation', component: DynamicSubLearningComponent,
             },
             {
              path: 'billingCollection', component: DynamicSubLearningComponent,
             },
             {
              path: 'assessment', component: DynamicSubLearningComponent,
             },
             {
              path: 'reporting', component: DynamicSubLearningComponent,
             },

           ]
         }

        ]
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
      {
        path: 'res-tabs', component: ResourcesTabsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesDashboardRoutingModule { }
