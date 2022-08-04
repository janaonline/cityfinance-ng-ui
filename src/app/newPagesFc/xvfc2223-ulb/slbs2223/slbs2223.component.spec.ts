import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slbs2223Component } from './slbs2223.component';

describe('Slbs2223Component', () => {
  let component: Slbs2223Component;
  let fixture: ComponentFixture<Slbs2223Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Slbs2223Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Slbs2223Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
