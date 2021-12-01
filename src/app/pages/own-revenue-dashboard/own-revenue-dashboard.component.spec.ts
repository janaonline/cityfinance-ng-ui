import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnRevenueDashboardComponent } from './own-revenue-dashboard.component';

describe('OwnRevenueDashboardComponent', () => {
  let component: OwnRevenueDashboardComponent;
  let fixture: ComponentFixture<OwnRevenueDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnRevenueDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnRevenueDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
