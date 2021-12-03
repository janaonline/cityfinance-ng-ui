import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapWithFilterComponent } from './map-with-filter.component';

describe('MapWithFilterComponent', () => {
  let component: MapWithFilterComponent;
  let fixture: ComponentFixture<MapWithFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapWithFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
