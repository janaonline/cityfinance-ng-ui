import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateActionUlbComponent } from './state-action-ulb.component';

describe('StateActionUlbComponent', () => {
  let component: StateActionUlbComponent;
  let fixture: ComponentFixture<StateActionUlbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateActionUlbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateActionUlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
