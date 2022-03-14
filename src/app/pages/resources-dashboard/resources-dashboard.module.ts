import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ResourcesDashboardRoutingModule } from './resources-dashboard-routing.module';
import { ResourcesDashboardComponent } from './resources-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LearningCenterComponent } from './learning-center/learning-center.component';
import { DataSetsComponent } from './data-sets/data-sets.component';
import { ReportsPublicationComponent } from './reports-publication/reports-publication.component';

import { ScorePerComponent } from './learning-center/score-per/score-per.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { ResourcesTabsComponent } from './resources-tabs/resources-tabs.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToolkitsComponent } from './learning-center/toolkits/toolkits.component';
import { DynamicSubLearningComponent } from './learning-center/dynamic-sub-learning/dynamic-sub-learning.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FilterComponentComponent } from './filter-component/filter-component.component';
import { BestPracticesComponent } from './learning-center/best-practices/best-practices.component';
import { BalanceSheetComponent } from './data-sets/balance-sheet/balance-sheet.component';
import {MatTableModule} from '@angular/material/table';
import { FilterModelBoxComponent } from './filter-model-box/filter-model-box.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import {MatDialogModule} from '@angular/material/dialog';
import { CheckScorePerformanceComponent } from './check-score-performance/check-score-performance.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {FaqTableComponent} from './learning-center/faq-table/faq-table.component'
import { ELearningModuleComponent } from './learning-center/e-learning-module/e-learning-module.component';
import { MunicipalLawsComponent } from './learning-center/municipal-laws/municipal-laws.component';
@NgModule({
  declarations: [
    ResourcesDashboardComponent,
    LearningCenterComponent,
    DataSetsComponent,
    ReportsPublicationComponent,
     ScorePerComponent,
     ResourcesTabsComponent,
     ToolkitsComponent,
     DynamicSubLearningComponent,
     FilterComponentComponent,
     BestPracticesComponent,
     BalanceSheetComponent,
     FilterModelBoxComponent,
     CheckScorePerformanceComponent,
     FaqTableComponent,
     ELearningModuleComponent,
     MunicipalLawsComponent,
    ],
  imports: [
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ResourcesDashboardRoutingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    MatTableModule,
    ModalModule.forRoot(),
    MatDialogModule,
    SlickCarouselModule
  ],
  exports: [
    FilterComponentComponent,
    FilterModelBoxComponent
  ],
  providers: [
    MunicipalLawsComponent
  ],
  bootstrap: [ScorePerComponent],
})
export class ResourcesDashboardModule { }
