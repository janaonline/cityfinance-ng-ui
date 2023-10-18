import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmuApprovalPopupComponent } from './pmu-approval-popup.component';

describe('PmuApprovalPopupComponent', () => {
  let component: PmuApprovalPopupComponent;
  let fixture: ComponentFixture<PmuApprovalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmuApprovalPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmuApprovalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
