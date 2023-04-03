import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalBondRepositoryComponent } from './municipal-bond-repository.component';

describe('MunicipalBondRepositoryComponent', () => {
  let component: MunicipalBondRepositoryComponent;
  let fixture: ComponentFixture<MunicipalBondRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipalBondRepositoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalBondRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
