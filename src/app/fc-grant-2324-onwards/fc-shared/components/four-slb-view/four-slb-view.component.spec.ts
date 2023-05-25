import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourSlbViewComponent } from './four-slb-view.component';

describe('FourSlbViewComponent', () => {
  let component: FourSlbViewComponent;
  let fixture: ComponentFixture<FourSlbViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourSlbViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourSlbViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
