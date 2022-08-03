import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableApproveReturnDialogComponent } from './table-approve-return-dialog.component';

describe('TableApproveReturnDialogComponent', () => {
  let component: TableApproveReturnDialogComponent;
  let fixture: ComponentFixture<TableApproveReturnDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableApproveReturnDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableApproveReturnDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
