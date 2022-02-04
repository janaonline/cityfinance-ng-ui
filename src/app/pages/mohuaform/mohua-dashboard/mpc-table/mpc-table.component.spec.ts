import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpcTableComponent } from './mpc-table.component';

describe('MpcTableComponent', () => {
  let component: MpcTableComponent;
  let fixture: ComponentFixture<MpcTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpcTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
