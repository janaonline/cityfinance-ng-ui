import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantAllPreviewComponent } from './grant-all-preview.component';

describe('GrantAllPreviewComponent', () => {
  let component: GrantAllPreviewComponent;
  let fixture: ComponentFixture<GrantAllPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantAllPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantAllPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
