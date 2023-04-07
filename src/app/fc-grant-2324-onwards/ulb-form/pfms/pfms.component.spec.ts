import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfmsComponent } from './pfms.component';

describe('PfmsComponent', () => {
  let component: PfmsComponent;
  let fixture: ComponentFixture<PfmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PfmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
