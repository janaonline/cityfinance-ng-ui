import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slbs28FormPreviewComponent } from './slbs28-form-preview.component';

describe('Slbs28FormPreviewComponent', () => {
  let component: Slbs28FormPreviewComponent;
  let fixture: ComponentFixture<Slbs28FormPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Slbs28FormPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Slbs28FormPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
