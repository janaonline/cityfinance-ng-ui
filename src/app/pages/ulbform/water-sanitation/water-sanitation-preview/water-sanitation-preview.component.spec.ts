import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterSanitationPreviewComponent } from './water-sanitation-preview.component';

describe('WaterSanitationPreviewComponent', () => {
  let component: WaterSanitationPreviewComponent;
  let fixture: ComponentFixture<WaterSanitationPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterSanitationPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterSanitationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
