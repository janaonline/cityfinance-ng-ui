import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonActionRadioComponent } from './common-action-radio.component';

describe('CommonActionRadioComponent', () => {
  let component: CommonActionRadioComponent;
  let fixture: ComponentFixture<CommonActionRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonActionRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonActionRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
