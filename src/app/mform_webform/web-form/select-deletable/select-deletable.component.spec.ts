import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDeletableComponent } from './select-deletable.component';

describe('SelectDeletableComponent', () => {
  let component: SelectDeletableComponent;
  let fixture: ComponentFixture<SelectDeletableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDeletableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDeletableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
