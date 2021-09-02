import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedHeaderComponent } from './customized-header.component';

describe('CustomizedHeaderComponent', () => {
  let component: CustomizedHeaderComponent;
  let fixture: ComponentFixture<CustomizedHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizedHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
