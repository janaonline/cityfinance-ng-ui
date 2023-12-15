import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onGuidelinesPopup = new EventEmitter();
  @Output() onVideosPopup = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  scrollOnePageDown() {
    var viewportHeight = window.innerHeight;
    window.scrollBy(0, viewportHeight * 0.9);
  }
}
