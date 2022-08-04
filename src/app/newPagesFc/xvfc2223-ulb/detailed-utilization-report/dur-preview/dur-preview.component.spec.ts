import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurPreviewComponent } from './dur-preview.component';

describe('DurPreviewComponent', () => {
  let component: DurPreviewComponent;
  let fixture: ComponentFixture<DurPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DurPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DurPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
