import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkPdfComponent } from './bulk-pdf.component';

describe('BulkPdfComponent', () => {
  let component: BulkPdfComponent;
  let fixture: ComponentFixture<BulkPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
