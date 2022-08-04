import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonActionComponent } from './common-action.component';

describe('CommonActionComponent', () => {
  let component: CommonActionComponent;
  let fixture: ComponentFixture<CommonActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
