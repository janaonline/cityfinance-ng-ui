import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatStepperModule,
  MatTabsModule
} from '@angular/material';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

import { CompletedComponent } from './components/completed/completed.component';
import { DocumentSubmitComponent } from './components/document-submit/document-submit.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { PreviewComponent } from './components/preview/preview.component';
import { PropertyTaxComponent } from './components/property-tax/property-tax.component';
import { UserChargesComponent } from './components/user-charges/user-charges.component';
import { SubmittedFormComponent } from './list/submitted-form/submitted-form.component';
import { QuestionnaireRoutes } from './questionnaires.route';
import { StateQuestionnairesComponent } from './state/state-questionnaires/state-questionnaires.component';
import { ULBQuestionnaireComponent } from './ulb/questionnaire/questionnaire.component';

@NgModule({
  imports: [
    CommonModule,
    QuestionnaireRoutes,
    MatTabsModule,
    MatStepperModule,
    MatExpansionModule,
    SharedModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxPaginationModule,
    MatDialogModule,
    AngularMultiSelectModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
  ],
  declarations: [
    StateQuestionnairesComponent,
    IntroductionComponent,
    PropertyTaxComponent,
    UserChargesComponent,
    CompletedComponent,
    SubmittedFormComponent,
    DocumentSubmitComponent,
    PreviewComponent,
    ULBQuestionnaireComponent,
  ],
  entryComponents: [PreviewComponent],
})
export class QuestionnairesModule {}
