import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalBondComponent } from './municipal-bond.component';

describe('MunicipalBondComponent', () => {
  let component: MunicipalBondComponent;
  let fixture: ComponentFixture<MunicipalBondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipalBondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalBondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
