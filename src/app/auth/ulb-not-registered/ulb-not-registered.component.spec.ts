import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbNotRegisteredComponent } from './ulb-not-registered.component';

describe('UlbNotRegisteredComponent', () => {
  let component: UlbNotRegisteredComponent;
  let fixture: ComponentFixture<UlbNotRegisteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UlbNotRegisteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbNotRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
