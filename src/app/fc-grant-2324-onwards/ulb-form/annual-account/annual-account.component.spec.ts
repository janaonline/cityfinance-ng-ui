import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualAccountComponent } from './annual-account.component';

describe('AnnualAccountComponent', () => {
  let component: AnnualAccountComponent;
  let fixture: ComponentFixture<AnnualAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
