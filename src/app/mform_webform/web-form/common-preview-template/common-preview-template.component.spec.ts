import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonPreviewTemplateComponent } from './common-preview-template.component';

describe('CommonPreviewTemplateComponent', () => {
  let component: CommonPreviewTemplateComponent;
  let fixture: ComponentFixture<CommonPreviewTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonPreviewTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonPreviewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
