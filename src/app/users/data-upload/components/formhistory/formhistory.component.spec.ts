import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormhistoryComponent } from './formhistory.component';

describe('FormhistoryComponent', () => {
  let component: FormhistoryComponent;
  let fixture: ComponentFixture<FormhistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
