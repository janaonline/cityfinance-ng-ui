import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUlbProfileComponent } from './edit-ulb-profile.component';

describe('EditUlbProfileComponent', () => {
  let component: EditUlbProfileComponent;
  let fixture: ComponentFixture<EditUlbProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUlbProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUlbProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
