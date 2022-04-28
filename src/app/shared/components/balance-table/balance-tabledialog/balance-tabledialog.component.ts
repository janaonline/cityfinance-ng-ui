import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-balance-tabledialog',
  templateUrl: './balance-tabledialog.component.html',
  styleUrls: ['./balance-tabledialog.component.scss']
})
export class BalanceTabledialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BalanceTabledialogComponent>
  ) {}

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
