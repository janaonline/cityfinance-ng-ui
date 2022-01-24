import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalResourcesComponent } from './national-resources.component';

describe('NationalResourcesComponent', () => {
  let component: NationalResourcesComponent;
  let fixture: ComponentFixture<NationalResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
