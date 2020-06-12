import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTaxComponent } from './property-tax.component';

describe('PropertyTaxComponent', () => {
  let component: PropertyTaxComponent;
  let fixture: ComponentFixture<PropertyTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
