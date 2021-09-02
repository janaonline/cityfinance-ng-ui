import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SolidWasteManagementComponent } from './solid-waste-management.component';

describe('SolidWasteManagementComponent', () => {
  let component: SolidWasteManagementComponent;
  let fixture: ComponentFixture<SolidWasteManagementComponent>;

  beforeEach(waitForAsync(() => {
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
