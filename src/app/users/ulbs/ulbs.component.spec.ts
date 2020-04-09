import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbsComponent } from './ulbs.component';

describe('UlbsComponent', () => {
  let component: UlbsComponent;
  let fixture: ComponentFixture<UlbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UlbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
