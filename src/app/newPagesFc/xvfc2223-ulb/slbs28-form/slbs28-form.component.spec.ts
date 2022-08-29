import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slbs28FormComponent } from './slbs28-form.component';

describe('Slbs28FormComponent', () => {
  let component: Slbs28FormComponent;
  let fixture: ComponentFixture<Slbs28FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Slbs28FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Slbs28FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
