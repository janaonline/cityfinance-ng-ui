import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalityBondsComponent } from './municipality-bonds.component';

describe('MunicipalityBondsComponent', () => {
  let component: MunicipalityBondsComponent;
  let fixture: ComponentFixture<MunicipalityBondsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipalityBondsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalityBondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
