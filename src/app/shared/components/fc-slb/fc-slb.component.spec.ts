import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcSlbComponent } from './fc-slb.component';

describe('FcSlbComponent', () => {
  let component: FcSlbComponent;
  let fixture: ComponentFixture<FcSlbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcSlbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FcSlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
