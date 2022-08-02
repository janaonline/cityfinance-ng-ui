import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-table-approve-return-dialog',
  templateUrl: './table-approve-return-dialog.component.html',
  styleUrls: ['./table-approve-return-dialog.component.scss']
})
export class TableApproveReturnDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TableApproveReturnDialogComponent>) { }

  ngOnInit(): void {
  }

}
