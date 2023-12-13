import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisionFiltersComponent } from './comparision-filters.component';

describe('ComparisionFiltersComponent', () => {
  let component: ComparisionFiltersComponent;
  let fixture: ComponentFixture<ComparisionFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisionFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisionFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
