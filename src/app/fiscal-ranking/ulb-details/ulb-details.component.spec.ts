import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbDetailsComponent } from './ulb-details.component';

describe('UlbDetailsComponent', () => {
  let component: UlbDetailsComponent;
  let fixture: ComponentFixture<UlbDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlbDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
