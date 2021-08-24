import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterRejenuvationComponent } from './water-rejenuvation.component';

describe('WaterRejenuvationComponent', () => {
  let component: WaterRejenuvationComponent;
  let fixture: ComponentFixture<WaterRejenuvationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterRejenuvationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterRejenuvationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
