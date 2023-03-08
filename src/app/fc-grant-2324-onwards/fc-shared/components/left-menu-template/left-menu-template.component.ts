import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-left-menu-template',
  templateUrl: './left-menu-template.component.html',
  styleUrls: ['./left-menu-template.component.scss']
})
export class LeftMenuTemplateComponent implements OnInit {

  constructor() { }
@Input() leftMenu = {};

  ngOnInit(): void {

  }
  // ngOnChanges(changes: SimpleChanges){
   // if(changes?.leftMenu && changes?.leftMenu?.currentValue;)
  //   this.leftMenu = changes.leftMenu.currentValue;
  // }

}
