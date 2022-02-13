import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlbChartsComponent } from './slb-charts.component';

describe('SlbChartsComponent', () => {
  let component: SlbChartsComponent;
  let fixture: ComponentFixture<SlbChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlbChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlbChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
