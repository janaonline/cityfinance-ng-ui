import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BalanceTableComponent } from '../balance-table.component';


@Component({
  selector: 'app-balance-tabledialog',
  templateUrl: './balance-tabledialog.component.html',
  styleUrls: ['./balance-tabledialog.component.scss']
})
export class BalanceTabledialogComponent implements OnInit {

  reports: any = [];
  fileType: string = '';
  constructor(
    public dialogRef: MatDialogRef<BalanceTableComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log('BalanceTabledialogComponent', data)
    this.reports = data?.reportList;
    this.fileType = data?.fileType;
    console.log('reports', this.reports)
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
