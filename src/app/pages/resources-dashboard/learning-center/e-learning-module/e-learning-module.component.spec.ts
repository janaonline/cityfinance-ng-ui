import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ELearningModuleComponent } from './e-learning-module.component';

describe('ELearningModuleComponent', () => {
  let component: ELearningModuleComponent;
  let fixture: ComponentFixture<ELearningModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ELearningModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ELearningModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
