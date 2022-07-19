import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Xvfc2223StateComponent } from './xvfc2223-state.component';

describe('Xvfc2223StateComponent', () => {
  let component: Xvfc2223StateComponent;
  let fixture: ComponentFixture<Xvfc2223StateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Xvfc2223StateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Xvfc2223StateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
