import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGrid2223Component } from './ag-grid2223.component';

describe('AgGrid2223Component', () => {
  let component: AgGrid2223Component;
  let fixture: ComponentFixture<AgGrid2223Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGrid2223Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGrid2223Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
