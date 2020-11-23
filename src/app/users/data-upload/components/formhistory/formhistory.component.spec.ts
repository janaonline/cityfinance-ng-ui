import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormhistoryComponent } from './formhistory.component';

describe('FormhistoryComponent', () => {
  let component: FormhistoryComponent;
  let fixture: ComponentFixture<FormhistoryComponent>;

  beforeEach(async(() => {
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
