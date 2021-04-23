import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryLevelComponent } from './entry-level.component';

describe('EntryLevelComponent', () => {
  let component: EntryLevelComponent;
  let fixture: ComponentFixture<EntryLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
