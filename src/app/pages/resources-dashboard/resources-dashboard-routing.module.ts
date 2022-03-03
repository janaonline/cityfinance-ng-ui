import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceSheetComponent } from './data-sets/balance-sheet/balance-sheet.component';
import { DataSetsComponent } from './data-sets/data-sets.component';

import { BestPracticesComponent } from './learning-center/best-practices/best-practices.component';
import { DynamicSubLearningComponent } from './learning-center/dynamic-sub-learning/dynamic-sub-learning.component';
import { ELearningModuleComponent } from './learning-center/e-learning-module/e-learning-module.component';
import { FaqTableComponent } from './learning-center/faq-table/faq-table.component';
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
         },
         {
          path:'faqs', component: FaqTableComponent
        },
         {
          path: 'bestPractices', component: BestPracticesComponent
        },
        {
          path:'eLearning', component: ELearningModuleComponent
        }
        ]
      },

      {
        path: 'data-sets', component: DataSetsComponent,
        children:[
          {
            path: 'balanceSheet', component: BalanceSheetComponent,
          },
          {
            path: 'income_statement', component: BalanceSheetComponent,
          },
          {
            path: 'property_tax', component: BalanceSheetComponent,
          },
          {
            path: 'municipal_borrowing', component: BalanceSheetComponent,
          }
        ]
      },
      {
        path: 'report-publications', component: ReportsPublicationComponent
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
