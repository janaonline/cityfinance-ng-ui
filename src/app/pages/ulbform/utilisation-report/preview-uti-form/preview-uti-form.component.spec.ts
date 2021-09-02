import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewUtiFormComponent } from './preview-uti-form.component';

describe('PreviewUtiFormComponent', () => {
  let component: PreviewUtiFormComponent;
  let fixture: ComponentFixture<PreviewUtiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewUtiFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewUtiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
