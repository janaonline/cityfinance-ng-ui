import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcHomePageComponent } from './fc-home-page.component';

describe('FcHomePageComponent', () => {
  let component: FcHomePageComponent;
  let fixture: ComponentFixture<FcHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FcHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
