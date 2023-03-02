import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualAccountTemplateComponent } from './annual-account-template.component';

describe('AnnualAccountTemplateComponent', () => {
  let component: AnnualAccountTemplateComponent;
  let fixture: ComponentFixture<AnnualAccountTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualAccountTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualAccountTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
