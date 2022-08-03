import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdfFormComponent } from './odf-form.component';

describe('OdfFormComponent', () => {
  let component: OdfFormComponent;
  let fixture: ComponentFixture<OdfFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdfFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdfFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
