import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubmittedFormComponent } from './submitted-form.component';

describe('SubmittedFormComponent', () => {
  let component: SubmittedFormComponent;
  let fixture: ComponentFixture<SubmittedFormComponent>;

  beforeEach(waitForAsync(() => {
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
