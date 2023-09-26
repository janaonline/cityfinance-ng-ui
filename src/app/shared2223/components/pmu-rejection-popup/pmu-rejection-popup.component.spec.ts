import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmuRejectionPopupComponent } from './pmu-rejection-popup.component';

describe('PmuRejectionPopupComponent', () => {
  let component: PmuRejectionPopupComponent;
  let fixture: ComponentFixture<PmuRejectionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmuRejectionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmuRejectionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
