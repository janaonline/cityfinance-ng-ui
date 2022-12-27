import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPopupComponent } from './download-popup.component';

describe('DownloadPopupComponent', () => {
  let component: DownloadPopupComponent;
  let fixture: ComponentFixture<DownloadPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
