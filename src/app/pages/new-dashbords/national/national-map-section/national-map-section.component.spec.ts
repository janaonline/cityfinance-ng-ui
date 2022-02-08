import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalMapSectionComponent } from './national-map-section.component';

describe('NationalMapSectionComponent', () => {
  let component: NationalMapSectionComponent;
  let fixture: ComponentFixture<NationalMapSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalMapSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalMapSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
