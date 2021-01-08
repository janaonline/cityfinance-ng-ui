import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MillionPlusCitiesComponent } from './million-plus-cities.component';

describe('MillionPlusCitiesComponent', () => {
  let component: MillionPlusCitiesComponent;
  let fixture: ComponentFixture<MillionPlusCitiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MillionPlusCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MillionPlusCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
