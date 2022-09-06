import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterSupplyPreviewComponent } from './water-supply-preview.component';

describe('WaterSupplyPreviewComponent', () => {
  let component: WaterSupplyPreviewComponent;
  let fixture: ComponentFixture<WaterSupplyPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterSupplyPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterSupplyPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
