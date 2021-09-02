import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommFileUploadComponent } from './comm-file-upload.component';

describe('CommFileUploadComponent', () => {
  let component: CommFileUploadComponent;
  let fixture: ComponentFixture<CommFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommFileUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
