import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalSubComponent } from './national-sub.component';

describe('NationalSubComponent', () => {
  let component: NationalSubComponent;
  let fixture: ComponentFixture<NationalSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
