import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtcComponent } from './gtc.component';

describe('GtcComponent', () => {
  let component: GtcComponent;
  let fixture: ComponentFixture<GtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
