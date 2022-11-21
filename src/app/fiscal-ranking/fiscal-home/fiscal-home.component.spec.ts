import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalHomeComponent } from './fiscal-home.component';

describe('FiscalHomeComponent', () => {
  let component: FiscalHomeComponent;
  let fixture: ComponentFixture<FiscalHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiscalHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiscalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
