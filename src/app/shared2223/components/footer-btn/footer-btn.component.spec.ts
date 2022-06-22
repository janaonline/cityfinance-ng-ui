import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBtnComponent } from './footer-btn.component';

describe('FooterBtnComponent', () => {
  let component: FooterBtnComponent;
  let fixture: ComponentFixture<FooterBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
