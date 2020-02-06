import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-tab-view',
  templateUrl: './home-tab-view.component.html',
  styleUrls: ['./home-tab-view.component.scss']
})
export class HomeTabViewComponent implements OnInit {
  tabIndex: any = 0;

  tabIndexChangeHandler(event): void {
    this.tabIndex = event;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
