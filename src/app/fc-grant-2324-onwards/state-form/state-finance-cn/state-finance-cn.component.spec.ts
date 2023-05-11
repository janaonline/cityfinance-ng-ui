import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateFinanceCnComponent } from './state-finance-cn.component';

describe('StateFinanceCnComponent', () => {
  let component: StateFinanceCnComponent;
  let fixture: ComponentFixture<StateFinanceCnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateFinanceCnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateFinanceCnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
