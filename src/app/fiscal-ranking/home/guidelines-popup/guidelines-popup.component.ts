import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-guidelines-popup',
  templateUrl: './guidelines-popup.component.html',
  styleUrls: ['./guidelines-popup.component.scss']
})
export class GuidelinesPopupComponent implements OnInit {

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.matDialog.closeAll();
  }

}
