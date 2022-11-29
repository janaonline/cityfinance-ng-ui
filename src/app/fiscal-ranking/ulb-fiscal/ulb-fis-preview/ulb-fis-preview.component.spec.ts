import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbFisPreviewComponent } from './ulb-fis-preview.component';

describe('UlbFisPreviewComponent', () => {
  let component: UlbFisPreviewComponent;
  let fixture: ComponentFixture<UlbFisPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlbFisPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbFisPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
