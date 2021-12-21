import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareDialogComponent } from './compare-dialog.component';

describe('CompareDialogComponent', () => {
  let component: CompareDialogComponent;
  let fixture: ComponentFixture<CompareDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
