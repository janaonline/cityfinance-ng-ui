import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlbsComponent } from './slbs.component';

describe('SlbsComponent', () => {
  let component: SlbsComponent;
  let fixture: ComponentFixture<SlbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
