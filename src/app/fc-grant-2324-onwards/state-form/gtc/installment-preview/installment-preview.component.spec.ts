import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentPreviewComponent } from './installment-preview.component';

describe('InstallmentPreviewComponent', () => {
  let component: InstallmentPreviewComponent;
  let fixture: ComponentFixture<InstallmentPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallmentPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallmentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
