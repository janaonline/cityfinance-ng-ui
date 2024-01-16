import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-guidelines-popup',
  templateUrl: './guidelines-popup.component.html',
  styleUrls: ['./guidelines-popup.component.scss']
})
export class GuidelinesPopupComponent implements OnInit {

  constructor(
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public guidelinesData: any,

  ) { }

  ngOnInit(): void {
  }

  close() {
    this.matDialog.closeAll();
  }

}
