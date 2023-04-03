import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyEightSlbPreviewComponent } from './twenty-eight-slb-preview.component';

describe('TwentyEightSlbPreviewComponent', () => {
  let component: TwentyEightSlbPreviewComponent;
  let fixture: ComponentFixture<TwentyEightSlbPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwentyEightSlbPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwentyEightSlbPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
