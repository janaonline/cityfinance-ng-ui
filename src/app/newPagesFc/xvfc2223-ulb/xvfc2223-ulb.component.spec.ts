import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Xvfc2223UlbComponent } from './xvfc2223-ulb.component';

describe('Xvfc2223UlbComponent', () => {
  let component: Xvfc2223UlbComponent;
  let fixture: ComponentFixture<Xvfc2223UlbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Xvfc2223UlbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Xvfc2223UlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
