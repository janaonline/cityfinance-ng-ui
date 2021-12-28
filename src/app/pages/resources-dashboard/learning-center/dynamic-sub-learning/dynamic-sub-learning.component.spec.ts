import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSubLearningComponent } from './dynamic-sub-learning.component';

describe('DynamicSubLearningComponent', () => {
  let component: DynamicSubLearningComponent;
  let fixture: ComponentFixture<DynamicSubLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicSubLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicSubLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
