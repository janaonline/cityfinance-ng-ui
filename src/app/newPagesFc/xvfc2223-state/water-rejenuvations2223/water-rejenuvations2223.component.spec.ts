import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterRejenuvations2223Component } from './water-rejenuvations2223.component';

describe('WaterRejenuvations2223Component', () => {
  let component: WaterRejenuvations2223Component;
  let fixture: ComponentFixture<WaterRejenuvations2223Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterRejenuvations2223Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterRejenuvations2223Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
