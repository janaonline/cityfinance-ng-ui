import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdfFormPreviewComponent } from './odf-form-preview.component';

describe('OdfFormPreviewComponent', () => {
  let component: OdfFormPreviewComponent;
  let fixture: ComponentFixture<OdfFormPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdfFormPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdfFormPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
