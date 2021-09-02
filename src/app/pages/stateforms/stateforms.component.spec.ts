import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateformsComponent } from './stateforms.component';

describe('StateformsComponent', () => {
  let component: StateformsComponent;
  let fixture: ComponentFixture<StateformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateformsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
