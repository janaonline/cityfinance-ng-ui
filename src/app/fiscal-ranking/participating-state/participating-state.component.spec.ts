import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatingStateComponent } from './participating-state.component';

describe('ParticipatingStateComponent', () => {
  let component: ParticipatingStateComponent;
  let fixture: ComponentFixture<ParticipatingStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipatingStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipatingStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
