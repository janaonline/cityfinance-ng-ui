import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilreportListComponent } from './utilreport-list.component';

describe('UtilreportListComponent', () => {
  let component: UtilreportListComponent;
  let fixture: ComponentFixture<UtilreportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilreportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilreportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
