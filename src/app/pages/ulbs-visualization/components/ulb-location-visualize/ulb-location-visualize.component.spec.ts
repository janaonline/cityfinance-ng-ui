import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbLocationVisualizeComponent } from './ulb-location-visualize.component';

describe('UlbLocationVisualizeComponent', () => {
  let component: UlbLocationVisualizeComponent;
  let fixture: ComponentFixture<UlbLocationVisualizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlbLocationVisualizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbLocationVisualizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
