import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbDetailsHeaderComponent } from './ulb-details-header.component';

describe('UlbDetailsHeaderComponent', () => {
  let component: UlbDetailsHeaderComponent;
  let fixture: ComponentFixture<UlbDetailsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlbDetailsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
