import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserChargesComponent } from './user-charges.component';

describe('UserChargesComponent', () => {
  let component: UserChargesComponent;
  let fixture: ComponentFixture<UserChargesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
