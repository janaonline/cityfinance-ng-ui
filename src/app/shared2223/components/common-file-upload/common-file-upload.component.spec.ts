import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFileUploadComponent } from './common-file-upload.component';

describe('CommonFileUploadComponent', () => {
  let component: CommonFileUploadComponent;
  let fixture: ComponentFixture<CommonFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonFileUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
