import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtcPreviewComponent } from './gtc-preview.component';

describe('GtcPreviewComponent', () => {
  let component: GtcPreviewComponent;
  let fixture: ComponentFixture<GtcPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GtcPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GtcPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
