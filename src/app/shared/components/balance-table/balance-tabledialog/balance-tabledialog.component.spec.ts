import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTabledialogComponent } from './balance-tabledialog.component';

describe('BalanceTabledialogComponent', () => {
  let component: BalanceTabledialogComponent;
  let fixture: ComponentFixture<BalanceTabledialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceTabledialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceTabledialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
