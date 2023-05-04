import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitClaimsGrantsComponent } from './submit-claims-grants.component';

describe('SubmitClaimsGrantsComponent', () => {
  let component: SubmitClaimsGrantsComponent;
  let fixture: ComponentFixture<SubmitClaimsGrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitClaimsGrantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitClaimsGrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
