import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalHeatMapComponent } from './national-heat-map.component';

describe('NationalHeatMapComponent', () => {
  let component: NationalHeatMapComponent;
  let fixture: ComponentFixture<NationalHeatMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalHeatMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalHeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
