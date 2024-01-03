import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatingUlbsComponent } from './participating-ulbs.component';

describe('ParticipatingUlbsComponent', () => {
  let component: ParticipatingUlbsComponent;
  let fixture: ComponentFixture<ParticipatingUlbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipatingUlbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipatingUlbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
