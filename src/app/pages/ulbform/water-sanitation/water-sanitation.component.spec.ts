import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterSanitationComponent } from './water-sanitation.component';

describe('WaterSanitationComponent', () => {
  let component: WaterSanitationComponent;
  let fixture: ComponentFixture<WaterSanitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterSanitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterSanitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
