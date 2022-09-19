import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUlbTableComponent } from './edit-ulb-table.component';

describe('EditUlbTableComponent', () => {
  let component: EditUlbTableComponent;
  let fixture: ComponentFixture<EditUlbTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUlbTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUlbTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
