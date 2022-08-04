import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateFinanceComponent } from './state-finance.component';

describe('StateFinanceComponent', () => {
  let component: StateFinanceComponent;
  let fixture: ComponentFixture<StateFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
