import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbActionPopupComponent } from './ulb-action-popup.component';

describe('UlbActionPopupComponent', () => {
  let component: UlbActionPopupComponent;
  let fixture: ComponentFixture<UlbActionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlbActionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbActionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
