import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendererButtonComponent } from './renderer-button.component';

describe('RendererButtonComponent', () => {
  let component: RendererButtonComponent;
  let fixture: ComponentFixture<RendererButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendererButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendererButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
