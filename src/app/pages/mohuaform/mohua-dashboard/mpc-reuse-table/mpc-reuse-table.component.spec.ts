import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpcReuseTableComponent } from './mpc-reuse-table.component';

describe('MpcReuseTableComponent', () => {
  let component: MpcReuseTableComponent;
  let fixture: ComponentFixture<MpcReuseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpcReuseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcReuseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
