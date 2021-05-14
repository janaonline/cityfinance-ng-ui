import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSlbsComponent } from './service-slbs.component';

describe('ServiceSlbsComponent', () => {
  let component: ServiceSlbsComponent;
  let fixture: ComponentFixture<ServiceSlbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceSlbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSlbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
