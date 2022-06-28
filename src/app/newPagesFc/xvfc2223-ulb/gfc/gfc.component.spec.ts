import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GfcComponent } from './gfc.component';

describe('GfcComponent', () => {
  let component: GfcComponent;
  let fixture: ComponentFixture<GfcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GfcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
