import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbCompareDailogComponent } from './ulb-compare-dailog.component';

describe('UlbCompareDailogComponent', () => {
  let component: UlbCompareDailogComponent;
  let fixture: ComponentFixture<UlbCompareDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlbCompareDailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbCompareDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
