import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GfcFormComponent } from './gfc-form.component';

describe('GfcFormComponent', () => {
  let component: GfcFormComponent;
  let fixture: ComponentFixture<GfcFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GfcFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GfcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
