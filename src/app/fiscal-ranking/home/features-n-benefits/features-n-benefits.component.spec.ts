import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesNBenefitsComponent } from './features-n-benefits.component';

describe('FeaturesNBenefitsComponent', () => {
  let component: FeaturesNBenefitsComponent;
  let fixture: ComponentFixture<FeaturesNBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesNBenefitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesNBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
