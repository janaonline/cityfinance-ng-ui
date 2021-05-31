import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterRecyclingComponent } from './water-recycling.component';

describe('WaterRecyclingComponent', () => {
  let component: WaterRecyclingComponent;
  let fixture: ComponentFixture<WaterRecyclingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterRecyclingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterRecyclingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
