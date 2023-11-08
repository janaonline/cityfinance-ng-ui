import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewuiCommonTableComponent } from './newui-common-table.component';

describe('NewuiCommonTableComponent', () => {
  let component: NewuiCommonTableComponent;
  let fixture: ComponentFixture<NewuiCommonTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewuiCommonTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewuiCommonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
