import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StateQuestionnairesComponent } from './state/state-questionnaires/state-questionnaires.component';

export const routes: Routes = [
  {
    path: "form",
    component: StateQuestionnairesComponent,
  },
];

export const QuestionnaireRoutes: ModuleWithProviders = RouterModule.forChild(
  routes
);
