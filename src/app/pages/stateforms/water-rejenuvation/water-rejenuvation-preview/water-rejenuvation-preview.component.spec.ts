import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterRejenuvationPreviewComponent } from './water-rejenuvation-preview.component';

describe('WaterRejenuvationPreviewComponent', () => {
  let component: WaterRejenuvationPreviewComponent;
  let fixture: ComponentFixture<WaterRejenuvationPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterRejenuvationPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterRejenuvationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
