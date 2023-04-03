import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbFiscalNewComponent } from './ulb-fiscal-new.component';

describe('UlbFiscalNewComponent', () => {
  let component: UlbFiscalNewComponent;
  let fixture: ComponentFixture<UlbFiscalNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlbFiscalNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbFiscalNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
