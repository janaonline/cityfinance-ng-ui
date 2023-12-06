import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosPopupComponent } from './videos-popup.component';

describe('VideosPopupComponent', () => {
  let component: VideosPopupComponent;
  let fixture: ComponentFixture<VideosPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
