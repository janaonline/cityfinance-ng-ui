import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbAdminComponent } from './ulb-admin.component';

describe('UlbAdminComponent', () => {
  let component: UlbAdminComponent;
  let fixture: ComponentFixture<UlbAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlbAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
