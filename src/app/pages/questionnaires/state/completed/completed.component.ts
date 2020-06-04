import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: "app-completed",
  templateUrl: "./completed.component.html",
  styleUrls: ["./completed.component.scss"],
})
export class CompletedComponent implements OnInit {
  @Output()
  showOld = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
