import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryList3Component } from './entry-list3.component';

describe('EntryList3Component', () => {
  let component: EntryList3Component;
  let fixture: ComponentFixture<EntryList3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryList3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryList3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
