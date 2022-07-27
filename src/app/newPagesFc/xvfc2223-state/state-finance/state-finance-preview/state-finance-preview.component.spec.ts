import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateFinancePreviewComponent } from './state-finance-preview.component';

describe('StateFinancePreviewComponent', () => {
  let component: StateFinancePreviewComponent;
  let fixture: ComponentFixture<StateFinancePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateFinancePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateFinancePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
