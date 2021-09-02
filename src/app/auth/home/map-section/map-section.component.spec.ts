import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapSectionComponent } from './map-section.component';

describe('MapSectionComponent', () => {
  let component: MapSectionComponent;
  let fixture: ComponentFixture<MapSectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
