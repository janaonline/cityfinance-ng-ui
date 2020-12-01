import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteProfileComponent } from './incomplete-profile.component';

describe('IncompleteProfileComponent', () => {
  let component: IncompleteProfileComponent;
  let fixture: ComponentFixture<IncompleteProfileComponent>;

  beforeEach(async(() => {
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
