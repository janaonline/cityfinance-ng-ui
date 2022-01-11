import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterModelBoxComponent } from './filter-model-box.component';

describe('FilterModelBoxComponent', () => {
  let component: FilterModelBoxComponent;
  let fixture: ComponentFixture<FilterModelBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterModelBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterModelBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
