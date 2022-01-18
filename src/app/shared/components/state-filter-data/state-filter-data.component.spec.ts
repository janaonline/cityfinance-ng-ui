import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateFilterDataComponent } from './state-filter-data.component';

describe('StateFilterDataComponent', () => {
  let component: StateFilterDataComponent;
  let fixture: ComponentFixture<StateFilterDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateFilterDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateFilterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
