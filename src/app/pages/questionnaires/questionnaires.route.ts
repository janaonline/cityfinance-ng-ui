import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubmittedFormComponent as SubmittedFormsListComponent } from './list/submitted-form/submitted-form.component';
import { StateQuestionnairesComponent } from './state/state-questionnaires/state-questionnaires.component';
import { ULBQuestionnaireComponent } from './ulb/questionnaire/questionnaire.component';

export const routes: Routes = [
  {
    path: "state/form",
    component: StateQuestionnairesComponent,
  },
  {
    path: "ulb/form",
    component: ULBQuestionnaireComponent,
  },
  {
    path: "list",
    component: SubmittedFormsListComponent,
  },
];

export const QuestionnaireRoutes: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  routes
);
