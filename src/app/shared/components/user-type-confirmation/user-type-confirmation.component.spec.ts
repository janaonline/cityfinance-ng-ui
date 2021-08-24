import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserTypeConfirmationComponent } from './user-type-confirmation.component';

describe('UserTypeConfirmationComponent', () => {
  let component: UserTypeConfirmationComponent;
  let fixture: ComponentFixture<UserTypeConfirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTypeConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypeConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
