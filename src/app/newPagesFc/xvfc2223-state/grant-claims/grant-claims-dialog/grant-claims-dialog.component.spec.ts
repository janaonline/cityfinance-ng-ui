import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantClaimsDialogComponent } from './grant-claims-dialog.component';

describe('GrantClaimsDialogComponent', () => {
  let component: GrantClaimsDialogComponent;
  let fixture: ComponentFixture<GrantClaimsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantClaimsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantClaimsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
