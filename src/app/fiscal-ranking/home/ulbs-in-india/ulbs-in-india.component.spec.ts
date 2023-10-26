import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbsInIndiaComponent } from './ulbs-in-india.component';

describe('UlbsInIndiaComponent', () => {
  let component: UlbsInIndiaComponent;
  let fixture: ComponentFixture<UlbsInIndiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlbsInIndiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbsInIndiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
