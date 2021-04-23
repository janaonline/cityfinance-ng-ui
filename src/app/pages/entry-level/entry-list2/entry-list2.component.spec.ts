import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryList2Component } from './entry-list2.component';

describe('EntryList2Component', () => {
  let component: EntryList2Component;
  let fixture: ComponentFixture<EntryList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
