import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WasteWaterManagementComponent } from './waste-water-management.component';

describe('WasteWaterManagementComponent', () => {
  let component: WasteWaterManagementComponent;
  let fixture: ComponentFixture<WasteWaterManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WasteWaterManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteWaterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
