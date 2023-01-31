import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfCardViewerComponent } from './pdf-card-viewer.component';

describe('PdfCardViewerComponent', () => {
  let component: PdfCardViewerComponent;
  let fixture: ComponentFixture<PdfCardViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfCardViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfCardViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
