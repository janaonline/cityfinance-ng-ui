import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GuidelinesPopupComponent } from '../guidelines-popup/guidelines-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onGuidelinesPopup = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  scrollOnePageDown() {
    var viewportHeight = window.innerHeight;
    window.scrollBy(0, viewportHeight * 0.9);
  }
}
