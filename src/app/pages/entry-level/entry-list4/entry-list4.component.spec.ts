import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryList4Component } from './entry-list4.component';

describe('EntryList4Component', () => {
  let component: EntryList4Component;
  let fixture: ComponentFixture<EntryList4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryList4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryList4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
