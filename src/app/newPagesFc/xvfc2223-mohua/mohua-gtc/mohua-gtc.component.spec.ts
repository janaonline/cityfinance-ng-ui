import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MohuaGtcComponent } from './mohua-gtc.component';

describe('MohuaGtcComponent', () => {
  let component: MohuaGtcComponent;
  let fixture: ComponentFixture<MohuaGtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MohuaGtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MohuaGtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
