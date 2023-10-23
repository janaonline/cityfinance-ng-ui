import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scrollOnePageDown() {
    var viewportHeight = window.innerHeight;
    window.scrollBy(0, viewportHeight * 0.9);
  }

}
