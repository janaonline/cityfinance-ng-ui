import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourSlbComponent } from './four-slb.component';

describe('FourSlbComponent', () => {
  let component: FourSlbComponent;
  let fixture: ComponentFixture<FourSlbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourSlbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourSlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
