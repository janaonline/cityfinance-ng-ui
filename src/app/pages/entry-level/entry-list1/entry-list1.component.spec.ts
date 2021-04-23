import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryList1Component } from './entry-list1.component';

describe('EntryList1Component', () => {
  let component: EntryList1Component;
  let fixture: ComponentFixture<EntryList1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryList1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryList1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
