import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardUserComponent } from './onboard-user.component';

describe('OnboardUserComponent', () => {
  let component: OnboardUserComponent;
  let fixture: ComponentFixture<OnboardUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
