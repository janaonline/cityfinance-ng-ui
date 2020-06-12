import { QuestionnairesModule } from './questionnaires.module';

describe('QuestionnairesModule', () => {
  let questionnairesModule: QuestionnairesModule;

  beforeEach(() => {
    questionnairesModule = new QuestionnairesModule();
  });

  it('should create an instance', () => {
    expect(questionnairesModule).toBeTruthy();
  });
});
