import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ulb-form2324',
  templateUrl: './ulb-form2324.component.html',
  styleUrls: ['./ulb-form2324.component.scss']
})
export class UlbForm2324Component implements OnInit {

  leftMenu = {};
  constructor() { }

  ngOnInit(): void {
    this.leftMenu = JSON.parse(localStorage.getItem("leftMenuRes"));
  }


}
