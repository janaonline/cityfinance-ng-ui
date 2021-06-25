import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfmsPreviewComponent } from './pfms-preview.component';

describe('PfmsPreviewComponent', () => {
  let component: PfmsPreviewComponent;
  let fixture: ComponentFixture<PfmsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfmsPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PfmsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
