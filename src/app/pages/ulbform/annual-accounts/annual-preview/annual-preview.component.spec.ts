import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualPreviewComponent } from './annual-preview.component';

describe('AnnualPreviewComponent', () => {
  let component: AnnualPreviewComponent;
  let fixture: ComponentFixture<AnnualPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
