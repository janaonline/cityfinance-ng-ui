import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GuidelinesPopupComponent } from '../guidelines-popup/guidelines-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  scrollOnePageDown() {
    var viewportHeight = window.innerHeight;
    window.scrollBy(0, viewportHeight * 0.9);
  }

  guidelinesPopup() {
    this.matDialog.open(GuidelinesPopupComponent, {
      width: '450px',
      maxHeight: '90vh'
    });
  }
}
