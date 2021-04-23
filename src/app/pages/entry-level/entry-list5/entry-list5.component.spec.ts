import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryList5Component } from './entry-list5.component';

describe('EntryList5Component', () => {
  let component: EntryList5Component;
  let fixture: ComponentFixture<EntryList5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryList5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryList5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
