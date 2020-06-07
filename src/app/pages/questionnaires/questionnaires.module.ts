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

import { SubmittedFormComponent } from './list/submitted-form/submitted-form.component';
import { QuestionnaireRoutes } from './questionnaires.route';
import { CompletedComponent } from './state/completed/completed.component';
import { DocumentSubmitComponent } from './state/document-submit/document-submit.component';
import { IntroductionComponent } from './state/introduction/introduction.component';
import { PropertyTaxComponent } from './state/property-tax/property-tax.component';
import { StateQuestionnairesComponent } from './state/state-questionnaires/state-questionnaires.component';
import { UserChargesComponent } from './state/user-charges/user-charges.component';

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
  ],
  declarations: [
    StateQuestionnairesComponent,
    IntroductionComponent,
    PropertyTaxComponent,
    UserChargesComponent,
    CompletedComponent,
    SubmittedFormComponent,
    DocumentSubmitComponent,
  ],
})
export class QuestionnairesModule {}
