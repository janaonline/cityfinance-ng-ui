import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

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
    SubmittedFormComponent,
    DocumentSubmitComponent,
    PreviewComponent,
    ULBQuestionnaireComponent,
  ],
  entryComponents: [PreviewComponent],
})
export class QuestionnairesModule {}
