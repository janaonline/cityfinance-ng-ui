import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsWssComponent } from './indicators-wss.component';

describe('IndicatorsWssComponent', () => {
  let component: IndicatorsWssComponent;
  let fixture: ComponentFixture<IndicatorsWssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorsWssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorsWssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
