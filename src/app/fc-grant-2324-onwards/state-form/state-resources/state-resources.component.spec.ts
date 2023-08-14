import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateResourcesComponent } from './state-resources.component';

describe('StateResourcesComponent', () => {
  let component: StateResourcesComponent;
  let fixture: ComponentFixture<StateResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
