import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtcertificatePreviewComponent } from './gtcertificate-preview.component';

describe('GtcertificatePreviewComponent', () => {
  let component: GtcertificatePreviewComponent;
  let fixture: ComponentFixture<GtcertificatePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GtcertificatePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GtcertificatePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
