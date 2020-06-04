import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedFormComponent } from './submitted-form.component';

describe('SubmittedFormComponent', () => {
  let component: SubmittedFormComponent;
  let fixture: ComponentFixture<SubmittedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmittedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
