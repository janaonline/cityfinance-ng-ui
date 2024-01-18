import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {


  showButton: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (scrollPosition > window.innerHeight) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  scroll() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
