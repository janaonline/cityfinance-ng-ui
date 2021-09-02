import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GTCertificateComponent } from './gtcertificate.component';

describe('GTCertificateComponent', () => {
  let component: GTCertificateComponent;
  let fixture: ComponentFixture<GTCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GTCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GTCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
