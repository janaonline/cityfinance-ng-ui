import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantClaimsComponent } from './grant-claims.component';

describe('GrantClaimsComponent', () => {
  let component: GrantClaimsComponent;
  let fixture: ComponentFixture<GrantClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
