import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbForm2324Component } from './ulb-form2324.component';

describe('UlbForm2324Component', () => {
  let component: UlbForm2324Component;
  let fixture: ComponentFixture<UlbForm2324Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlbForm2324Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbForm2324Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
