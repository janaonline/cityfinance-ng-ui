import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantAllocationComponent } from './grant-allocation.component';

describe('GrantAllocationComponent', () => {
  let component: GrantAllocationComponent;
  let fixture: ComponentFixture<GrantAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
