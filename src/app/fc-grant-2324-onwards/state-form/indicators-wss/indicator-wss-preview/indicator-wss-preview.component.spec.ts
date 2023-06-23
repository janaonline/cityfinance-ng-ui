import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorWssPreviewComponent } from './indicator-wss-preview.component';

describe('IndicatorWssPreviewComponent', () => {
  let component: IndicatorWssPreviewComponent;
  let fixture: ComponentFixture<IndicatorWssPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorWssPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorWssPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
