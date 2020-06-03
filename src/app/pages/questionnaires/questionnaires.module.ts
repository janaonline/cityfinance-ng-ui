import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule,
  MatStepperModule,
  MatTabsModule
} from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';

import { QuestionnaireRoutes } from './questionnaires.route';
import { CompletedComponent } from './state/completed/completed.component';
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
  ],
  declarations: [
    StateQuestionnairesComponent,
    IntroductionComponent,
    PropertyTaxComponent,
    UserChargesComponent,
    CompletedComponent,
  ],
})
export class QuestionnairesModule {}
