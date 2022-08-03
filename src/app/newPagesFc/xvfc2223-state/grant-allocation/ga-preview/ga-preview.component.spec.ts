import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaPreviewComponent } from './ga-preview.component';

describe('GaPreviewComponent', () => {
  let component: GaPreviewComponent;
  let fixture: ComponentFixture<GaPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
