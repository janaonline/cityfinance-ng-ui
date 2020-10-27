import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeConfirmationComponent } from './user-type-confirmation.component';

describe('UserTypeConfirmationComponent', () => {
  let component: UserTypeConfirmationComponent;
  let fixture: ComponentFixture<UserTypeConfirmationComponent>;

  beforeEach(async(() => {
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
