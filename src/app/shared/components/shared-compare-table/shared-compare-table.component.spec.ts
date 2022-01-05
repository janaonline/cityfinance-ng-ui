import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCompareTableComponent } from './shared-compare-table.component';

describe('SharedCompareTableComponent', () => {
  let component: SharedCompareTableComponent;
  let fixture: ComponentFixture<SharedCompareTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedCompareTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedCompareTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
