import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalityBondsProjectsComponent } from './municipality-bonds-projects.component';

describe('MunicipalityBondsProjectsComponent', () => {
  let component: MunicipalityBondsProjectsComponent;
  let fixture: ComponentFixture<MunicipalityBondsProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipalityBondsProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalityBondsProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
