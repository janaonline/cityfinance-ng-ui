import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateResourceManagerComponent } from './state-resource-manager.component';

describe('StateResourceManagerComponent', () => {
  let component: StateResourceManagerComponent;
  let fixture: ComponentFixture<StateResourceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateResourceManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateResourceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
