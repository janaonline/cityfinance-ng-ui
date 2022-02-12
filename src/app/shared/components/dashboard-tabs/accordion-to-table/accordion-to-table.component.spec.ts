import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionToTableComponent } from './accordion-to-table.component';

describe('AccordionToTableComponent', () => {
  let component: AccordionToTableComponent;
  let fixture: ComponentFixture<AccordionToTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionToTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionToTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
