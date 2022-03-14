import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalLawsComponent } from './municipal-laws.component';

describe('MunicipalLawsComponent', () => {
  let component: MunicipalLawsComponent;
  let fixture: ComponentFixture<MunicipalLawsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipalLawsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalLawsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
