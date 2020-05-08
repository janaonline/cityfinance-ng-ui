import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceDataUploadInputComponent } from './finance-data-upload-input.component';

describe('FinanceDataUploadInputComponent', () => {
  let component: FinanceDataUploadInputComponent;
  let fixture: ComponentFixture<FinanceDataUploadInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceDataUploadInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceDataUploadInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
