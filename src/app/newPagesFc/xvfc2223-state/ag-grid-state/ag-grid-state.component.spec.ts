import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridStateComponent } from './ag-grid-state.component';

describe('AgGridStateComponent', () => {
  let component: AgGridStateComponent;
  let fixture: ComponentFixture<AgGridStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
