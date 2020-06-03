import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { QuestionnaireRoutes } from './questionnaires.route';
import { StateQuestionnairesComponent } from './state/state-questionnaires/state-questionnaires.component';

@NgModule({
  imports: [CommonModule, QuestionnaireRoutes],
  declarations: [StateQuestionnairesComponent],
})
export class QuestionnairesModule {}
