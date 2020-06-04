import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubmittedFormComponent as SubmittedFormsListComponent } from './list/submitted-form/submitted-form.component';
import { StateQuestionnairesComponent } from './state/state-questionnaires/state-questionnaires.component';

export const routes: Routes = [
  {
    path: "form",
    component: StateQuestionnairesComponent,
  },
  {
    path: "states",
    component: SubmittedFormsListComponent,
  },
];

export const QuestionnaireRoutes: ModuleWithProviders = RouterModule.forChild(
  routes
);
