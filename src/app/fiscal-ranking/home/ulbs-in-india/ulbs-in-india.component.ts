import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ulbs-in-india',
  templateUrl: './ulbs-in-india.component.html',
  styleUrls: ['./ulbs-in-india.component.scss']
})
export class UlbsInIndiaComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit(): void {
  }

}
