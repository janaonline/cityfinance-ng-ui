import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebFormViewComponent } from './web-form-view.component';

describe('WebFormViewComponent', () => {
  let component: WebFormViewComponent;
  let fixture: ComponentFixture<WebFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebFormViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
