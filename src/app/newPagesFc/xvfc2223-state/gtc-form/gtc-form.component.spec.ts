import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtcFormComponent } from './gtc-form.component';

describe('GtcFormComponent', () => {
  let component: GtcFormComponent;
  let fixture: ComponentFixture<GtcFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GtcFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GtcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
