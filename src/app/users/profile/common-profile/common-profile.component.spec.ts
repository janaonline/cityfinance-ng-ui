import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonProfileComponent } from './common-profile.component';

describe('CommonProfileComponent', () => {
  let component: CommonProfileComponent;
  let fixture: ComponentFixture<CommonProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
