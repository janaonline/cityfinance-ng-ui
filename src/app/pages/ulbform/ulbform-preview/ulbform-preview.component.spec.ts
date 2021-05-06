import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbformPreviewComponent } from './ulbform-preview.component';

describe('UlbformPreviewComponent', () => {
  let component: UlbformPreviewComponent;
  let fixture: ComponentFixture<UlbformPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlbformPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbformPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
