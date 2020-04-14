import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

export interface ILink {
  title: string;
  type: 'link' | 'other';
  route?: string[];
  condition?: Function;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnChanges {
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.contents = this.contents.filter(menu =>
      menu.condition ? menu.condition() : true
    );
    console.log(this.contents);
  }

  @Input('content') contents: ILink[] = [];

  ngOnInit() {
  }
}
