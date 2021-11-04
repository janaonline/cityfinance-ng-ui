import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantClaimComponent } from './grant-claim.component';

describe('GrantClaimComponent', () => {
  let component: GrantClaimComponent;
  let fixture: ComponentFixture<GrantClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
