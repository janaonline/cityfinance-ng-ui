import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterRejenuvations2223PreviewComponent } from './water-rejenuvations2223-preview.component';

describe('WaterRejenuvations2223PreviewComponent', () => {
  let component: WaterRejenuvations2223PreviewComponent;
  let fixture: ComponentFixture<WaterRejenuvations2223PreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterRejenuvations2223PreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterRejenuvations2223PreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
