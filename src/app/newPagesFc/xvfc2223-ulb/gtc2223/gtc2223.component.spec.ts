import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gtc2223Component } from './gtc2223.component';

describe('Gtc2223Component', () => {
  let component: Gtc2223Component;
  let fixture: ComponentFixture<Gtc2223Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gtc2223Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Gtc2223Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
