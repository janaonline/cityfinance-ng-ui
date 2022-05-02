import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumerationComponent } from './enumeration.component';

describe('EnumerationComponent', () => {
  let component: EnumerationComponent;
  let fixture: ComponentFixture<EnumerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnumerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
