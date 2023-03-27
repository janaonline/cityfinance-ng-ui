import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCommonActionComponent } from './form-common-action.component';

describe('FormCommonActionComponent', () => {
  let component: FormCommonActionComponent;
  let fixture: ComponentFixture<FormCommonActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCommonActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCommonActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
