import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IncompleteProfileComponent } from './incomplete-profile.component';

describe('IncompleteProfileComponent', () => {
  let component: IncompleteProfileComponent;
  let fixture: ComponentFixture<IncompleteProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IncompleteProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncompleteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
