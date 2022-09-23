import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUlbComponent } from './edit-ulb.component';

describe('EditUlbComponent', () => {
  let component: EditUlbComponent;
  let fixture: ComponentFixture<EditUlbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUlbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
