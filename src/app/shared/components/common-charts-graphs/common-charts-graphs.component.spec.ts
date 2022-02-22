import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonChartsGraphsComponent } from './common-charts-graphs.component';

describe('CommonChartsGraphsComponent', () => {
  let component: CommonChartsGraphsComponent;
  let fixture: ComponentFixture<CommonChartsGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonChartsGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonChartsGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
