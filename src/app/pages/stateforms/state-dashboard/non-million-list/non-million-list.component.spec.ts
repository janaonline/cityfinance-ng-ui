import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonMillionListComponent } from './non-million-list.component';

describe('NonMillionListComponent', () => {
  let component: NonMillionListComponent;
  let fixture: ComponentFixture<NonMillionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonMillionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonMillionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
