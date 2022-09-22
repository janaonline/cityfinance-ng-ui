import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slbs2223PreviewComponent } from './slbs2223-preview.component';

describe('Slbs2223PreviewComponent', () => {
  let component: Slbs2223PreviewComponent;
  let fixture: ComponentFixture<Slbs2223PreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Slbs2223PreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Slbs2223PreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
