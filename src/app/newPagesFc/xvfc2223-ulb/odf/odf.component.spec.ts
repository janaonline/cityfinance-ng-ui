import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdfComponent } from './odf.component';

describe('OdfComponent', () => {
  let component: OdfComponent;
  let fixture: ComponentFixture<OdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
