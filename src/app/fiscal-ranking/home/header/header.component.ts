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

  get getRatio(){
    const ZOOM:number =  0.001152073732718894;
    let zoomValue = window.innerHeight * ZOOM;
    return window.innerWidth < 992 ? 1 : zoomValue;
  }

  scrollOnePageDown() {
    var viewportHeight = window.innerHeight;
    window.scrollBy(0, viewportHeight * 0.9);
  }

  
}
