import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbCoverageComponent } from './ulb-coverage.component';

describe('UlbCoverageComponent', () => {
  let component: UlbCoverageComponent;
  let fixture: ComponentFixture<UlbCoverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UlbCoverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
