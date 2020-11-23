import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteWaterManagementComponent } from './waste-water-management.component';

describe('WasteWaterManagementComponent', () => {
  let component: WasteWaterManagementComponent;
  let fixture: ComponentFixture<WasteWaterManagementComponent>;

  beforeEach(async(() => {
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
