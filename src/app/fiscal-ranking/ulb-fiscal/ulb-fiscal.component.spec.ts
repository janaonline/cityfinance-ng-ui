import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbFiscalComponent } from './ulb-fiscal.component';

describe('UlbFiscalComponent', () => {
  let component: UlbFiscalComponent;
  let fixture: ComponentFixture<UlbFiscalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlbFiscalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbFiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
