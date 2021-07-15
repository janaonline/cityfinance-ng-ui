import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAllPreviewComponent } from './state-all-preview.component';

describe('StateAllPreviewComponent', () => {
  let component: StateAllPreviewComponent;
  let fixture: ComponentFixture<StateAllPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateAllPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateAllPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
