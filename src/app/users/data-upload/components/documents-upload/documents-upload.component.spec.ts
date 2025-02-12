import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocumentsUploadComponent } from './documents-upload.component';

describe('DocumentsUploadComponent', () => {
  let component: DocumentsUploadComponent;
  let fixture: ComponentFixture<DocumentsUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
