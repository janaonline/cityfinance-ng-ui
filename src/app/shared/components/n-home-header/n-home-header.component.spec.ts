import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NHomeHeaderComponent } from './n-home-header.component';

describe('NHomeHeaderComponent', () => {
  let component: NHomeHeaderComponent;
  let fixture: ComponentFixture<NHomeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NHomeHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NHomeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
