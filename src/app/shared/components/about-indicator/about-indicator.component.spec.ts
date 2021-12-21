import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutIndicatorComponent } from './about-indicator.component';

describe('AboutIndicatorComponent', () => {
  let component: AboutIndicatorComponent;
  let fixture: ComponentFixture<AboutIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
