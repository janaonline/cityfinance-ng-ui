import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlbListComponent } from './slb-list.component';

describe('SlbListComponent', () => {
  let component: SlbListComponent;
  let fixture: ComponentFixture<SlbListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlbListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
