import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolidWasteManagementComponent } from './solid-waste-management.component';

describe('SolidWasteManagementComponent', () => {
  let component: SolidWasteManagementComponent;
  let fixture: ComponentFixture<SolidWasteManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolidWasteManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolidWasteManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
