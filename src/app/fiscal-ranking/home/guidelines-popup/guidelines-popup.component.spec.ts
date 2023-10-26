import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelinesPopupComponent } from './guidelines-popup.component';

describe('GuidelinesPopupComponent', () => {
  let component: GuidelinesPopupComponent;
  let fixture: ComponentFixture<GuidelinesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuidelinesPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidelinesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
