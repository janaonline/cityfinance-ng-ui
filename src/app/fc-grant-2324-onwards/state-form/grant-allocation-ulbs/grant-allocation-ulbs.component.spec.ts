import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantAllocationUlbsComponent } from './grant-allocation-ulbs.component';

describe('GrantAllocationUlbsComponent', () => {
  let component: GrantAllocationUlbsComponent;
  let fixture: ComponentFixture<GrantAllocationUlbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantAllocationUlbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantAllocationUlbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
