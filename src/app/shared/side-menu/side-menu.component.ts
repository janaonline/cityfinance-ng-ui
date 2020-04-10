import {Component, Input, OnInit} from '@angular/core';

export interface ILink {
  title: string,
  type: 'link' | 'other',
  route: string[]
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor() {
  }

  @Input('content') contents: ILink[] = [];

  ngOnInit() {
  }

}
